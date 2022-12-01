import { JobStatus } from "../../components/Job/interfaces/jobs";

export interface Jobs {
  company: string;
  jobTitle: string;
  status: JobStatus;
}

export interface JobsAPIResponse extends Jobs {
  _id: string;
  createdBy: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  userComment?: string;
  __v: string;
}
