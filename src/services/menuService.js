import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://xanbuffet.test/api",
});

export default {
    async getMenuByDay(day) {
        try {
            const response = await apiClient.get(`/menu/${day}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy menu của:", day, error);
            throw error;
        }
    },

    async getAllMenus() {
        try {
            const response = await apiClient.get("/menu");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy menu:", error);
            throw error;
        }
    },
};
