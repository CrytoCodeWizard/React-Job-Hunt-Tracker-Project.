import { AuthAPI } from "../api/auth";
import { localStorageKeys } from "../api/config";

export const verifyUser = async () => {
  try {
    const response = await AuthAPI.verifyJwt();
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getJwtTokenFromLocalStorage = () =>
  `Bearer ${localStorage.getItem(localStorageKeys.jwtToken)}` ?? "";
