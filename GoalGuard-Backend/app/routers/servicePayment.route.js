const express = require("express");
const router = express.Router();
const servicePaymentController = require("../controllers/servicePayment.controller");

// Tạo link thanh toán
router.post("/create-payment", servicePaymentController.createPayment);

// VNPAY redirect về
router.get("/vnpay-return", servicePaymentController.vnpayReturn);

module.exports = router;
