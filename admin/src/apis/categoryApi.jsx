import axios from "axios";
import { variables } from "./variables";

const API_URL = variables.CATEGORY_URL;

const getListCategory = async (n) => {
    const response = await axios.get(`${API_URL}?n=${n}`);
    return response.data;
};

const getCategory = async (urlDisplay) => {
    try {
        const response = await axios.get(`${API_URL}${urlDisplay}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error };
    }
};

const updateCategory = async (categoryId, newData) => {
    try {
        await axios.put(`${API_URL}${categoryId}`, newData);
        return { message: "Cập nhật thành công", type: "success" };
    } catch (error) {
        if (error.response && error.response.status === 404)
            return { message: "Không tìm thấy thể loại", type: "danger" };
        else return { message: "Có lỗi đã xảy ra", type: "danger" };
    }
};

const deleteCategory = async (categoryId) => {
    try {
        await axios.delete(`${API_URL}${categoryId}`);
        return { message: "Xóa thể loại thành công", type: "success" };
    } catch (error) {
        if (error.response && error.response.status === 404)
            return { message: "Không tìm thấy thể loại", type: "danger" };
        else return { message: "Có lỗi đã xảy ra", type: "danger" };
    }
};

const createCategory = async (data) => {
    try {
        await axios.post(`${API_URL}`, data);
        return { message: "Xóa thể loại thành công", type: "success" };
    } catch (error) {
        if (error.response && error.response.status === 409)
            return { message: "Thể loại đã tồn tại", type: "danger" };
        else return { message: "Có lỗi đã xảy ra", type: "danger" };
    }
};

export default {
    getListCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    createCategory,
};
