const db = require('../config/db');

// Đặt hàng sản phẩm
exports.placeOrder = async (req, res) => {
    try {
        const { userId,courtId, productId, quantity, totalPrice, paymentMethod } = req.body;

        if (!userId || !productId || !courtId) {
            return res.status(400).json({ message: "Thiếu dữ liệu" });
        }

        const [result] = await db.execute(
            `INSERT INTO orders (user_id, court_id, product_id, quantity, total_price, payment_method)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, courtId ,productId, quantity, totalPrice, paymentMethod]
        );

        res.status(200).json({
            message: "Đặt dịch vụ thành công",
            orderId: result.insertId
        });
    } catch (err) {
        console.error("ORDER ERROR:", err);
        res.status(500).json({ message: "Lỗi đặt dịch vụ" });
    }
};



// Xem lịch sử mua hàng của người dùng
exports.viewOrderHistory = async (req, res) => {
    try {
        const userId = req.params.user_id;
        console.log("userId from params:", userId);

        if (!userId) return res.status(400).json({ message: "Thiếu userId" });

        const query = 'SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC';
      /*  SELECT o.*, c.name AS court_name
          FROM orders o
          LEFT JOIN courts c ON o.court_id = c.id
          WHERE o.user_id = ?
        ORDER BY o.id DESC*/
        console.log("Executing SQL:", query, "with", userId);

        const [rows] = await db.execute(`
    SELECT o.*, c.name AS court_name, p.name AS product_name
    FROM orders o
    LEFT JOIN courts c ON o.court_id = c.id
    LEFT JOIN products p ON o.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.id DESC
`, [userId]);
        console.log("rows:", rows);

        res.status(200).json(rows);
    } catch (error) {
        console.error("ORDER HISTORY ERROR:", error);
        res.status(500).json({ message: 'Error getting order history' });
    }};


// Lấy tất cả các đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM orders');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting orders' });
    }
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting order' });
    }
};

// Tìm kiếm đơn hàng
exports.searchOrders = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const [rows] = await db.execute('SELECT * FROM orders WHERE id LIKE ?', [`%${keyword}%`]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching orders' });
    }
};