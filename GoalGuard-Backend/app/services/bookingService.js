/**
 * Booking Service
 * Xử lý tất cả logic liên quan đến bookings của user
 */

const db = require('../config/db');

class BookingService {
  /**
   * Lấy lịch sử booking của user (chỉ những booking đã hoàn tất hoặc được phê duyệt)
   * @param {number} userId - ID của user
   * @returns {Promise<Array>} Danh sách bookings
   */
  async getUserBookingHistory(userId) {
    try {
      const query = `
        SELECT 
          b.id,
          b.user_id,
          b.court_id,
          b.booking_date,
          b.start_time,
          b.end_time,
          b.total_amount,
          b.status,
          c.name AS court_name,
          c.price,
          c.id_areas,
          c.id_field_types,
          ft.type AS field_type,
          a.name AS area_name
        FROM bookings b
        LEFT JOIN courts c ON b.court_id = c.id
        LEFT JOIN field_types ft ON c.id_field_types = ft.id
        LEFT JOIN areas a ON c.id_areas = a.id
        WHERE b.user_id = ? AND (b.status = 'final' OR b.status = 'approved')
        ORDER BY b.booking_date DESC
      `;
      
      const [rows] = await db.execute(query, [userId]);
      return rows || [];
    } catch (error) {
      console.error('[BookingService] getUserBookingHistory error:', error);
      throw new Error(`Lỗi lấy lịch sử booking: ${error.message}`);
    }
  }

  /**
   * Tính thống kê hành vi đặt sân của user
   * @param {number} userId - ID của user
   * @returns {Promise<Object>} Thống kê hành vi
   */
  async analyzeUserBehavior(userId) {
    try {
      const bookings = await this.getUserBookingHistory(userId);

      if (bookings.length === 0) {
        return {
          totalBookings: 0,
          favoriteFieldTypes: [],
          favoriteAreas: [],
          priceRanges: [],
          commonTimeSlots: []
        };
      }

      // Phân tích loại sân yêu thích
      const fieldTypeMap = {};
      const areaMap = {};
      const priceList = [];
      const timeSlots = [];

      bookings.forEach((booking) => {
        // Loại sân - track cả ID lẫn name
        if (booking.field_type && booking.id_field_types) {
          const key = `${booking.id_field_types}|${booking.field_type}`;
          fieldTypeMap[key] =
            (fieldTypeMap[key] || 0) + 1;
        }

        // Khu vực - track cả ID lẫn name
        if (booking.area_name && booking.id_areas) {
          const key = `${booking.id_areas}|${booking.area_name}`;
          areaMap[key] = (areaMap[key] || 0) + 1;
        }

        // Giá
        priceList.push(parseFloat(booking.price || 0));

        // Phân loại khung giờ (sáng/chiều/tối)
        const startHour = parseInt(booking.start_time.split(':')[0]);
        if (startHour >= 5 && startHour < 11) {
          timeSlots.push('morning');
        } else if (startHour >= 11 && startHour < 17) {
          timeSlots.push('afternoon');
        } else if (startHour >= 17 && startHour < 22) {
          timeSlots.push('evening');
        }
      });

      // Sắp xếp top choices
      const favoriteFieldTypes = Object.entries(fieldTypeMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([key, count]) => {
          const [id, type] = key.split('|');
          return {
            id: parseInt(id),
            type,
            count,
            percentage: ((count / bookings.length) * 100).toFixed(1)
          };
        });

      const favoriteAreas = Object.entries(areaMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([key, count]) => {
          const [id, area] = key.split('|');
          return {
            id: parseInt(id),
            area,
            count,
            percentage: ((count / bookings.length) * 100).toFixed(1)
          };
        });

      // Tính giá trung bình
      const avgPrice = (priceList.reduce((a, b) => a + b, 0) / priceList.length).toFixed(0);
      const minPrice = Math.min(...priceList);
      const maxPrice = Math.max(...priceList);

      // Khung giờ yêu thích
      const timeSlotMap = {};
      timeSlots.forEach((slot) => {
        timeSlotMap[slot] = (timeSlotMap[slot] || 0) + 1;
      });

      const commonTimeSlots = Object.entries(timeSlotMap)
        .sort((a, b) => b[1] - a[1])
        .map(([slot, count]) => ({
          slot,
          count,
          percentage: ((count / timeSlots.length) * 100).toFixed(1)
        }));

      return {
        totalBookings: bookings.length,
        favoriteFieldTypes,
        favoriteAreas,
        priceRange: {
          min: minPrice,
          max: maxPrice,
          average: parseInt(avgPrice),
          typical: this._getTypicalPriceRange(parseInt(avgPrice))
        },
        commonTimeSlots
      };
    } catch (error) {
      console.error('[BookingService] analyzeUserBehavior error:', error);
      throw new Error(`Lỗi phân tích hành vi: ${error.message}`);
    }
  }

  /**
   * Phân loại khoảng giá thành nhóm (để dễ hiểu cho user)
   * @private
   */
  _getTypicalPriceRange(avgPrice) {
    if (avgPrice < 100000) return '< 100k';
    if (avgPrice < 200000) return '100k - 200k';
    if (avgPrice < 300000) return '200k - 300k';
    if (avgPrice < 400000) return '300k - 400k';
    return '> 400k';
  }

  /**
   * Lấy danh sách sân user từng đặt
   * @param {number} userId - ID của user
   * @returns {Promise<Array>} Danh sách court IDs
   */
  async getUserBookedCourts(userId) {
    try {
      const query = `
        SELECT DISTINCT b.court_id
        FROM bookings b
        WHERE b.user_id = ? AND (b.status = 'final' OR b.status = 'approved')
      `;

      const [rows] = await db.execute(query, [userId]);
      return rows.map((r) => r.court_id);
    } catch (error) {
      console.error('[BookingService] getUserBookedCourts error:', error);
      return [];
    }
  }
}

module.exports = new BookingService();
