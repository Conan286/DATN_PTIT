import axiosClient from "./axiosClient";

const orderAPI = {
    placeOrder(data) {
        // 🚨 URL ĐÚNG
        return axiosClient.post("/orders/place-order", data);
    },

   getMyOrders(userId) {
    return axiosClient.get(`/orders/order-history/${userId}`);
},
};

export default orderAPI;
