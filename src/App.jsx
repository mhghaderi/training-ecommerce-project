import React, { useEffect } from "react";
import { getCookie, removeCookie, setCookie } from "./utils/helpers/cookie";

const App = () => {
    useEffect(() => {
        const createCookie = async () => {
            setCookie("credentials", {
                name: "Mohammad",
                access_token: "77772002",
                refresh_token: "20027777",
            });
        };

        createCookie();
    }, []);
    const clickHandler = async () => {
        getCookie("credentials").then((res) => console.log(res));
    };
    return (
        <div className="flex justify-center items-center min-h-screen">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={clickHandler}
            >
                Click me
            </button>

            <button
                className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => removeCookie("credeentials")}
            >
                remove
            </button>
        </div>
    );
};

export default App;
