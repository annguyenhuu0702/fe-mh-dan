import { IQueryParams } from "./common";

type ProblemDto = {
  adminUserId?: number;
  departmentId?: number;
  title: string;
  industry: string;
  contact: string;
  status: string;
  note: string;
  reciever: string;
};

type ProblemQueryParams = IQueryParams & {
  startDate?: Date;
  endDate?: Date;
  departmentId?: number;
  industry?: string;
};

type ProblemResponse = {
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

export type { ProblemDto, ProblemQueryParams, ProblemResponse };
