import axiosClient from "./axiosClient";

const servicePaymentApi = {
    createServicePayment(data) {
        // Thêm /api vào trước nếu cần thiết để khớp với index.js
        return axiosClient.post("/api/service-payment/create-payment", data); 
    },
};

export default servicePaymentApi;