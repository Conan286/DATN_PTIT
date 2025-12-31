const { GoogleGenerativeAI } = require("@google/generative-ai");

// Import services & utils
const bookingService = require("../services/bookingService");
const reviewService = require("../services/reviewService");
const courtService = require("../services/courtService");
const userInsightBuilder = require("../utils/userInsight");
const promptBuilder = require("../utils/promptBuilder");

// Khởi tạo Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Lưu lịch sử chat theo session
const conversationHistory = {};

// === CONSTANTS ===
const MODEL_NAME = "models/gemini-2.5-flash-lite";
const MAX_HISTORY_LENGTH = 20;
const MAX_RECOMMENDATIONS = 5;

/**
 * Main handler: Send message to chatbot
 * Flow:
 * 1. Validate input & userId (REQUIRED for personalization)
 * 2. Query user info (age, name) from DB
 * 3. Build user insight từ database (booking history)
 * 4. Lấy court recommendations
 * 5. Build dynamic prompt WITH context
 * 6. Call Gemini API
 * 7. Return reply
 */
const sendMessage = async (req, res) => {
  try {
    const { message, sessionId, userId: userIdRaw } = req.body;

    // ✅ TYPE CONVERSION: Ép userId thành number
    const userId = parseInt(userIdRaw);

    console.log('[ChatbotController] sendMessage START - userId:', userId, 'sessionId:', sessionId?.substring(0, 10) + '...', 'userIdType:', typeof userId);

    // === VALIDATION ===
    if (!message?.trim()) {
      console.warn('[ChatbotController] Message validation FAILED - empty message');
      return res.json({ status: false, message: "Vui lòng nhập tin nhắn" });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('[ChatbotController] GEMINI_API_KEY not configured');
      return res.json({ status: false, message: "Chưa cấu hình API Key Gemini" });
    }

    if (!sessionId) {
      console.warn('[ChatbotController] Session validation FAILED - no sessionId');
      return res.json({ status: false, message: "Thiếu sessionId" });
    }

    // ❌ REQUIRED: userId không được null/NaN để có personalization
    if (!userId || isNaN(userId) || userId <= 0) {
      console.warn('[ChatbotController] userId validation FAILED - value:', userIdRaw, 'parsed:', userId);
      return res.json({ 
        status: false, 
        message: "userId không hợp lệ. Vui lòng đăng nhập để có tư vấn cá nhân hóa.",
        data: { requireLogin: true }
      });
    }

    // === FETCH USER INFO FROM DATABASE ===
    let userInfo = null;
    try {
      const db = require('../config/db');
      const userQuery = 'SELECT id, username, email, age, gender FROM users WHERE id = ?';
      const [userRows] = await db.execute(userQuery, [userId]);
      
      if (userRows.length === 0) {
        console.warn('[ChatbotController] User not found in DB - userId:', userId);
        return res.json({ 
          status: false, 
          message: "Người dùng không tồn tại trong hệ thống" 
        });
      }
      
      userInfo = userRows[0];
      console.log('[ChatbotController] User info from DB - name:', userInfo.username, 'age:', userInfo.age);
    } catch (error) {
      console.error('[ChatbotController] Error querying user info:', error.message);
      return res.json({ 
        status: false, 
        message: "Lỗi lấy thông tin người dùng: " + error.message 
      });
    }

    // === BUILD USER INSIGHT & GET RECOMMENDATIONS ===
    let userInsight = {};
    let recommendedCourts = [];

    try {
      // Xây dựng insight từ user data (booking history từ DB)
      userInsight = await userInsightBuilder.buildUserInsight(userId);
      console.log('[ChatbotController] User insight built - totalBookings:', userInsight.bookingStats.totalBookings);

      // Lấy danh sách sân gợi ý dựa trên preferences
      const avoidedCourtIds = userInsight._technical?.avoidedCourtIds || [];

      recommendedCourts = await courtService.getRecommendedCourts(
        {
          // ✅ Use actual preferences from user insight, not empty arrays
          preferredFieldTypeIds: userInsight._technical?.preferredFieldTypeIds || [],
          preferredAreaIds: userInsight._technical?.preferredAreaIds || [],
          priceRange: userInsight._technical?.priceRange || { min: 0, max: 999999999 }
        },
        avoidedCourtIds,
        MAX_RECOMMENDATIONS
      );
      console.log('[ChatbotController] Recommended courts fetched - count:', recommendedCourts.length);
    } catch (error) {
      console.error("[ChatbotController] Error building insight:", error.message);
      return res.json({
        status: false,
        message: "Lỗi xử lý dữ liệu: " + error.message
      });
    }

    // === INITIALIZE CONVERSATION HISTORY ===
    if (!conversationHistory[sessionId]) {
      conversationHistory[sessionId] = [];
      console.log('[ChatbotController] New conversation history initialized for session:', sessionId?.substring(0, 10) + '...');
    }

    // ⭐ FIX: Tính conversationLength TRƯỚC khi build prompt
    // Nếu đã có 0 message = tin nhắn đầu tiên, nếu có 2+ messages = không phải tin nhắn đầu
    const conversationLength = conversationHistory[sessionId].length;

    // === BUILD DYNAMIC PROMPT (WITH FULL CONTEXT) ===
    const dynamicPrompt = promptBuilder.buildDynamicPrompt(
      userInsight,
      userInfo,  // ← PASS user info (age, name) để AI dùng
      recommendedCourts,
      message,
      conversationLength  // ← PASS conversation length để kiểm soát nhắc "người dùng mới"
    );

    console.log('[ChatbotController] Prompt built - length:', dynamicPrompt.length, 'chars', '| conversationLength:', conversationLength);
    console.log('[ChatbotController] AI Context Preview:\n', dynamicPrompt.substring(0, 300) + '...\n');

    // === CALL GEMINI API ===
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Build contents array
    const contents = [
      {
        role: "user",
        parts: [{ text: dynamicPrompt }]
      }
    ];

    // Thêm conversation history nếu có
    if (conversationHistory[sessionId].length > 0) {
      contents.unshift(...conversationHistory[sessionId]);
      console.log('[ChatbotController] Added conversation history - messages count:', conversationHistory[sessionId].length);
    }

    console.log('[ChatbotController] Calling Gemini API...');
    const result = await model.generateContent({ contents });

    const reply =
      result.response?.text() ||
      "AI không thể trả lời lúc này, vui lòng thử lại.";

    console.log('[ChatbotController] Gemini replied - length:', reply.length, 'chars');

    // === SAVE HISTORY ===
    conversationHistory[sessionId].push(
      { role: "user", parts: [{ text: message }] },
      { role: "model", parts: [{ text: reply }] }
    );

    // Giữ tối đa MAX_HISTORY_LENGTH message
    if (conversationHistory[sessionId].length > MAX_HISTORY_LENGTH) {
      conversationHistory[sessionId] =
        conversationHistory[sessionId].slice(-MAX_HISTORY_LENGTH);
      console.log('[ChatbotController] History trimmed to MAX_HISTORY_LENGTH');
    }

    console.log('[ChatbotController] sendMessage SUCCESS');

    // === RESPONSE ===
    return res.json({
      status: true,
      message: "Gửi tin nhắn thành công",
      data: {
        reply,
        timestamp: new Date(),
        userContext: {
          username: userInfo.username,
          age: userInfo.age,
          totalBookings: userInsight.bookingStats.totalBookings
        },
        recommendationsCount: recommendedCourts.length
      }
    });
  } catch (error) {
    console.error("[ChatbotController] sendMessage FAILED:", error.message);
    console.error("[ChatbotController] Error stack:", error.stack);
    return res.json({
      status: false,
      message: "Lỗi xử lý tin nhắn: " + error.message
    });
  }
};

