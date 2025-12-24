const db = require('../config/db');

exports.addReview = async (req, res) => {
    try {
        const { rating, review_text, id_customer, id_courts } = req.body;

        if (!rating || !id_customer || !id_courts) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const [result] = await db.execute(
            `INSERT INTO reviews (rating, review_text, id_customer, id_courts)
             VALUES (?, ?, ?, ?)`,
            [rating, review_text, id_customer, id_courts]
        );

        res.status(200).json({
            message: "Review added successfully",
            id_reviews: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding review" });
    }
};


exports.getReviewsByCourt = async (req, res) => {
    try {
        const courtId = req.params.id;

        const [rows] = await db.execute(`
           SELECT reviews.*, users.username AS user_name, users.image AS user_avatar
            FROM reviews
            LEFT JOIN users ON reviews.id_customer = users.id
            WHERE reviews.id_courts = ?
            ORDER BY reviews.created_at DESC
        `, [courtId]);
            if (rows.length > 0) {
        res.status(200).json(rows);
            }
            else {
            res.status(404).json({ message: 'Court not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching reviews" });
    }
};




// Lấy tất cả review (dành cho admin)
exports.getAllReviews = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT r.id_reviews, r.rating, r.review_text, r.id_customer, r.id_courts,
             r.created_at, u.username AS user_name
      FROM reviews r
      LEFT JOIN users u ON r.id_customer = u.id
      ORDER BY r.id_reviews DESC
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error in getAllReviews:", err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

// Xóa review theo id_reviews admin
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const [result] = await db.execute(
      `DELETE FROM reviews WHERE id_reviews = ?`,
      [reviewId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error in deleteReview:", err);
    res.status(500).json({ message: "Failed to delete review" });
  }
};


// Cập nhật review
exports.updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { rating, review_text, id_customer } = req.body;

        const [result] = await db.execute(
            `UPDATE reviews SET rating = ?, review_text = ? 
             WHERE id_reviews = ? AND id_customer = ?`,
            [rating, review_text, reviewId, id_customer]
        );

        if (result.affectedRows === 0) {
            return res.status(403).json({ message: "Bạn không có quyền sửa đánh giá này hoặc đánh giá không tồn tại" });
        }

        res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật" });
    }
};

// Xóa review user xóa
exports.deleteUserReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { id_customer } = req.body; // Gửi id người dùng từ frontend

        const [result] = await db.execute(
            `DELETE FROM reviews WHERE id_reviews = ? AND id_customer = ?`,
            [reviewId, id_customer]
        );

        if (result.affectedRows === 0) {
            return res.status(403).json({ message: "Bạn không có quyền xóa đánh giá này" });
        }
        res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa" });
    }
};