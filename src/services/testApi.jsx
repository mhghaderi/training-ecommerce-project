import { useEffect } from "react";

import apiClient from "./apiClient";

const getProductsApi = () => {
    return apiClient.get("/Books");
};

function TestProducts() {
    useEffect(() => {
        getProductsApi()
            .then((res) => console.log("✅ Products:", res.data))
            .catch((err) => console.error("❌ API Error:", err));
    }, []);

    return <div>Testing Products API...</div>;
}

export default TestProducts;
