import axios from "axios";
import { applicationConfig } from "../config";

const axiosInstance = axios.create({
  baseURL: applicationConfig.baseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

export default axiosInstance;
