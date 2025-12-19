import axiosClient from "./axiosClient";

const reviewManagementApi = {
  async getAllReviews() {
    try {
      const response = await axiosClient.get("/reviews");
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteReview(id) {
    try {
      const response = await axiosClient.delete(`/reviews/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async addReview(review) {
    try {
      const response = await axiosClient.post("/reviews", review);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default reviewManagementApi;
