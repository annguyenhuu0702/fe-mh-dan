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

const update = async (id: string, data: DepartmentDto) => {
  const response = await axiosInstance.put(`/department/update/${id}`, data);
  return response;
};

const getById = async (id: string) => {
  const response = await axiosInstance.get(`/department/${id}`);
  return response;
};

export const departmentApi = {
  getAll,
  create,
  getById,
  update,
};
