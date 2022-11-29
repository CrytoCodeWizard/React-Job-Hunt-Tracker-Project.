export const settings = {
  jobsApiUrl: process.env.REACT_APP_JOBS_API_URL,
  authPath: "/api/v1/auth",
  jobsPath: "/api/v1/jobs",
  verifyPath: "/api/v1/verify",
};

export const localStorageKeys = {
  jwtToken: process.env.REACT_APP_LOCAL_STORAGE_JWT_ACCESS_TOKEN ?? "",
};
