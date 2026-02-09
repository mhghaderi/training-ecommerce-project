import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Providers from "./providers/Providers";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Providers>
            <App />
        </Providers>
    </StrictMode>,
);

import React, { use, useEffect } from "react";
import { getCookie, removeCookie, setCookie } from "./utils/helpers/cookie";
import getProductsApi from "./utils/helpers/apis/products/getProductsApi";
import useStore from "./store";

const App = () => {
    const { access_token, refresh_token } = useStore();
    useEffect(() => {
        const fetchData = async () => {
            const result = await getProductsApi();
            console.log(result);
        };

        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <h2>access_token : {access_token}</h2>
        </div>
    );
};

export default App;

import React, { use, useEffect } from "react";
import { getCookie } from "../utils/helpers/cookie";
import { useStore } from "../store/index";

const Authorization = () => {
    const { setState } = useStore();
    useEffect(() => {
        const readCookie = async () => {
            const res = await getCookie("credentials");
            setState(res);
            console.log(res);
        };

        readCookie();
    }, []);
};

const Providers = ({ children }) => {
    return (
        <>
            <Authorization />
            {children}
        </>
    );
};

export default Providers;

import axios from "axios";
import { getCookie, setCookie } from "../utils/helpers/cookie";
import { refreshTokenApi } from "../utils/helpers/apis/auth/refreshTokenApi";

const getAccessToken = async () => {
    const cookie = await getCookie("credentials");
    return cookie?.access_token;
};
const getRefreshToken = async () => {
    const cookie = await getCookie("credentials");
    return cookie?.refresh_token;
};

export const apiClient = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1/",
    headers: {
        Authorization: `Bearer ${getAccessToken()}`,
    },
});
apiClient.interceptors.request.use(
    (res) => res,
    async (err) => {
        console.log("e1");
        const originalRequest = err.config;
        if (err.response.status === 404 && !originalRequest?._retry) {

            originalRequest._retry = true;
            
            console.log("e2");
            try {
                const refreshToken = await getRefreshToken();
                const response = await refreshTokenApi({ refreshToken: refreshToken });

                const newAccessToken = response?.data?.access_token;
                const newRefreshToken = response?.data?.refresh_token;

                const lastCookie = await getCookie("credential");
                const newCookie = {
                    ...lastCookie,
                    access_token: newAccessToken,
                    refresh_token: newRefreshToken,
                };

                console.log("new credential :\n", newCookie);
                await setCookie("credential", newCookie);

                apiClient.defaults.headers["Authorization"] = `Bearer${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer${newAccessToken}`;

                return apiClient(originalRequest);
            } catch (err) {
                console.log("faild to submit new refresh token!!!");

                return Promise.reject(err);
            }
        }
        return Promise.reject(err);
    },
);

export default apiClient;

import { create } from "zustand";

export const useStore = create((set) => ({
    access_token: null,
    refresh_token: null,
    setState: (data) => set({ access_token: data?.access_token, refresh_token: data?.refresh_token }),
    removeState: () => set({ access_token: null, refresh_token: null }),
}));

export default useStore;




import apiClient from "../../../../constants/axios.intercaptro";

const getProductsApi = async () => {
    try {
        return await apiClient.get("/products");
    } catch (error) {
        return error;
    }
};

export default getProductsApi;

import apiClient from "../../../../constants/axios.intercaptro";

export const refreshTokenApi = async (data) => {
    try {
        return await apiClient.post("/auth/refresh-token", data);
    } catch (err) {
        return err;
    }
};

import Cookies from "js-cookie";
import { encrypeJWT, decrypeJWT } from "./jwt";

export const setCookie = async (key, data) => { 
    Cookies.set(key, await encrypeJWT(data));
};

export const getCookie = async (key) => await decrypeJWT(Cookies.get(key));
export const removeCookie = async (key) => Cookies.remove(key);

import { SignJWT, jwtVerify } from "jose"; //

const key = new TextEncoder().encode("mmd"); //کی رو تعریف میکنیم

export const encrypeJWT = async (payload) => {
    //توابع مربوط به رمزنگاری و رمزگشایی رو اینجا مینویسیم
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" }) //الگوریتمی که برای رمزنگاری استفاده میکنیم رو مشخص میکنیم
        .setIssuedAt() //تاریخ صدور رو مشخص میکنیم
        .setExpirationTime("2h") //تاریخ انقضای توکن رو مشخص میکنیم
        .sign(key); //توکن رو با کلید مشخص شده امضا میکنیم و برمیگردونیم
};

export const decrypeJWT = async (session) => {
    //سشن رو میگیریم و اون رو رمزگشایی میکنیم
    try {
        const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] });
        //توکن رو با کلید مشخص شده و الگوریتم مشخص شده رمزگشایی میکنیم و اگر موفق بودیم، payload رو برمیگردونیم
        return payload; //اگر رمزگشایی موفق نبود، خطا میگیریم و null برمیگردونیم
    } catch (err) {
        return null;
    }
};

چیزی که جا نموند؟