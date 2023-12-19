import { IQueryParams } from "../../types/common";
import { DepartmentDto } from "../../types/department";
import axiosInstance from "../apiConfig";
import qs from "querystringify";

const getAll = async (params: IQueryParams) => {
  const response = await axiosInstance.get(
    `/department?${qs.stringify(params)}`
  );
  return response;
};

const getAllNoPagination = async () => {
  const response = await axiosInstance.get(`/department/no-pagination`);
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
  getAllNoPagination,
};
