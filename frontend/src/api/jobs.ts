import axios from "axios";
import { Jobs } from "../components/Job/interfaces/jobs";

import { settings } from "./config";
import { JobsAPIResponse } from "./interfaces/jobs";

const myAxios = axios.create({
  baseURL: settings.jobsApiUrl,
});

export class JobsAPI {
  static async findAll(token: string) {
    return await myAxios.get<JobsAPIResponse[]>(`${settings.jobsPath}`, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  static async verify(token: string) {
    return await myAxios.get<JobsAPIResponse[]>(`${settings.jobsPath}`, {
      headers: { Authorization: "Bearer " + token },
    });
  }
  static async findOne(id: string, token: string) {
    return await myAxios.get<JobsAPIResponse>(`${settings.jobsPath}/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
  }
  static async create(data: Jobs, token: string) {
    return await myAxios.post<JobsAPIResponse>(`${settings.jobsPath}`, data, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  static async delete(id: string, token: string) {
    return await myAxios.delete(`${settings.jobsPath}/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  static async deleteAll(token: string) {
    return await myAxios.delete(`${settings.jobsPath}`, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  static async update(id: string, data: Jobs, token: string) {
    return await myAxios.patch(`${settings.jobsPath}/${id}`, data, {
      headers: { Authorization: "Bearer " + token },
    });
  }
}
