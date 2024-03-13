import { MeetDto, MeetQueryParams } from "../../types/meet";
import { IQueryParams } from "../../types/common";
import axiosInstance from "../apiConfig";
import qs from "querystringify";

// file này là đăng kí gọi api, muốn biết đường dẫn nào thì qua router backend xem, không phân trang thì là nopagination

const getById = async (id: string) => {
  const response = await axiosInstance.get(`/meeting/${id}`);
  return response;
};

const create = async (data: MeetDto) => {
  const response = await axiosInstance.post(`/meeting/create`, data);
  return response;
};

const update = async (id: string, data: MeetDto) => {
  const response = await axiosInstance.put(`/meeting/update/${id}`, data);
  return response;
};

const getAll = async (params: IQueryParams) => {
  const response = await axiosInstance.get(`/meeting?${qs.stringify(params)}`);
  return response;
};

const deleteById = async (id: number) => {
  const response = await axiosInstance.delete(`/meeting/delete/${id}`);
  return response;
};

export const meetApi = { getById, create, getAll, update, deleteById };
