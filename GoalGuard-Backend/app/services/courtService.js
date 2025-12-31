/**
 * Court Service
 * Xử lý logic lọc, tìm kiếm sân dựa trên preferences của user
 * ĐÃ FIX TRIỆT ĐỂ LỖI "Incorrect arguments to mysqld_stmt_execute" CHO MYSQL 8.0.44+
 */

const db = require('../config/db');

class CourtService {

  /**
   * Lấy danh sách sân gợi ý dựa trên preferences
   */
  async getRecommendedCourts(preferences, avoidedCourtIds = [], limit = 5) {
    try {
      console.log('[CourtService] getRecommendedCourts START - preferences:', JSON.stringify(preferences), 'avoided:', avoidedCourtIds, 'limit:', limit);

      const safeLimit = Math.max(1, Math.min(Math.floor(Number(limit) || 5), 100));

      let whereConditions = [
        'c.status = "active"',
        'c.approval_status = "approved"'
      ];
      let params = [];

      // Field Type IDs
      if (Array.isArray(preferences?.preferredFieldTypeIds) && preferences.preferredFieldTypeIds.length > 0) {
        const ids = preferences.preferredFieldTypeIds
          .map(id => Number(id))
          .filter(id => Number.isInteger(id) && id > 0);

        if (ids.length > 0) {
          const placeholders = ids.map(() => '?').join(',');
          whereConditions.push(`c.id_field_types IN (${placeholders})`);
          params.push(...ids);
        }
      }

      // Area IDs
      if (Array.isArray(preferences?.preferredAreaIds) && preferences.preferredAreaIds.length > 0) {
        const ids = preferences.preferredAreaIds
          .map(id => Number(id))
          .filter(id => Number.isInteger(id) && id > 0);

        if (ids.length > 0) {
          const placeholders = ids.map(() => '?').join(',');
          whereConditions.push(`c.id_areas IN (${placeholders})`);
          params.push(...ids);
        }
      }

      // Avoided Court IDs
      if (Array.isArray(avoidedCourtIds) && avoidedCourtIds.length > 0) {
        const ids = avoidedCourtIds
          .map(id => Number(id))
          .filter(id => Number.isInteger(id) && id > 0);

        if (ids.length > 0) {
          const placeholders = ids.map(() => '?').join(',');
          whereConditions.push(`c.id NOT IN (${placeholders})`);
          params.push(...ids);
        }
      }

      // Price range - cố định 2 params
      const minPrice = preferences?.priceRange?.min != null 
        ? Math.max(0, Math.floor(Number(preferences.priceRange.min))) 
        : 0;

      const maxPrice = preferences?.priceRange?.max != null 
        ? Math.max(minPrice, Math.floor(Number(preferences.priceRange.max) || 999999999)) 
        : 999999999;

      whereConditions.push('c.price >= ?');
      whereConditions.push('c.price <= ?');
      params.push(minPrice);
      params.push(maxPrice);

      const whereClause = whereConditions.length > 0 ? whereConditions.join(' AND ') : '1=1';

      const query = `
        SELECT 
          c.id,
          c.name,
          c.price,
          c.description,
          c.image,
          c.id_areas,
          c.id_field_types,
          a.name AS area_name,
          ft.type AS field_type,
          COALESCE(AVG(r.rating), 0) AS avg_rating,
          COALESCE(COUNT(r.id_reviews), 0) AS review_count
        FROM courts c
        LEFT JOIN areas a ON c.id_areas = a.id
        LEFT JOIN field_types ft ON c.id_field_types = ft.id
        LEFT JOIN reviews r ON c.id = r.id_courts
        WHERE ${whereClause}
        GROUP BY c.id
        ORDER BY avg_rating DESC, review_count DESC, c.price ASC
        LIMIT ?
      `;

      params.push(safeLimit);

      // FIX MYSQL 8.0.44: Number → String
      const safeParams = params.map(p => {
        if (typeof p === 'number') {
          return String(Math.floor(p));
        }
        return p;
      });

      const placeholderCount = (query.match(/\?/g) || []).length;
      if (placeholderCount !== safeParams.length) {
        throw new Error(`MISMATCH: ${placeholderCount} placeholders vs ${safeParams.length} params`);
      }

      const [rows] = await db.execute(query, safeParams);

      console.log('[CourtService] SUCCESS - Found', rows.length, 'courts');
      return rows || [];
    } catch (error) {
      console.error('[CourtService] getRecommendedCourts ERROR:', error.message);
      throw new Error(`Lỗi gợi ý sân: ${error.message}`);
    }
  }

  // Chi tiết sân
  async getCourtDetails(courtId) {
    try {
      const query = `
        SELECT 
          c.*,
          a.name AS area_name,
          ft.type AS field_type,
          COALESCE(AVG(r.rating), 0) AS avg_rating,
          COALESCE(COUNT(r.id_reviews), 0) AS review_count
        FROM courts c
        LEFT JOIN areas a ON c.id_areas = a.id
        LEFT JOIN field_types ft ON c.id_field_types = ft.id
        LEFT JOIN reviews r ON c.id = r.id_courts
        WHERE c.id = ?
        GROUP BY c.id
      `;

      const [rows] = await db.execute(query, [courtId]);
      return rows[0] || null;
    } catch (error) {
      console.error('[CourtService] getCourtDetails error:', error);
      return null;
    }
  }

  // Lấy tất cả loại sân
  async getAllFieldTypes() {
    try {
      const query = 'SELECT id, type FROM field_types WHERE status = "active"';
      const [rows] = await db.execute(query);
      return rows || [];
    } catch (error) {
      console.error('[CourtService] getAllFieldTypes error:', error);
      return [];
    }
  }

  // Lấy tất cả khu vực
  async getAllAreas() {
    try {
      const query = 'SELECT id, name FROM areas WHERE status = "active"';
      const [rows] = await db.execute(query);
      return rows || [];
    } catch (error) {
      console.error('[CourtService] getAllAreas error:', error);
      return [];
    }
  }

  // Tìm kiếm sân theo từ khóa
  async searchCourts(keyword, limit = 5) {
    try {
      const safeLimit = Math.max(1, Math.min(Math.floor(Number(limit) || 5), 50));
      const query = `
        SELECT 
          c.id,
          c.name,
          c.price,
          c.description,
          c.image,
          c.id_areas,
          c.id_field_types,
          a.name AS area_name,
          ft.type AS field_type
        FROM courts c
        LEFT JOIN areas a ON c.id_areas = a.id
        LEFT JOIN field_types ft ON c.id_field_types = ft.id
        WHERE (c.name LIKE ? OR a.name LIKE ? OR ft.type LIKE ?)
          AND c.status = "active"
          AND c.approval_status = "approved"
        LIMIT ?
      `;

      const searchTerm = `%${keyword}%`;
      const [rows] = await db.execute(query, [searchTerm, searchTerm, searchTerm, safeLimit]);
      return rows || [];
    } catch (error) {
      console.error('[CourtService] searchCourts error:', error);
      return [];
    }
  }
}

module.exports = new CourtService();