
import { create } from 'zustand';
import type { User } from "@/types/User";

type AuthStore = {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  login: (user: User, access: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const STORAGE_KEY = "auth_tokens";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,

  setUser: (user) => set({ user }),

  login: (user, access) => {
    set({ user, accessToken: access, isLoading: false }),
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ access }));
  },
  
  logout: () => {
    set({ user: null, accessToken: null, isLoading: false });
    localStorage.removeItem(STORAGE_KEY);
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));