import axios from "axios";
import { Jobs } from "../components/Job/interfaces/job";
import { getJwtTokenFromLocalStorage } from "../utilities/auth";

import { settings } from "./config";
import { JobsAPIResponse } from "./interfaces/jobs";

const myAxios = axios.create({
  baseURL: settings.jobsApiUrl,
});

export class JobsAPI {
  static async findAll() {
    return await myAxios.get<JobsAPIResponse[]>(`${settings.jobsPath}`, {
      headers: {
        Authorization: getJwtTokenFromLocalStorage(),
      },
    });
  }
  static async findOne(id: string) {
    return await myAxios.get<JobsAPIResponse>(`${settings.jobsPath}/${id}`, {
      headers: {
        Authorization: getJwtTokenFromLocalStorage(),
      },
    });
  }
  static async create(data: Jobs) {
    return await myAxios.post<JobsAPIResponse>(`${settings.jobsPath}`, data, {
      headers: {
        Authorization: getJwtTokenFromLocalStorage(),
      },
    });
  }

  static async delete(id: string) {
    return await myAxios.delete(`${settings.jobsPath}/${id}`, {
      headers: {
        Authorization: getJwtTokenFromLocalStorage(),
      },
    });
  }

  static async update(id: string, data: Jobs) {
    return await myAxios.patch(`${settings.jobsPath}/${id}`, data, {
      headers: {
        Authorization: getJwtTokenFromLocalStorage(),
      },
    });
  }
}
