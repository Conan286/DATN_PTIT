const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");
const db = require("../config/db"); // 🔥 SỬA ĐÚNG PATH DB CỦA BẠN

function sortObject(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {});
}

// ================== CREATE PAYMENT ==================
exports.createPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body;

        if (!orderId || !amount) {
            return res.status(400).json({ message: "Missing orderId or amount" });
        }

        const tmnCode = process.env.VNP_TMN_CODE;
        const secretKey = process.env.VNP_HASH_SECRET;
        const vnpUrl = process.env.VNP_URL;
        const returnUrl = process.env.VNP_SERVICE_RETURN_URL;

        const createDate = moment().format("YYYYMMDDHHmmss");

        let vnp_Params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: tmnCode,
            vnp_Locale: "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: `${orderId}_${Date.now()}`,
            vnp_OrderInfo: "Thanh_toan_dich_vu",
            vnp_OrderType: "other",
            vnp_Amount: Math.round(Number(amount) * 100),
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: "127.0.0.1",
            vnp_CreateDate: createDate
        };

        vnp_Params = sortObject(vnp_Params);

        const signData = qs.stringify(vnp_Params, { encode: true });
        const secureHash = crypto
            .createHmac("sha512", secretKey)
            .update(signData)
            .digest("hex");

        vnp_Params.vnp_SecureHash = secureHash;

        const paymentUrl =
            vnpUrl + "?" + qs.stringify(vnp_Params, { encode: true });

        return res.json({ paymentUrl });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Create payment failed" });
    }
};

// ================== VNPAY RETURN ==================
exports.vnpayReturn = async (req, res) => {
    try {
        const vnp_Params = { ...req.query };
        const secureHash = vnp_Params.vnp_SecureHash;

        delete vnp_Params.vnp_SecureHash;
        delete vnp_Params.vnp_SecureHashType;

        const sortedParams = sortObject(vnp_Params);
        const signData = qs.stringify(sortedParams, { encode: true });

        const checkHash = crypto
            .createHmac("sha512", process.env.VNP_HASH_SECRET)
            .update(signData)
            .digest("hex");

        //  HASH KHÔNG HỢP LỆ
        if (secureHash !== checkHash) {
            return res.redirect("http://localhost:3500/payment-fail");
        }

        const responseCode = vnp_Params.vnp_ResponseCode; // 🔥 QUAN TRỌNG
        const orderId = vnp_Params.vnp_TxnRef.split("_")[0];

        //  NGƯỜI DÙNG HỦY / FAIL
        if (responseCode !== "00") {
            console.log("Thanh toán thất bại hoặc bị hủy:", responseCode);

            // (optional) cập nhật rejected
            await db.execute(
                "UPDATE orders SET status = ? WHERE id = ?",
                ["pending", orderId]
            );

            return res.redirect("http://localhost:3500/paymentorder-fail");
        }

        //  THANH TOÁN THÀNH CÔNG
        await db.execute(
            "UPDATE orders SET status = ? WHERE id = ?",
            ["final", orderId]
        );

        console.log("Thanh toán thành công order:", orderId);
        return res.redirect("http://localhost:3500/paymentorder-success");

    } catch (err) {
        console.error(err);
        return res.redirect("http://localhost:3500/paymentorder-fail");
    }
};
