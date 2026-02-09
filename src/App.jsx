import React, { useEffect } from "react";
import { getCookie, removeCookie, setCookie } from "./utils/helpers/cookie";
const App = () => {


    // create Cookie ============
    // useEffect(() => {
    //     const createCookie = async () => {
    //         setCookie("credential", {
    //             name: "mohammad",
    //             access_token: "accessgfdsgsdfg",
    //             refresh_token: "refreshgfdsgsdfg",
    //         });
    //     };

    //     createCookie();
    // }, []);




    return (
        <div className="flex justify-center items-center min-h-screen">
            <h2>access_token : </h2>
        </div>
    );
};

export default App;
