/**
 * Time Classifier
 * Phân loại thời gian (khung giờ) từ string HH:MM:SS
 */

class TimeClassifier {
  /**
   * Phân loại khung giờ từ time string
   * @param {string} timeStr - Định dạng "HH:MM:SS" hoặc "HH:MM"
   * @returns {string} Tên khung giờ: 'morning' | 'afternoon' | 'evening'
   */
  classifyTimeSlot(timeStr) {
    try {
      const hour = parseInt(timeStr.split(':')[0]);
      return this._getSlotByHour(hour);
    } catch (error) {
      console.warn('[TimeClassifier] Invalid time format:', timeStr);
      return 'afternoon'; // Default
    }
  }

  /**
   * Phân loại khung giờ từ giờ (số)
   * @private
   */
  _getSlotByHour(hour) {
    if (hour >= 5 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night'; // Ngoài giờ hoạt động
  }

  /**
   * Lấy label tiếng Việt cho slot
   * @param {string} slot - 'morning' | 'afternoon' | 'evening' | 'night'
   * @returns {string} Label tiếng Việt
   */
  getSlotLabel(slot) {
    const labels = {
      morning: 'Buổi sáng (5h - 11h)',
      afternoon: 'Buổi chiều (11h - 17h)',
      evening: 'Buổi tối (17h - 22h)',
      night: 'Ngoài giờ hoạt động'
    };
    return labels[slot] || 'Không xác định';
  }

  /**
   * Lấy icon emoji cho slot
   * @param {string} slot - 'morning' | 'afternoon' | 'evening'
   * @returns {string} Emoji icon
   */
  getSlotEmoji(slot) {
    const emojis = {
      morning: '🌅',
      afternoon: '☀️',
      evening: '🌙',
      night: '🌙'
    };
    return emojis[slot] || '⏰';
  }

  /**
   * So sánh 2 khung giờ
   * @param {string} slot1 - Slot 1
   * @param {string} slot2 - Slot 2
   * @returns {boolean} Có phải cùng loại không
   */
  isSameSlot(slot1, slot2) {
    return slot1 === slot2;
  }

  /**
   * Phân loại danh sách khung giờ
   * @param {Array<string>} timeList - Danh sách time strings
   * @returns {Object} Map: slot -> count
   */
  classifyMultipleTimes(timeList) {
    const slotCounts = {
      morning: 0,
      afternoon: 0,
      evening: 0,
      night: 0
    };

    timeList.forEach((time) => {
      const slot = this.classifyTimeSlot(time);
      if (slotCounts.hasOwnProperty(slot)) {
        slotCounts[slot]++;
      }
    });

    return slotCounts;
  }

  /**
   * Tìm khung giờ phổ biến nhất
   * @param {Array<string>} timeList - Danh sách time strings
   * @returns {Object} { slot: 'morning', label: '...', percentage: 80 }
   */
  getMostPopularTimeSlot(timeList) {
    if (timeList.length === 0) {
      return {
        slot: 'afternoon',
        label: 'Buổi chiều (11h - 17h)',
        percentage: 0
      };
    }

    const slotCounts = this.classifyMultipleTimes(timeList);
    let maxSlot = 'afternoon';
    let maxCount = 0;

    Object.entries(slotCounts).forEach(([slot, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxSlot = slot;
      }
    });

    const percentage = Math.round((maxCount / timeList.length) * 100);

    return {
      slot: maxSlot,
      label: this.getSlotLabel(maxSlot),
      percentage,
      count: maxCount,
      total: timeList.length
    };
  }

  /**
   * Gợi ý khung giờ dựa trên thói quen
   * @param {Object} slotCounts - Map: slot -> count
   * @returns {Array} Danh sách slot sắp xếp theo phổ biến
   */
  recommendTimeSlots(slotCounts) {
    return Object.entries(slotCounts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([slot, count]) => ({
        slot,
        label: this.getSlotLabel(slot),
        emoji: this.getSlotEmoji(slot),
        frequency: count
      }));
  }
}

module.exports = new TimeClassifier();
