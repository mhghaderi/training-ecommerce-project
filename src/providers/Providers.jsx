import React, { use, useEffect } from "react";
import { getCookie } from "../utils/helpers/cookie";

const Authorization = () => {
    useEffect(() => {
        const readCookie = async () => {
            const res = await getCookie("credentials");
            console.log(res);
        };

        readCookie();
    }, []);
};

const Providers = ({ children }) => {
    return (
        <>
            <Authorization />
            {children}
        </>
    );
};

export default Providers;
