import axios from "axios";
import { variables } from "./variables";
import { jwtDecode } from "jwt-decode";

const API_URL = variables.ADMIN_URL;

const login = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}login`, loginData);
        console.log(response.data);
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            const decodedToken = jwtDecode(response.data);
            console.log("decoded");
            console.log(decodedToken);
            return { userId: decodedToken.userid, type: "success" };
        } else return null;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return {
                message: "Thông tin đang nhập không chính xác",
                type: "danger",
            };
        } else if (error.response && error.response.status === 403) {
            return {
                message: "Người dùng không có quyền truy cập",
                type: "danger",
            };
        } else {
            return { message: "Có lỗi đã xảy ra", type: "danger" };
        }
    }
};

export default {
    login,
};
