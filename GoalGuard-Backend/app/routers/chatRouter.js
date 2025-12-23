const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatController");

// Send message to chatbot
router.post("/send", chatbotController.sendMessage);

// Clear conversation history
router.post("/clear-history", chatbotController.clearHistory);

// Get conversation history
router.get("/history", chatbotController.getHistory);

module.exports = router;
