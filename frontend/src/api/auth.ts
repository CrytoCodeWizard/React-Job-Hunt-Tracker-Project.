import axios from "axios";
import { getJwtTokenFromLocalStorage } from "../utilities/auth";
import { settings } from "./config";
import {
  UserLogin,
  UserRegister,
  UserLoginResponse,
  UserRegisterResponse,
} from "./interfaces/auth";

const myAxios = axios.create({
  baseURL: settings.jobsApiUrl,
});

export class AuthAPI {
  static async register(data: UserRegister) {
    const result = await myAxios.post<UserRegisterResponse>(
      `${settings.authPath}/register`,
      data
    );
    return result;
  }

  static async login(data: UserLogin) {
    const response = await myAxios.post<UserLoginResponse>(
      `${settings.authPath}/login`,
      data
    );
    return response;
  }

  static async verifyJwt() {
    const response = await myAxios.get(settings.verifyPath, {
      headers: {
        Authorization: getJwtTokenFromLocalStorage(),
      },
    });
    return response;
  }
}
