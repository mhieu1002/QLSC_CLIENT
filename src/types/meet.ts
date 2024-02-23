import { IQueryParams } from "./common";

type MeetDto = {
  adminUserId?: number;
  departmentId?: number;
  title: string;
  host: string;
  room: string;
  participants: string;
  startTime: string;
  endTime: string;
};

type MeetQueryParams = IQueryParams & {
  startDate?: Date;
  endDate?: Date;
  departmentId?: number;
  industry?: string;
};

export type { MeetDto, MeetQueryParams  };