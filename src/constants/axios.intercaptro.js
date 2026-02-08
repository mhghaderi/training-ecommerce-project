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
