import { AdminUserDto } from "../../types/adminUser";
import { IQueryParams } from "../../types/common";
import qs from "querystringify";
import axiosInstance from "../apiConfig";


const getAll = async (params: IQueryParams) => {
  const response = await axiosInstance.get(`/admin-user?${qs.stringify(params)}`);
  return response
};

const getAllNoPagination = async () => {
  const response = await axiosInstance.get(`/admin-user/no-pagination`);
  return response;
};

const create = async (data: AdminUserDto) => {
  const response = await axiosInstance.post(`/admin-user/create`, data);
  return response;
};

const update = async (id: string, data: AdminUserDto) => {
  const response = await axiosInstance.put(`/admin-user/update/${id}`, data);
  return response;
};

const getById = async (id: string) => {
  const response = await axiosInstance.get(`/admin-user/${id}`);
  return response;
};

export const adminUserApi = {
  getAll,
  create,
  getById,
  update,
  getAllNoPagination,
};
