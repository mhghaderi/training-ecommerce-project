import React, { useEffect } from "react";
import TestProducts from "./services/testApi";


import Login from "./pages/auth/Login";

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
            <Login />
        </div>
    );
};

export default App;
