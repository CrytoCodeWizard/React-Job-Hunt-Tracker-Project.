import { localStorageKeys } from "../api/config";
import { JobsAPI } from "../api/jobs";

export const verifyUser = async () => {
  try {
    const response = await JobsAPI.findAll();
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
