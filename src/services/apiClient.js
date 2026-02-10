import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://dev.33code.ir/",
    timeout: 10000,
});

export default apiClient;
