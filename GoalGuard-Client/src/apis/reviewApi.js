import axiosClient from "./axiosClient";

const reviewApi = {
    // Lấy danh sách review theo id sân
 getReviewsByCourt(id) {
    const url = `/reviews/${id}`; // endpoint đúng
    return axiosClient.get(url);
},


    // Thêm review mới
    addReview(data) {
        const url = `/reviews`;  // Chuẩn rồi
        return axiosClient.post(url, data);
    },


    updateReview(id, data) {
    const url = `/reviews/${id}`;
    return axiosClient.put(url, data);
    },
    deleteReview(id, userId) {
        const url = `/reviews/delete-user-review/${id}`;
        return axiosClient.post(url, { id_customer: userId });
}
};


export default reviewApi;
