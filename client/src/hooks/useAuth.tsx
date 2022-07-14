import { AuthType, payloadType } from "src/types/default";
import create from "zustand";

export const useAuth = create<AuthType>((set) => ({
  user: null,
  loadUser: (payload: payloadType) => {
    localStorage.setItem("token", payload.token);
    set((state) => {
      state.user = payload;
      return state;
    });
  },
  logout: () => {
    set((state) => {
      state.user = null;
      return state;
    });
  },
}));
