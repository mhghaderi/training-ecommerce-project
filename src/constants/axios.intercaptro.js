import axios from "axios";
import { getCookie, setCookie } from "../utils/helpers/cookie";

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
  apiClient.interceptors.request.use()