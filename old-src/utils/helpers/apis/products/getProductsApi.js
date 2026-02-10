import apiClient from "../../../../constants/axios";

const getProductsApi = async () => {
    try {
        return await apiClient.get("/products");
    } catch (error) {
        return error;
    }
};

export default getProductsApi;
