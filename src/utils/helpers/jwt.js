import { SignJWT, jwtVerify } from "jose"; //

const key = new TextEncoder().encode("mmd"); //کی رو تعریف میکنیم

export const encrypeJWT = async (payload) => {
    //توابع مربوط به رمزنگاری و رمزگشایی رو اینجا مینویسیم
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" }) //الگوریتمی که برای رمزنگاری استفاده میکنیم رو مشخص میکنیم
        .setIssuedAt() //تاریخ صدور رو مشخص میکنیم
        .setExpirationTime("2h") //تاریخ انقضای توکن رو مشخص میکنیم
        .sign(key); //توکن رو با کلید مشخص شده امضا میکنیم و برمیگردونیم
};

export const decrypeJWT = async (session) => {
    //سشن رو میگیریم و اون رو رمزگشایی میکنیم
    try {
        const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] });
        //توکن رو با کلید مشخص شده و الگوریتم مشخص شده رمزگشایی میکنیم و اگر موفق بودیم، payload رو برمیگردونیم
        return payload; //اگر رمزگشایی موفق نبود، خطا میگیریم و null برمیگردونیم
    } catch (err) {
        return null;
    }
};
