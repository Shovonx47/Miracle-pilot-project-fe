"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/redux/api/Auth/forgotPasswordApi";
import { toast } from "sonner";
import OTPVerifyPage from "./verify";
import ChangeForgotPassword from "./change-password";


const ForgotPassword = () => {
    const [successVerifyMessage, setSuccessVerifyMessage] = useState<boolean>(false);

    const [successMessage, setSuccessMessage] = useState(false);

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

    const router = useRouter();

    const {
        control,
        handleSubmit
    } = useForm();


    const onSubmit = async (data: any) => {
        try {
            const response = await forgotPassword(data).unwrap();
            if (response.success) {
                toast.success(response.message);
                sessionStorage.setItem("email", response?.data?.email);
                setSuccessMessage(true)
            } else if (response.success === false && response.errorSources) {
                const errorMessage = response.errorSources.map((err: any) => err.message).join(", ");
                toast.error(errorMessage);
            }
        } catch (error: any) {
            let errorMessage = "Network error, please try again!";
            if (error?.data?.errorSources) {
                errorMessage = error.data.errorSources.map((err: any) => err.message).join(", ");
            } else if (error?.data?.message) {
                errorMessage = error.data.message;
            }
            toast.error(errorMessage);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl p-12 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-white/10">
            <div>
                <h2 className="text-xl font-bold text-center text-gray-900">Forgot Your Password?</h2>
                <p className="text-sm text-center text-gray-800 mt-1">
                    No problem. Just enter your email address below <br /> and we’ll send you a link to reset it.
                </p>
                {!successMessage && (
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">

                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "Email is required" }}

                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">Email</label>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your email"
                                            className="mt-1 p-3 w-full rounded bg-transparent text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none border-black"
                                        />
                                    </div>
                                    {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                                </div>
                            )}
                        />

                        <>
                            <button
                                type="submit"
                                className={`mt-5 w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-[#835ADCCC] hover:bg-[#6E47C0CC]"
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending..." : "Send OTP"}
                            </button>
                            <p className="text-center text-sm mt-3">
                                Remembered your password?
                                <Link href="/auth/login" className="text-blue-600 font-semibold ml-1">
                                    Log In
                                </Link>
                            </p>
                        </>

                    </form>
                )}
                {successMessage && !successVerifyMessage && (
                    <OTPVerifyPage
                        setSuccessVerifyMessage={setSuccessVerifyMessage}
                    />
                )}

                {
                    successMessage && successVerifyMessage &&
                    <ChangeForgotPassword />
                }


            </div>
        </div>
    );
};

export default ForgotPassword;
