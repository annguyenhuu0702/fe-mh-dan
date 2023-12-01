import { LoginDto } from "../../types/auth";
import axiosInstance from "../apiConfig";

const login = async (data: LoginDto) => {
  const response = await axiosInstance.post(`/auth/login`, data);
  return response;
};

const getProfile = async () => {
  const response = await axiosInstance.get(`/auth/profile`);
  return response;
};

export const authApi = {
  login,
  getProfile,
};
