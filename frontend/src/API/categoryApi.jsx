import axios from "axios";
import { variables } from "./variables";
import { jwtDecode } from "jwt-decode";

const API_URL = variables.CATEGORY_URL;

const getListCategory = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export default {
  getListCategory,
};
