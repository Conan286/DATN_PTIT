import axiosClient from "./axiosClient";

// src/apis/serviceOrderApi.js

const serviceOrderApi = {
    // Backend: router.post('/place-order', ...)
    placeOrder(data) {
        return axiosClient.post("/orders/place-order", data); 
    },

    // Backend: router.get('/order-history/:user_id', ...)
    getOrderHistory(userId) {
        return axiosClient.get(`/orders/order-history/${userId}`);
    },

    // Backend: router.get("/user/:userId", ...)
    // CHANGE "owner" TO "user"
    getOrdersByOwner(userId) {
        return axiosClient.get(`/orders/user/${userId}`);
    },

    // Backend: router.put("/:id/update-status", ...)
    updateStatus(id, status) {
        return axiosClient.put(`/orders/${id}/update-status`, { status });
    }
};

export default serviceOrderApi;
