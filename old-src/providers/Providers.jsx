import React, { useEffect } from "react";
import { getCookie } from "../utils/helpers/cookie";
import { useStore } from "../store/index";

const Authorize = () => {
    const { access_token, refresh_token, setTokens } = useStore();

    useEffect(() => {
        setTokens({
            access_token: "aaaa",
            refresh_token: "bbbb",
        });
        const readCookie = async () => {
            const res = await getCookie("credential");
            // console.log(res);
        };

        readCookie();
    }, []);

    useEffect(() => {
        console.log(access_token, refresh_token);
    }, [access_token, refresh_token]);

    return null;
};

const Providers = ({ children }) => {
    return (
        <>
            <Authorize />
            {children}
        </>
    );
};

export default Providers;
