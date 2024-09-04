import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useRefreshTokenStore = create(
    persist(
      (set, get) => ({
        refreshToken: null,
        setRefreshToken: (refreshToken) => set((state) => ({ refreshToken })),
      }),
      {
        name: "refreshToken",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
  
  export const useTokenStore = create(
    persist(
      (set, get) => ({
        token: null,
        setToken: (token) => set((state) => ({ token })),
      }),
      {
        name: "token",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );


  export const useProfileStore = create((set) => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
    error: null,
    setError: (error) => set({ error }),
  }));