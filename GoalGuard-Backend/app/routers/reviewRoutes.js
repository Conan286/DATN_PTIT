const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

// Thêm đánh giá
router.post("/", reviewController.addReview);

// Lấy đánh giá theo sân

router.get("/:id", reviewController.getReviewsByCourt);



// Lấy tất cả review (dành cho admin)
router.get("/", reviewController.getAllReviews);

// Xóa review admin
router.delete("/:id", reviewController.deleteReview);

// user chinh sua xoa review
router.put("/:id", reviewController.updateReview);
router.post("/delete-user-review/:id", reviewController.deleteUserReview); // Dùng post để gửi kèm body id_customer

module.exports = router;



