import { loginApi, registerApi } from "../services/auth.api";

export function Login() {
    const handleLogin = async () => {
        try {
            const res = await loginApi({
                email: "mmd@gmail.com",
                password: "123456mM@",
            });
            console.log("✅ Login Response:", res.data);
        } catch (err) {
            console.error("❌ Login Error:", err);
        }
    };
    const handleRegister = async () => {
        try {
            const res = await registerApi({
                email: "mmd@gmail.com",
                userName: "mmd",
                phoneNumber: "0913",
                password: "123456mM@",
                confirmPassword: "123456mM@",
                fullName: "mohammad",
                nationalCode: "127",
            });
            console.log("✅ Login Response:", res.data);
        } catch (err) {
            console.error("❌ Login Error:", err.response.data);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <button onClick={handleLogin}>Test Login</button>
        </div>
    );
}

//  "email": "mmd@gmail.com",
//   "userName": "mmd",
//   "phoneNumber": "0913",
//   "password": "12345",
//   "confirmPassword": "12345",
//   "fullName": "mohammad",
//   "nationalCode": "127"
