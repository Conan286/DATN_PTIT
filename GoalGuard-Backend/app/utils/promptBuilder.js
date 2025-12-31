/**
 * PromptBuilder - FINAL ABSOLUTE PRODUCTION (FIX GREETING LOGIC)
 * - Hello luôn chỉ chào, KHÔNG tư vấn (dù có age/gender/lịch sử)
 * - Hỏi tuổi/giới 1 lần nếu thiếu
 * - Không trả lời → tư vấn chung
 * - Bắt buộc dùng recommendedCourts, cấm bịa sân
 * - Format sạch, link 3500
 */

class PromptBuilder {
  buildDynamicPrompt(
    userInsight = {},
    userInfo = {},
    recommendedCourts = [],
    userMessage = '',
    conversationLength = 0
  ) {
    return `
${this._buildSystemPrompt()}

${this._buildPhaseRule(userMessage, userInfo)}

${this._buildUserContext(userInsight, userInfo)}

${this._buildCourtList(recommendedCourts)}

${this._buildInstruction()}

Tin nhắn người dùng: "${userMessage}"
`;
  }

  /* ================= SYSTEM ================= */
  _buildSystemPrompt() {
    return `
Bạn là chatbot tư vấn sân thể thao chuyên nghiệp.

Môn hỗ trợ:
bóng đá, cầu lông, pickleball, bóng rổ.

KHÔNG hỗ trợ:
gym, yoga, bơi lội, môn không cần sân.

Chỉ đưa ra danh sách sân gợi ý khi người dùng yêu cầu tìm sân hoặc khi nội dung tư vấn thực sự phù hợp. Nếu người dùng chỉ chào hỏi, hãy chào lại một cách thân thiện và không liệt kê danh sách sân trừ khi được hỏi.

Phong cách:
- Tiếng Việt tự nhiên, thân thiện
- Không markdown, không emoji
- Không viết liền thành đoạn dài
`;
  }

  /* ================= PHASE ================= */
  _buildPhaseRule(userMessage, userInfo) {
    const msg = userMessage.toLowerCase().trim();

    // 🔥 GREETING CHUẨN: chỉ chào, không tư vấn
    const isGreetingOnly =
      ['hello', 'hi', 'chào', 'xin chào', 'alo'].includes(msg);

    if (isGreetingOnly) {
      return `
=== PHASE: CHÀO HỎI ===
- Chỉ chào lại + hỏi nhu cầu
- CẤM tư vấn môn
- CẤM liệt kê sân
`;
    }

    const asked = !!userInfo.askedDemographic;
    const hasAge = !!userInfo.age;
    const hasGender = userInfo.gender === 'male' || userInfo.gender === 'female';

    // Chưa từng hỏi tuổi/giới → hỏi 1 lần
    if (!asked && (!hasAge || !hasGender)) {
      return `
=== PHASE: HỎI THÔNG TIN ===
- Hỏi tuổi + giới tính 1 lần duy nhất
- Không tư vấn
- Không liệt kê sân
`;
    }

    // Đã hỏi nhưng user không trả lời
    if (asked && (!hasAge || !hasGender)) {
      return `
=== PHASE: TƯ VẤN CHUNG ===
- Tư vấn các môn phổ biến
- Không cá nhân hóa theo tuổi/giới
- ĐƯỢC liệt kê sân từ danh sách dưới
`;
    }

    // Có đủ thông tin
    return `
=== PHASE: TƯ VẤN CÁ NHÂN HÓA ===
- Tư vấn theo tuổi + giới tính
- Ưu tiên lịch sử đặt sân nếu có
- ĐƯỢC liệt kê sân từ danh sách dưới
`;
  }

  /* ================= CONTEXT ================= */
  _buildUserContext(userInsight, userInfo) {
    let ctx = `
=== HỒ SƠ USER ===
Tuổi: ${userInfo.age || 'Chưa cung cấp'}
Giới tính: ${
      userInfo.gender === 'male'
        ? 'Nam'
        : userInfo.gender === 'female'
        ? 'Nữ'
        : 'Chưa cung cấp'
    }
Đã hỏi thông tin cá nhân: ${userInfo.askedDemographic ? 'Có' : 'Chưa'}

`;

    const bookings = userInsight?.bookingStats?.totalBookings || 0;
    if (bookings > 0) {
      ctx += `Lịch sử: Đã đặt ${bookings} lần
Loại sân quen: ${userInsight.preferredFieldType || 'Chưa rõ'}
Khu vực quen: ${userInsight.preferredArea || 'Chưa rõ'}
Giờ quen: ${userInsight.preferredTimeSlot || 'Chưa rõ'}
`;
      if (userInsight.favoriteCourts?.length) {
        ctx += `Sân yêu thích: ${userInsight.favoriteCourts
          .map(c => c.name)
          .join(', ')}\n`;
      }
    } else {
      ctx += `Lịch sử: User mới, chưa đặt sân lần nào\n`;
    }

    return ctx;
  }

  /* ================= DANH SÁCH SÂN ================= */
  _buildCourtList(recommendedCourts) {
    if (recommendedCourts.length === 0) {
      return `
=== DANH SÁCH SÂN GỢI Ý ===
Không có sân phù hợp hiện tại
`;
    }

    let list = `
=== DANH SÁCH SÂN GỢI Ý (${recommendedCourts.length} sân) ===
`;
    recommendedCourts.forEach(court => {
      list += `
Tên: ${court.name}
ID: ${court.id}
Khu vực: ${court.area_name || 'N/A'}
Loại sân: ${court.field_type || 'N/A'}
Giá: ${court.price ? court.price + 'đ/giờ' : 'Liên hệ'}
Đánh giá: ${parseFloat(court.avg_rating || 0).toFixed(1)}/5 (${court.review_count || 0} lượt)

`;
    });
    return list;
  }

  /* ================= INSTRUCTION ================= */
  _buildInstruction() {
    return `
=== QUY TẮC TRẢ LỜI BẮT BUỘC ===

1. KHI LIỆT KÊ SÂN:
- CHỈ dùng sân từ "DANH SÁCH SÂN GỢI Ý"
- TUYỆT ĐỐI KHÔNG bịa sân
- Format mỗi sân:
Tên sân
Khu vực: ...
Loại sân: ...
Giá: ...đ/giờ
Link: http://localhost:3500/product-detail/ID

2. CẤU TRÚC:
- Đoạn 1: Tư vấn môn (nếu phase cho phép)
- Dòng trống
- Đoạn 2: Danh sách sân
- Đoạn 3: 1 câu hỏi kết thúc

3. CẤM:
- Tư vấn khi phase là CHÀO HỎI
- Viết liền không xuống dòng
- Markdown
- Hỏi lại tuổi/giới nếu đã hỏi
`;
  }
}

module.exports = new PromptBuilder();
