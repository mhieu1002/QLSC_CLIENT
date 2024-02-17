import { IQueryParams } from "./common";

type PrinfDto = {
  adminUserId?: number;
  departmentId?: number;
  prinf: string;
  location: string;
  noteUser: string;
  status: string;
  processingDate: string;
  noteAdmin: string;
  reciever: string;
  isConfirmed: string;
};

type PrinfQueryParams = IQueryParams & {
  startDate?: Date;
  endDate?: Date;
  departmentId?: number;
  industry?: string;
};

type PrinfResponse = {
  adminUserId: number;
  adminUserName: string;
  contact: string;
  departmentId: number;
  departmentName: string;
  id: number;
  industry: string;
  note: string;
  processingDate: string;
  reciever: string;
  status: string;
  title: string;
  waittingTime: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: Date | null;
};

export type { PrinfDto, PrinfQueryParams, PrinfResponse };
