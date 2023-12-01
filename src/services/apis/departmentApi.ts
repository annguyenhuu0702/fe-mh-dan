import { DepartmentDto } from "../../types/department";
import axiosInstance from "../apiConfig";

const getAll = async () => {
  const response = await axiosInstance.get(`/department`);
  return response;
};

const create = async (data: DepartmentDto) => {
  const response = await axiosInstance.post(`/department/create`, data);
  return response;
};

export const departmentApi = {
  getAll,
  create,
};
