import create from "zustand";
import produce from "immer";

interface AppState {
  user: {
    id: string;
    name: string;

    isVerified: boolean;
    token: string;
  };

  authMethod: string;

  setId: (value: string) => void;
  setName: (value: string) => void;

  setIsVerified: (value: boolean) => void;
  setToken: (value: string) => void;

  setAuthMethod: (value: string) => void;
}

const useAppStore = create<AppState>()((set) => ({
  user: { token: "", name: "", id: "", isVerified: false },
  authMethod: "",

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
}));

export default useAppStore;
