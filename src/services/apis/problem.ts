import { ProblemDto, ProblemQueryParams } from "../../types/problem";
import { IQueryParams } from "../../types/common";
import axiosInstance from "../apiConfig";
import qs from "querystringify";

// file này là đăng kí gọi api, muốn biết đường dẫn nào thì qua router backend xem, không phân trang thì là nopagination

const getAll = async (params: IQueryParams) => {
  const response = await axiosInstance.get(`/problem?${qs.stringify(params)}`);
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

const problemReport = async (payload: ProblemQueryParams) => {
  const response = await axiosInstance.get(
    `/problem/report/department-industry?${qs.stringify(payload)}`
  );
  return response;
};

const problemReportStatistical = async (payload: ProblemQueryParams) => {
  const response = await axiosInstance.get(
    `/problem/report/statistical?${qs.stringify(payload)}`
  );
  return response;
};

export const problemApi = {
  getAll,
  create,
  getById,
  update,
  problemReport,
  problemReportStatistical,
};
