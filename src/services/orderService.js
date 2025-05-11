import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error("Tạo đơn hàng thất bại:", error);
        throw error;
    }
};

export const getOrderStatus = async (orderId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Lấy trạng thái đơn hàng thất bại:", error);
        throw error;
    }
};
