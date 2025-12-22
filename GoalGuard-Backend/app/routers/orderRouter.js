const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// API đặt hàng sản phẩm
router.post('/place-order', OrderController.placeOrder);

// API xem lịch sử mua hàng

router.get('/order-history/:user_id', OrderController.viewOrderHistory);

// chủ sân xem tất cả đơn dịch vụ thuộc các sân của mình
router.get("/user/:userId", OrderController.getOrdersByOwner);

// cập nhật trạng thái đơn dịch vụ
router.put("/:id/update-status", OrderController.updateOrderStatus);

// ================= GENERIC (LUÔN CUỐI) =================

// lấy chi tiết 1 đơn
router.get("/:id", OrderController.getOrderById);

module.exports = router;
 