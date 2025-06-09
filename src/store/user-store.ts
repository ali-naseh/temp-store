import { setToken } from "@/lib/token";
import { User } from "@/types/user.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,

      // User actions
      login: (user, token) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          token,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates },
          });
        }
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