/**
 * Clear conversation history
 */
const clearHistory = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.json({ status: false, message: "Thiếu sessionId" });
    }

    delete conversationHistory[sessionId];

    return res.json({
      status: true,
      message: "Xóa lịch sử trò chuyện thành công"
    });
  } catch (error) {
    console.error("[ChatbotController] clearHistory error:", error.message);
    return res.json({
      status: false,
      message: "Lỗi xóa lịch sử: " + error.message
    });
  }
};

/**
 * Get conversation history
 */
const getHistory = async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.json({ status: false, message: "Thiếu sessionId" });
    }

    const history = conversationHistory[sessionId] || [];

    return res.json({
      status: true,
      message: "Lấy lịch sử thành công",
      data: {
        sessionId,
        messageCount: history.length,
        messages: history
      }
    });
  } catch (error) {
    console.error("[ChatbotController] getHistory error:", error.message);
    return res.json({
      status: false,
      message: "Lỗi lấy lịch sử: " + error.message
    });
  }
};

/**
 * Get user insight (for debugging/analytics)
 * Endpoint này hữu ích để xem AI thấy gì về user
 */
const getUserInsight = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.json({ status: false, message: "Thiếu userId" });
    }

    const insight = await userInsightBuilder.buildUserInsight(userId);

    return res.json({
      status: true,
      message: "Lấy user insight thành công",
      data: insight
    });
  } catch (error) {
    console.error("[ChatbotController] getUserInsight error:", error.message);
    return res.json({
      status: false,
      message: "Lỗi lấy insight: " + error.message
    });
  }
};

