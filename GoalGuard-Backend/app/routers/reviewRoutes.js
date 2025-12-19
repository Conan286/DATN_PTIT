const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

// Thêm đánh giá
router.post("/", reviewController.addReview);

// Lấy đánh giá theo sân

router.get("/:id", reviewController.getReviewsByCourt);



// Lấy tất cả review (dành cho admin)
router.get("/", reviewController.getAllReviews);

// Xóa review
router.delete("/:id", reviewController.deleteReview);

module.exports = router;



