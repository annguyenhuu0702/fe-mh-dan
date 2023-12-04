import { ProblemDto } from "../../types/problem";
import axiosInstance from "../apiConfig";

const getAll = async () => {
  const response = await axiosInstance.get(`/problem`);
  return response;
};

const create = async (data: ProblemDto) => {
  const response = await axiosInstance.post(`/problem/create`, data);
  return response;
};

const update = async (id: string, data: ProblemDto) => {
  const response = await axiosInstance.put(`/problem/update/${id}`, data);
  return response;
};

const getById = async (id: string) => {
  const response = await axiosInstance.get(`/problem/${id}`);
  return response;
};

export const problemApi = {
  getAll,
  create,
  getById,
  update,
};
