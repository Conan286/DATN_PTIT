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
    }
};

export default reviewApi;
