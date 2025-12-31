const db = require("../config/db");
const moment = require("moment");
const crypto = require("crypto");
const qs = require("qs");


exports.createPayment = async (req, res) => {
    const { bookingId, amount } = req.body;

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    const vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;

    const date = moment().format("YYYYMMDDHHmmss");
    const orderId = bookingId + "_" + date;
    
    let vnpParams = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId,
        vnp_OrderInfo: "Thanh toan dat san",
        vnp_OrderType: "billpayment",
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: req.ip,
        vnp_CreateDate: date,
    };

    vnpParams = sortObject(vnpParams);

    const signData = qs.stringify(vnpParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    vnpParams.vnp_SecureHash = hmac.update(signData).digest("hex");

    const paymentUrl = vnpUrl + "?" + qs.stringify(vnpParams, { encode: false });

    res.json({ paymentUrl });
};

exports.vnpayReturn = async (req, res) => {
    try {
        console.log("--- ĐÃ VÀO HÀM VNPAY_RETURN ---");
        let vnpParams = req.query;
        
        // 1. Kiểm tra mã phản hồi từ VNPay trước
        if (vnpParams['vnp_ResponseCode'] !== "00") {
            console.log("Thanh toán thất bại tại VNPay");
            return res.send("Lỗi từ VNPay: " + vnpParams['vnp_ResponseCode']);
        }

        // 2. Lấy ID đơn hàng
        const bookingId = vnpParams['vnp_TxnRef'].split("_")[0];
        console.log("Booking ID:", bookingId);
        const status = 'final';
        // 3. Thực hiện Update (Đoạn này dễ lỗi nhất do lỗi kết nối DB)
        try {
            const [result] = await db.execute(
                "UPDATE bookings SET status = ? WHERE id = ?",
                [status,bookingId]
            );
            
            if (result.affectedRows > 0) {
                console.log("DB CẬP NHẬT THÀNH CÔNG!");
                return res.redirect("http://localhost:3500/payment-success");
            } else {
                console.log("LỖI: Không tìm thấy ID này trong bảng bookings");
                return res.send("Lỗi: Không tìm thấy đơn hàng trong Database.");
            }
        } catch (dbError) {
            console.error("LỖI KẾT NỐI DATABASE:", dbError.message);
            return res.status(500).send("Lỗi Database: " + dbError.message);
        }

    } catch (error) {
        console.error("LỖI HỆ THỐNG:", error);
        return res.status(500).send("Lỗi hệ thống: " + error.message);
    }
};

function sortObject(obj) {
    return Object.keys(obj).sort().reduce((result, key) => {
        result[key] = obj[key];
        return result;
    }, {});
}
