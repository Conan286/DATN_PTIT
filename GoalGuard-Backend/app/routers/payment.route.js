const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");
const paymentController = require("../controllers/payment.controller");

function sortObject(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {});
}

router.post("/create-payment", (req, res) => {
    try {
        const { bookingId, amount } = req.body;
        console.log(bookingId);
        const tmnCode = process.env.VNP_TMN_CODE;
        const secretKey = process.env.VNP_HASH_SECRET;
        const vnpUrl = process.env.VNP_URL;
        const returnUrl = process.env.VNP_RETURN_URL;

        const createDate = moment().format("YYYYMMDDHHmmss");

        let vnp_Params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: tmnCode,
            vnp_Locale: "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: `${bookingId}_${Date.now()}`,
            vnp_OrderInfo: "Thanh_toan_dat_san_bong", // ❗ KHÔNG DÙNG SPACE
            vnp_OrderType: "other",
            vnp_Amount: parseInt(amount, 10) * 100,
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: "127.0.0.1",
            vnp_CreateDate: createDate
        };

        // SORT
        vnp_Params = sortObject(vnp_Params);

        // 🔥 KÝ PHẢI encode = true
        const signData = qs.stringify(vnp_Params, { encode: true });

        const secureHash = crypto
            .createHmac("sha512", secretKey)
            .update(signData)
            .digest("hex");

        vnp_Params.vnp_SecureHash = secureHash;

        // 🔥 URL gửi đi encode = true
        const paymentUrl =
            vnpUrl + "?" + qs.stringify(vnp_Params, { encode: true });

        console.log("VNPAY URL:", paymentUrl);
        res.json({ paymentUrl });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Create payment failed" });
    }
});

// router.get("/return", (req, res) => {
//     console.log("VNPAY RETURN:", req.query);
//     res.redirect("http://localhost:3500/payment-success");
// });
router.get("/vnpay-return", paymentController.vnpayReturn);


module.exports = router;
