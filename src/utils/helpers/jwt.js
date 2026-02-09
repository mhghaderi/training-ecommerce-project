import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode("mmd");

export const encryptJWT = async (payload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(key);
};

export const decryptJWT = async (session) => {
    try {
        const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] });
        return payload;
    } catch (err) {
        return null;
    }
};
