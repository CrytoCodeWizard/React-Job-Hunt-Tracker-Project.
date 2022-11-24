import { ObjectId } from "mongoose";
import { JobStatus } from "../enums/JobStatus";

export interface IJob {
  company: string;
  jobTitle: string;
  status: JobStatus;
  createdBy: ObjectId;
  userName: string;
}
