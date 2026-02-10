// RegisterForm.jsx
import React, { useState } from "react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // تغییر مقادیر فیلدها
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // پاک کردن خطا هنگام تایپ
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    // اعتبارسنجی فرم
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "نام الزامی است";
        } else if (formData.firstName.length < 2) {
            newErrors.firstName = "نام باید حداقل ۲ حرف باشد";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "نام خانوادگی الزامی است";
        } else if (formData.lastName.length < 2) {
            newErrors.lastName = "نام خانوادگی باید حداقل ۲ حرف باشد";
        }

        if (!formData.email.trim()) {
            newErrors.email = "ایمیل الزامی است";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "ایمیل معتبر نیست";
        }

        if (!formData.password) {
            newErrors.password = "رمز عبور الزامی است";
        } else if (formData.password.length < 6) {
            newErrors.password = "رمز عبور باید حداقل ۶ حرف باشد";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "تکرار رمز عبور الزامی است";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "رمز عبور و تکرار آن مطابقت ندارند";
        }

        // اعتبارسنجی اختیاری شماره موبایل
        if (formData.phoneNumber && !/^09[0-9]{9}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "شماره موبایل معتبر نیست";
        }

        return newErrors;
    };

    // ارسال فرم
    const handleSubmit = async (e) => {
        e.preventDefault();

        // اعتبارسنجی
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // شبیه‌سازی ارسال به API
            console.log("در حال ارسال داده:", formData);

            await new Promise((resolve) => setTimeout(resolve, 1500)); // تاخیر شبیه‌سازی

            alert("✅ ثبت‌نام با موفقیت انجام شد!");

            // ریست فرم
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
            });
            setErrors({});
        } catch (error) {
            alert("❌ خطا در ثبت‌نام! لطفاً دوباره تلاش کنید.");
            console.error("خطا:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-black">
                {/* هدر فرم */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                    <h1 className="text-2xl font-bold text-center">عضویت در سایت</h1>
                    <p className="text-blue-100 text-center mt-2">حساب کاربری جدید ایجاد کنید</p>
                </div>

                {/* بدنه فرم */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* نام و نام خانوادگی */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    نام <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.firstName ? "border-red-500" : "border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                                    placeholder="علی"
                                    dir="rtl"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    نام خانوادگی <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.lastName ? "border-red-500" : "border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                                    placeholder="محمدی"
                                    dir="rtl"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* ایمیل */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ایمیل <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                                placeholder="example@email.com"
                                dir="ltr"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* شماره موبایل */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                شماره موبایل{" "}
                                <span className="text-gray-400 text-sm">(اختیاری)</span>
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                                placeholder="09123456789"
                                dir="ltr"
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                            )}
                        </div>

                        {/* رمز عبور */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                رمز عبور <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                                placeholder="حداقل ۶ کاراکتر"
                                dir="ltr"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                            <div className="text-xs text-gray-500 mt-2">
                                رمز عبور باید شامل حداقل ۶ کاراکتر باشد
                            </div>
                        </div>

                        {/* تکرار رمز عبور */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                تکرار رمز عبور <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                                placeholder="رمز عبور را تکرار کنید"
                                dir="ltr"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* دکمه ثبت‌نام */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                                isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    در حال ثبت‌نام...
                                </span>
                            ) : (
                                "ثبت‌نام"
                            )}
                        </button>

                        {/* لینک ورود */}
                        <div className="text-center pt-4 border-t border-gray-200">
                            <p className="text-gray-600">
                                قبلاً حساب کاربری دارید؟
                                <a
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-800 font-medium mr-2"
                                >
                                    وارد شوید
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
