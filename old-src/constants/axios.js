import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1/",
});

export default apiClient;
