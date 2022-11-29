export interface Jobs {
  company: string;
  jobTitle: string;
  status: string;
}

export interface JobsAPIResponse extends Jobs {
  _id: string;
  createdBy: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}
