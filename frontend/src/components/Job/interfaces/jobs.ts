import { IUser } from "../../../api/interfaces/auth";

export interface Jobs {
  company: string;
  jobTitle: string;
  status?: string;
  userComment?: string;
}

export interface IJob extends Jobs {
  id: string;
  user: IUser;
}

export enum JobStatus {
  DECLINED = "declined",
  PENDING = "pending",
  INTERVIEW = "interview",
}
