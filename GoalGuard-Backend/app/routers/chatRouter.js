const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatController");

// Send message to chatbot
router.post("/send", chatbotController.sendMessage);

// Clear conversation history
router.post("/clear-history", chatbotController.clearHistory);

// Get conversation history
router.get("/history", chatbotController.getHistory);

// Get user insight (for debugging & analytics)
router.get("/user-insight", chatbotController.getUserInsight);

// Get recommended courts for user
router.get("/recommended-courts", chatbotController.getRecommendedCourts);


module.exports = router;
