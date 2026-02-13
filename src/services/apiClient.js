import axios from "axios";
import { useAuthStore } from "@store/auth.store";

// نمونه اولیه axios
const apiClient = axios.create({
    baseURL: "https://dev.33code.ir/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// const apiClient = axios.create({
//     baseURL: "https://dev.33code.ir/",
//     timeout: 10000,
// });

export default apiClient;
