import { create } from "zustand";

export const useStore = create((set) => ({
    access_token: null,
    refresh_token: null,
    setTokens: (data) =>
        set({
            access_token: data?.access_token,
            refresh_token: data?.refresh_token,
        }),
    removeTokens: () =>
        set({
            access_token: null,
            refresh_token: null,
        }),
}));
