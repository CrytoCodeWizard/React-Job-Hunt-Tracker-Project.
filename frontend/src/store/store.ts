import create from "zustand";
import produce from "immer";

import { JobsAPIResponse } from "../api/interfaces/jobs";

interface AppState {
  user: {
    id: string;
    name: string;

    isVerified: boolean;
    token: string;
  };

  jobs: JobsAPIResponse[];

  authMethod: string;

  setId: (value: string) => void;
  setName: (value: string) => void;

  setIsVerified: (value: boolean) => void;
  setToken: (value: string) => void;

  setAuthMethod: (value: string) => void;

  setJobs: (value: JobsAPIResponse[] | JobsAPIResponse) => void;
  deleteJob: (id: string) => void;
  deleteAllJobs: () => void;
}

const useAppStore = create<AppState>()((set) => ({
  user: { token: "", name: "", id: "", isVerified: false },
  authMethod: "",
  jobs: [],

  setToken: (value) =>
    set(
      produce((state) => {
        state.user.token = value;
      })
    ),

  setIsVerified: (value) =>
    set(
      produce((state) => {
        state.user.isVerified = value;
      })
    ),
  setName: (value) =>
    set(
      produce((state) => {
        state.user.name = value;
      })
    ),

  setId: (value) =>
    set(
      produce((state) => {
        state.user.id = value;
      })
    ),

  setAuthMethod: (value) =>
    set(
      produce((state) => {
        state.authMethod = value;
      })
    ),

  setJobs: (value) =>
    set(
      produce((state) => {
        if (Array.isArray(value)) state.jobs = value;
        else state.jobs.push(value);
      })
    ),

  deleteJob: (id: string) =>
    set(
      produce((state) => {
        state.jobs = state.jobs.filter(
          (item: JobsAPIResponse) => item._id !== id
        );
      })
    ),

  deleteAllJobs: () =>
    set(
      produce((state) => {
        state.jobs = [];
      })
    ),
}));

export default useAppStore;
