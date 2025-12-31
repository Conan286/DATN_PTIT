/**
 * User Insight Builder
 * Phân tích dữ liệu user và tạo insight object
 * để AI có thể hiểu về preferences của user
 */

const bookingService = require('../services/bookingService');
const reviewService = require('../services/reviewService');
const courtService = require('../services/courtService');

class UserInsightBuilder {
  /**
   * Xây dựng USER INSIGHT OBJECT từ lịch sử của user
   * @param {number} userId - ID của user
   * @returns {Promise<Object>} User insight object
   */
  async buildUserInsight(userId) {
    try {
      // Lấy dữ liệu từ services
      const [bookingBehavior, reviewAnalysis, favoriteCourtData, avoidedCourtData] =
        await Promise.all([
          bookingService.analyzeUserBehavior(userId),
          reviewService.analyzeRatingPattern(userId),
          reviewService.getFavoriteCourtsByUser(userId),
          reviewService.getAvoidedCourtsByUser(userId)
        ]);

      // Nếu user chưa có booking nào, trả về insight mặc định
      if (bookingBehavior.totalBookings === 0) {
        return this._getDefaultInsight();
      }

      // Xây dựng insight object
      const insight = {
        // === BOOKING BEHAVIOR ===
        bookingStats: {
          totalBookings: bookingBehavior.totalBookings,
          averageSpending:
            bookingBehavior.priceRange.average +
            'đ (' +
            bookingBehavior.priceRange.typical +
            ')'
        },

        // === PREFERENCES ===
        preferredFieldType:
          bookingBehavior.favoriteFieldTypes.length > 0
            ? bookingBehavior.favoriteFieldTypes[0].type
            : 'Không xác định',

        preferredArea:
          bookingBehavior.favoriteAreas.length > 0
            ? bookingBehavior.favoriteAreas[0].area
            : 'Không xác định',

        preferredTimeSlot: this._getPreferredTimeSlot(bookingBehavior.commonTimeSlots),

        // === RATING BEHAVIOR ===
        ratingPattern: {
          averageRating: reviewAnalysis.averageRating,
          totalReviews: reviewAnalysis.totalReviews,
          isSelective: reviewAnalysis.averageRating >= 4 // User cao tiêu chuẩn?
        },

        // === FAVORITE & AVOIDED COURTS ===
        favoriteCourts: favoriteCourtData.map((c) => ({
          id: c.id_courts,
          name: c.name,
          avgRating: parseFloat(c.avg_rating)
        })),

        avoidedCourts: avoidedCourtData.map((c) => ({
          id: c.id_courts,
          name: c.name,
          avgRating: parseFloat(c.avg_rating)
        })),

        // === TECHNICAL DATA (cho backend dùng) ===
        _technical: {
          preferredFieldTypeIds: bookingBehavior.favoriteFieldTypes.map((ft) => ft.id),
          preferredAreaIds: bookingBehavior.favoriteAreas.map((fa) => fa.id),
          priceRange: bookingBehavior.priceRange,
          avoidedCourtIds: avoidedCourtData.map((c) => c.id_courts)
        }
      };

      return insight;
    } catch (error) {
      console.error('[UserInsightBuilder] buildUserInsight error:', error);
      // Trả về insight mặc định để system không bị break
      return this._getDefaultInsight();
    }
  }

  /**
   * Tạo insight object với giá trị mặc định (cho user mới)
   * @private
   */
  _getDefaultInsight() {
    return {
      bookingStats: {
        totalBookings: 0,
        averageSpending: 'Chưa có dữ liệu'
      },
      preferredFieldType: 'Tất cả loại sân',
      preferredArea: 'Tất cả khu vực',
      preferredTimeSlot: 'Bất kỳ lúc nào',
      ratingPattern: {
        averageRating: 0,
        totalReviews: 0,
        isSelective: false
      },
      favoriteCourts: [],
      avoidedCourts: [],
      _technical: {
        preferredFieldTypeIds: [],
        preferredAreaIds: [],
        priceRange: { min: 0, max: 999999999 },
        avoidedCourtIds: []
      }
    };
  }

  /**
   * Xác định khung giờ yêu thích của user
   * @private
   */
  _getPreferredTimeSlot(commonTimeSlots) {
    if (commonTimeSlots.length === 0) {
      return 'Bất kỳ lúc nào';
    }

    const timeSlotLabels = {
      morning: 'Buổi sáng (5h - 11h)',
      afternoon: 'Buổi chiều (11h - 17h)',
      evening: 'Buổi tối (17h - 22h)'
    };

    // Lấy khung giờ có tỷ lệ cao nhất
    const topSlot = commonTimeSlots[0];
    return timeSlotLabels[topSlot.slot] || 'Bất kỳ lúc nào';
  }

  /**
   * Format insight để hiển thị cho user (dạng readable text)
   * @param {Object} insight - User insight object
   * @returns {string} Formatted text
   */
  formatInsightForDisplay(insight) {
    if (insight.bookingStats.totalBookings === 0) {
      return 'Bạn chưa có lịch sử đặt sân. Hãy bắt đầu trải nghiệm dịch vụ của chúng tôi!';
    }

    const lines = [
      `📊 Bạn đã đặt sân ${insight.bookingStats.totalBookings} lần`,
      `💰 Mức chi tiêu trung bình: ${insight.bookingStats.averageSpending}`,
      `🎾 Loại sân yêu thích: ${insight.preferredFieldType}`,
      `📍 Khu vực ưu tiên: ${insight.preferredArea}`,
      `⏰ Khung giờ yêu thích: ${insight.preferredTimeSlot}`,
      `⭐ Đánh giá trung bình: ${insight.ratingPattern.averageRating}/5 (${insight.ratingPattern.totalReviews} đánh giá)`
    ];

    if (insight.favoriteCourts.length > 0) {
      lines.push(
        `❤️ Sân yêu thích: ${insight.favoriteCourts.map((c) => c.name).join(', ')}`
      );
    }

    return lines.join('\n');
  }
}

module.exports = new UserInsightBuilder();
