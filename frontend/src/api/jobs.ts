import axios from "axios";
import { Jobs } from "../components/Job/interfaces/jobs";
import { getJwtTokenFromLocalStorage } from "../utilities/auth";

import { settings } from "./config";
import { JobsAPIResponse } from "./interfaces/jobs";

const myAxios = axios.create({
  baseURL: settings.jobsApiUrl,
  headers: {
    Authorization: getJwtTokenFromLocalStorage(),
  },
});

export class JobsAPI {
  static async findAll() {
    return await myAxios.get<JobsAPIResponse[]>(`${settings.jobsPath}`);
  }
  static async findOne(id: string) {
    return await myAxios.get<JobsAPIResponse>(`${settings.jobsPath}/${id}`);
  }
  static async create(data: Jobs) {
    return await myAxios.post<JobsAPIResponse>(`${settings.jobsPath}`, data);
  }

  static async delete(id: string) {
    return await myAxios.delete(`${settings.jobsPath}/${id}`);
  }

  static async deleteAll() {
    return await myAxios.delete(`${settings.jobsPath}`);
  }

  static async update(id: string, data: Jobs) {
    return await myAxios.patch(`${settings.jobsPath}/${id}`, data);
  }
}
