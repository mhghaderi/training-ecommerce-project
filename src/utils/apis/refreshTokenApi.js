import apiClient from "../../../../constants/axios";

export const refreshTokenApi = async (data) => {
    try {
        return await apiClient.post("/auth/refresh-token", data);
    } catch (err) {
        return err;
    }
};
