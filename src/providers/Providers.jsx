import React, { use, useEffect } from "react";
import { getCookie } from "../utils/helpers/cookie";
import { useStore } from "../store/index";

const Authorization = () => {
    const { setState } = useStore();
    useEffect(() => {
        const readCookie = async () => {
            const res = await getCookie("credentials");
            setState(res);
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
