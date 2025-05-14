import axios from "axios";
import { variables } from "./variables";
import { jwtDecode } from "jwt-decode";

const ADMIN_API_URL = variables.ADMIN_URL;
const USER_API_URL = variables.USER_URL;

const login = async (loginData) => {
    try {
        const response = await axios.post(`${ADMIN_API_URL}login`, loginData);
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

const getUser = async (userId) => {
    const response = await axios.get(`${ADMIN_API_URL}getuser/${userId}`);
    return response.data;
};

const getUsers = async (n) => {
    const response = await axios.get(`${ADMIN_API_URL}getusers?n=${n}`);
    return response.data;
};

const createUser = async (regData) => {
    try {
        delete regData.confirmPassword;
        regData.userType = "Reader";
        regData.phoneNumber = "";
        regData.birthday = "01/01/2003";
        const response = await axios.post(`${USER_API_URL}`, regData);
        return { message: "Đăng ký thành công", type: "success" };
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
            return { message: "Email đã được sử dụng", type: "danger" };
        } else {
            return { message: "Có lỗi đã xảy ra", type: "danger" };
        }
    }
};

const updateUser = async (uptData, id) => {
    try {
        const response = await axios.put(`${USER_API_URL}${id}`, uptData);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
            return { error: "Người dùng không tồn tại" };
        } else {
            return { error: "Có lỗi đã xảy ra" };
        }
    }
};

const changePasswrod = async (passwords, id) => {
    try {
        const response = await axios.put(
            `${USER_API_URL}${id}/changepassword`,
            passwords
        );
        return true;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
            return { error: "Mật khẩu cũ không đúng" };
        } else {
            return { error: "Có lỗi đã xảy ra" };
        }
    }
};

const changeAvatar = async (img, id) => {
    try {
        const formData = new FormData();
        formData.append("image", img);
        const response = await axios.put(
            `${USER_API_URL}${id}/changeavatar`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
            return { error: "Có lỗi khi upload ảnh" };
        } else {
            return { error: "Có lỗi đã xảy ra" };
        }
    }
};

const getDashboardInfo = async () => {
    try {
        const response = await axios.get(`${ADMIN_API_URL}dashboard`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default {
    login,
    getUser,
    getUsers,
    createUser,
    updateUser,
    changePasswrod,
    changeAvatar,
    getDashboardInfo,
};
