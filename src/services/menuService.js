import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default {
    async getMenuByDay(day) {
        try {
            const response = await axios.get(`${API_BASE_URL}/menu/${day}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy menu của:", day, error);
            throw error;
        }
    },

    async getAllMenus() {
        try {
            const response = await axios.get(`${API_BASE_URL}/menu`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy menu:", error);
            throw error;
        }
    },
};
