import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BASE_URL } from "../constants";
import Cookies from "js-cookie";

interface ApiResponse<T> {
  data: T;
}

interface ApiError<T> {
  data: T;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL.BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor để xử lý token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = `Bearer ${Cookies.get("accessToken")}`;
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log("🚀 ~ file: apiConfig.ts:30 ~ error:", error);
    return Promise.reject(error);
  }
);

const handleError = (error: AxiosResponse<ApiError<any>>): Promise<never> => {
  console.log("🚀 ~ file: apiConfig.ts:23 ~ handleError ~ error:", error);
  return Promise.reject({
    data: error,
  });
};

// Interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
  (response: ApiResponse<any>) => {
    return response.data;
  },
  (error: AxiosResponse<ApiError<any>>) => {
    if (axios.isAxiosError(error)) {
      return handleError(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
