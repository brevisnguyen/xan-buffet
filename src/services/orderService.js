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
        if (error.response && error.response.status === 404) {
            console.warn("Không tìm thấy đơn hàng:", orderId);
            return {
                success: false,
                message: "Đơn hàng không tồn tại",
            };
        } else if (error.response) {
            console.error("Lỗi phản hồi từ server:", error.response.status, error.response.data);
            return {
                success: false,
                message: error.response.data.message || "Có lỗi xảy ra khi lấy thông tin đơn hàng.",
            };
        } else if (error.request) {
            console.error("Không nhận được phản hồi từ server:", error.request);
            return {
                success: false,
                message: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.",
            };
        } else {
            console.error("Lỗi không xác định:", error.message);
            return {
                success: false,
                message: "Đã xảy ra lỗi không xác định.",
            };
        }
    }
};