/**
 * Get recommended courts for user
 */
const getRecommendedCourts = async (req, res) => {
  try {
    const { userId, limit = 5 } = req.query;

    if (!userId) {
      return res.json({ status: false, message: "Thiếu userId" });
    }

    const insight = await userInsightBuilder.buildUserInsight(userId);
    
    // ✅ ENSURE avoidedCourtIds is always array
    const avoidedCourtIds = Array.isArray(insight._technical?.avoidedCourtIds) 
      ? insight._technical.avoidedCourtIds 
      : [];

    // ✅ ENSURE priceRange always has min & max
    const priceRange = insight._technical?.priceRange;
    const safepriceRange = priceRange && typeof priceRange === 'object'
      ? {
          min: priceRange.min !== undefined && priceRange.min !== null ? priceRange.min : 0,
          max: priceRange.max !== undefined && priceRange.max !== null ? priceRange.max : 999999999
        }
      : { min: 0, max: 999999999 };

    console.log('[ChatbotController] getRecommendedCourts - Input:');
    console.log('  - preferredFieldTypeIds:', insight._technical?.preferredFieldTypeIds);
    console.log('  - preferredAreaIds:', insight._technical?.preferredAreaIds);
    console.log('  - priceRange:', safepriceRange);
    console.log('  - avoidedCourtIds:', avoidedCourtIds);
    console.log('  - limit:', limit);

    const courts = await courtService.getRecommendedCourts(
      {
        // ✅ Truyền actual values từ insight, ensure arrays
        preferredFieldTypeIds: Array.isArray(insight._technical?.preferredFieldTypeIds)
          ? insight._technical.preferredFieldTypeIds
          : [],
        preferredAreaIds: Array.isArray(insight._technical?.preferredAreaIds)
          ? insight._technical.preferredAreaIds
          : [],
        priceRange: safepriceRange
      },
      avoidedCourtIds,
      Number(limit) || 5
    );

    console.log('[ChatbotController] getRecommendedCourts - Result: found', courts?.length || 0, 'courts');

    return res.json({
      status: true,
      message: "Lấy sân gợi ý thành công",
      data: courts
    });
  } catch (error) {
    console.error("[ChatbotController] getRecommendedCourts error:", error.message);
    return res.json({
      status: false,
      message: "Lỗi lấy sân gợi ý: " + error.message
    });
  }
};

/**
 * Private: Get default insight for new users
 */
function _getDefaultInsight() {
  return {
    bookingStats: {
      totalBookings: 0,
      averageSpending: "Chưa có dữ liệu"
    },
    preferredFieldType: "Tất cả loại sân",
    preferredArea: "Tất cả khu vực",
    preferredTimeSlot: "Bất kỳ lúc nào",
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

module.exports = {
  sendMessage,
  clearHistory,
  getHistory,
  getUserInsight,
  getRecommendedCourts
};
