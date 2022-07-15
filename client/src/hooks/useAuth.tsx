import { AuthType, payloadType } from "src/types/default";
import create from "zustand";

export const useAuth = create<AuthType>((set) => ({
  user: null,
  loadUser: (payload: payloadType) => {
    localStorage.setItem("token", payload.token);
    set(() => ({ user: payload }));
  },
  logout: () => {
    localStorage.removeItem("token");
    set(() => ({ user: null }));
  },
}));
