import { localStorageKeys } from "../api/config";
import { JobsAPI } from "../api/jobs";

export const verifyUser = async (token: string) => {
  if (!token) return false;

  try {
    const response = await JobsAPI.verify(token);
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
