const { GoogleGenerativeAI } = require("@google/generative-ai");

// Khởi tạo Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Lưu lịch sử chat theo session
const conversationHistory = {};

// System prompt
const SYSTEM_PROMPT = `
Bạn là trợ lý AI của hệ thống quản lý sân thể thao.

Vai trò:
- Tư vấn môn thể thao phù hợp theo độ tuổi và giới tính
- Tư vấn khung giờ tập luyện hợp lý trong ngày
- Tư vấn theo tiền sử bệnh 

Phạm vi tư vấn (CHỈ GIỚI HẠN):
- Bóng đá
- Bóng rổ
- Cầu lông
- Pickleball

Quy tắc trả lời:
- Chỉ tư vấn trong 4 môn thể thao trên
- Không đề xuất môn ngoài hệ thống
- Trả lời ngắn gọn, dễ hiểu, mang tính tư vấn
- Nếu người dùng không nêu rõ độ tuổi hoặc giới tính, hãy hỏi lại nhẹ nhàng

Gợi ý tư vấn theo độ tuổi:
- Trẻ em (6–12): ưu tiên cầu lông, pickleball (nhẹ, an toàn)
- Thanh thiếu niên (13–18): bóng đá, bóng rổ, cầu lông
- Người trưởng thành (19–40): cả 4 môn
- Trung niên (trên 40): cầu lông, pickleball

Gợi ý theo giới tính:
- Nam: bóng đá, bóng rổ, cầu lông, pickleball
- Nữ: cầu lông, pickleball, bóng rổ (mức vừa phải)

Gợi ý giờ tập luyện:
- Sáng (7h00–8h00): tốt cho sức khỏe, ít mệt
- Chiều (16h30–18h30): phù hợp học sinh, sinh viên
- Tối (18h30–22h00): phù hợp người đi làm
- Tránh tập quá muộn sau 23h

Luôn giữ thái độ lịch sự, thân thiện và hỗ trợ người dùng.
`;

const sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message?.trim()) {
      return res.json({ status: false, message: "Vui lòng nhập tin nhắn" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ status: false, message: "Chưa cấu hình API Key Gemini" });
    }

    if (!sessionId) {
      return res.json({ status: false, message: "Thiếu sessionId" });
    }

    // Khởi tạo session
    if (!conversationHistory[sessionId]) {
      conversationHistory[sessionId] = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] }
      ];
    }

    //  MODEL ĐÚNG THEO KEY FREE CỦA BẠN
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash"
    });

    // Thêm tin nhắn user
    conversationHistory[sessionId].push({
      role: "user",
      parts: [{ text: message }]
    });

    // Gọi AI
    const result = await model.generateContent({
      contents: conversationHistory[sessionId]
    });

    const reply =
      result.response?.text() ||
      "AI không thể trả lời lúc này, vui lòng thử lại.";

    // Lưu phản hồi AI
    conversationHistory[sessionId].push({
      role: "model",
      parts: [{ text: reply }]
    });

    // Giữ tối đa 20 message
    if (conversationHistory[sessionId].length > 20) {
      conversationHistory[sessionId] =
        conversationHistory[sessionId].slice(-20);
    }

    return res.json({
      status: true,
      message: "Gửi tin nhắn thành công",
      data: { reply, timestamp: new Date() }
    });

  } catch (error) {
    console.error("Chatbot error:", error.message);
    return res.json({
      status: false,
      message: "Lỗi xử lý tin nhắn: " + error.message
    });
  }
};

// Xóa lịch sử
const clearHistory = async (req, res) => {
  const { sessionId } = req.body;
  delete conversationHistory[sessionId];
  res.json({ status: true, message: "Xóa lịch sử trò chuyện thành công" });
};

// Lấy lịch sử
const getHistory = async (req, res) => {
  const { sessionId } = req.query;
  res.json({
    status: true,
    message: "Lấy lịch sử thành công",
    data: conversationHistory[sessionId] || []
  });
};

module.exports = {
  sendMessage,
  clearHistory,
  getHistory
};
