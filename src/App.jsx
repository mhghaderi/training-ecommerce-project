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

    // useEffect(() => {
    //     const createCookie = async () => {
    //         setCookie("credentials", {
    //             name: "Mohammad",
    //             access_token: "77772002",
    //             refresh_token: "20027777",
    //         });
    //     };

    //     createCookie();
    // }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <h2>access_token : {access_token}</h2>
        </div>
    );
};

export default App;
