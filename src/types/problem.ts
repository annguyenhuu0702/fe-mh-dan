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

export type { ProblemDto, ProblemQueryParams };
