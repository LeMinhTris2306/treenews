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

export default {
    getListCategory,
    getCategory,
};
