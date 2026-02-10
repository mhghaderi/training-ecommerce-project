import apiClient from "./apiClient";

export const loginApi = (data) => {
    return apiClient.post("/api/Auth/Login", data);
};
export const registerApi = (data) => {
    return apiClient.post("/api/Auth/Register", data);
};

export const refreshTokenApi = (refreshToken) => {
    return apiClient.post("/auth/refresh-token", refreshToken);
};
