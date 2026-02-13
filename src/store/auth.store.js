import { create } from "zustand";
import Cookies from "js-cookie";
const useAuthStore = create((set, get) => ({
    // ==== دریافت اطلاعات که بفهمم چی به چیه
    accessToken: Cookies.get("accessToken"),
    refreshToken: Cookies.get("refreshToken"),
    expiresAt: Cookies.get("expiresAt"),

    //===== تشخیص لاگین بودن یا نبودن
    isAuthenticated: !!Cookies.get("accessToken"),

    // با این کوکی رو ست میکنیم و تو استور هم ذخیره میکنیم
    setAuth: ({ accessToken, refreshToken, expiresAt }) => {
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);
        Cookies.set("expiresAt", expiresAt);

        set({
            accessToken,
            refreshToken,
            expiresAt,
            isAuthenticated: true,
        });
    },

    // با این هم استور و هم کوکی رو پاک میکنیم
    // در واقع انگار کسی لاگین نیست
    logout: () => {
        (Cookies.remove("accessToken"),
            Cookies.remove("refreshToken"),
            Cookies.remove("expiresAt"),
            set({
                accessToken: null,
                refreshToken: null,
                expiresAt: null,
                isAuthenticated: false,
            }));
    },
    // remove
}));
