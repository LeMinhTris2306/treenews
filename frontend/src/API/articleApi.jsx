import axios from "axios";
import { variables } from "./variables";
import { jwtDecode } from "jwt-decode";
import { Form } from "react-hook-form";

const API_URL = variables.ARTICLE_URL;

const getArticle = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getListArticle = async (n, skip, args = null) => {
  const url = `${API_URL}custom?n=${n}&skip=${skip}`;
  try {
    const response = await axios.post(url, args ? args : null);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createArticle = async (articleDetail, files) => {
  try {
    const formData = new FormData();
    formData.append("article", JSON.stringify(articleDetail));
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
    const response = await axios.post(`${API_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 409) {
      return { error: "Trùng tiêu đề" };
    } else if (error.response && error.response.status === 400) {
      return { error: "Bài báo yêu cầu ít nhất 1 hình ảnh đi kèm" };
    } else {
      return { error: "Có lỗi đã xảy ra" };
    }
  }
};

export default {
  getArticle,
  getListArticle,
  createArticle,
};
