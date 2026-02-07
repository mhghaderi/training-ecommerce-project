import Cookies from "js-cookie";
import { encrypeJWT, decrypeJWT } from "./jwt";

export const setCookie = async (key, data) => { 
    Cookies.set(key, await encrypeJWT(data));
};

export const getCookie = async (key) => await decrypeJWT(Cookies.get(key));
export const removeCookie = async (key) => Cookies.remove(key);
