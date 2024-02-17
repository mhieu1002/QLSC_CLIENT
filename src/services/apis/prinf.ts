import { PrinfDto, PrinfQueryParams } from "../../types/prinf";
import { IQueryParams } from "../../types/common";
import axiosInstance from "../apiConfig";
import qs from "querystringify";

// file này là đăng kí gọi api, muốn biết đường dẫn nào thì qua router backend xem, không phân trang thì là nopagination

const getAll = async (params: IQueryParams) => {
  const response = await axiosInstance.get(`/prinf?${qs.stringify(params)}`);
  return response;
};

const create = async (data: PrinfDto) => {
  const response = await axiosInstance.post(`/prinf/create`, data);
  return response;
};

const update = async (id: string, data: PrinfDto) => {
  const response = await axiosInstance.put(`/prinf/update/${id}`, data);
  return response;
};

const getById = async (id: string) => {
  const response = await axiosInstance.get(`/prinf/${id}`);
  return response;
};


export const prinfApi = {
  getAll,
  create,
  getById,
  update,
};
