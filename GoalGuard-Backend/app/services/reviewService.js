/**
 * Review Service
 * Xử lý tất cả logic liên quan đến đánh giá sân của user
 */

const db = require('../config/db');

class ReviewService {
  /**
   * Lấy tất cả review của user
   * @param {number} userId - ID của user
   * @returns {Promise<Array>} Danh sách reviews
   */
  async getUserReviews(userId) {
    try {
      const query = `
        SELECT 
          r.id_reviews,
          r.rating,
          r.review_text,
          r.id_courts,
          r.created_at,
          c.name AS court_name
        FROM reviews r
        LEFT JOIN courts c ON r.id_courts = c.id
        WHERE r.id_customer = ?
        ORDER BY r.created_at DESC
      `;

      const [rows] = await db.execute(query, [userId]);
      return rows || [];
    } catch (error) {
      console.error('[ReviewService] getUserReviews error:', error);
      throw new Error(`Lỗi lấy đánh giá: ${error.message}`);
    }
  }

  /**
   * Lấy danh sách sân user đánh giá cao (>= 4 sao)
   * @param {number} userId - ID của user
   * @returns {Promise<Array>} Danh sách court IDs
   */
  async getFavoriteCourtsByUser(userId) {
    try {
      const query = `
        SELECT DISTINCT 
          r.id_courts,
          c.name,
          AVG(r.rating) AS avg_rating
        FROM reviews r
        LEFT JOIN courts c ON r.id_courts = c.id
        WHERE r.id_customer = ? AND r.rating >= 4
        GROUP BY r.id_courts, c.name
      `;

      const [rows] = await db.execute(query, [userId]);
      return rows || [];
    } catch (error) {
      console.error('[ReviewService] getFavoriteCourtsByUser error:', error);
      return [];
    }
  }

  /**
   * Lấy danh sách sân user đánh giá thấp (<= 2 sao)
   * @param {number} userId - ID của user
   * @returns {Promise<Array>} Danh sách court IDs
   */
  async getAvoidedCourtsByUser(userId) {
    try {
      const query = `
        SELECT DISTINCT 
          r.id_courts,
          c.name,
          AVG(r.rating) AS avg_rating
        FROM reviews r
        LEFT JOIN courts c ON r.id_courts = c.id
        WHERE r.id_customer = ? AND r.rating <= 2
        GROUP BY r.id_courts, c.name
      `;

      const [rows] = await db.execute(query, [userId]);
      return rows || [];
    } catch (error) {
      console.error('[ReviewService] getAvoidedCourtsByUser error:', error);
      return [];
    }
  }

  /**
   * Phân tích rating pattern của user
   * @param {number} userId - ID của user
   * @returns {Promise<Object>} Thống kê rating
   */
  async analyzeRatingPattern(userId) {
    try {
      const reviews = await this.getUserReviews(userId);

      if (reviews.length === 0) {
        return {
          totalReviews: 0,
          averageRating: 0,
          ratingDistribution: {}
        };
      }

      const ratingMap = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      };

      let totalRating = 0;

      reviews.forEach((review) => {
        const rating = review.rating;
        ratingMap[rating]++;
        totalRating += rating;
      });

      const avgRating = (totalRating / reviews.length).toFixed(2);

      return {
        totalReviews: reviews.length,
        averageRating: parseFloat(avgRating),
        ratingDistribution: ratingMap,
        criticalComments: reviews.filter((r) => r.rating <= 2).length > 0
      };
    } catch (error) {
      console.error('[ReviewService] analyzeRatingPattern error:', error);
      throw new Error(`Lỗi phân tích rating: ${error.message}`);
    }
  }
}

module.exports = new ReviewService();
