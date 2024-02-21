import { MeetDto, MeetQueryParams } from "../../types/meet";
import { IQueryParams } from "../../types/common";
import axiosInstance from "../apiConfig";
import qs from "querystringify";

// file này là đăng kí gọi api, muốn biết đường dẫn nào thì qua router backend xem, không phân trang thì là nopagination

const getAll = async (params: IQueryParams) => {
  const response = await axiosInstance.get(`/meeting?${qs.stringify(params)}`);
  return response;
};

const create = async (data: MeetDto) => {
  const response = await axiosInstance.post(`/meeting/create`, data);
  return response;
};

// const update = async (id: string, data: PrinfDto) => {
//   const response = await axiosInstance.put(`/prinf/update/${id}`, data);
//   return response;
// };

// const updateConfirm = async (id: string, data: {
//   isConfirmed: boolean
// }) => {
//   const response = await axiosInstance.patch(`/prinf/update-confirm/${id}`, data);
//   return response;
// };

// const getById = async (id: string) => {
//   const response = await axiosInstance.get(`/prinf/${id}`);
//   return response;
// };


export const meetApi = {getAll, create}
//   getAll,
//   create,
//   getById,
//   update,
//   updateConfirm
// };
