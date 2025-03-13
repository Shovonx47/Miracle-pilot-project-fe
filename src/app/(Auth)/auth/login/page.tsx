"use client";

import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/api/Auth/loginApi";
import { setUser } from "@/redux/features/Auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import loginBg from "@/assets/loginform/login_bg.jpeg";
import miracleLogo from "@/assets/loginform/Miracle_logo.png";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const Login = () => {
    const { control, handleSubmit, reset } = useForm();
    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: any) => {
        try {
            const response = await login(data).unwrap();
            // const user = verifyToken(response.data) as TUser;
            if (response.success) {
                dispatch(setUser({ token: response.data }));
                toast.success(response.message);
                router.push("/");
                reset()
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
        <div 
            className="h-screen w-full flex justify-center items-center"
            style={{
                backgroundImage: `url(${loginBg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white/5 backdrop-blur-xl p-12 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-white/10"
            >
                <h2 className="text-3xl font-semibold text-gray-900 text-center">Welcome Back</h2>
                <p className="text-sm text-gray-800 text-center">Please enter your credentials to continue</p>

                {/* Email Input */}
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    defaultValue="faruk@gmail.com"
                    render={({ field, fieldState: { error } }) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Email</label>
                            <Input
                                {...field}
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 p-3 w-full rounded-lg bg-white/20 text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none border-black"
                            />
                            {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                        </div>
                    )}
                />

                {/* Password Input with Show/Hide Toggle */}
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    defaultValue="S-250001"
                    render={({ field, fieldState: { error } }) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Password</label>
                            <div className="relative">
                                <Input
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="mt-1 p-3 w-full rounded-lg bg-white/20 text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none border-black"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 flex items-center px-2"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} strokeWidth={1.5} className="text-gray-700" />
                                    ) : (
                                        <Eye size={18} strokeWidth={1.5} className="text-gray-700" />
                                    )}
                                    <span className="ml-1 text-sm text-gray-700">
                                        {showPassword ? "Hide" : "Show"}
                                    </span>
                                </button>
                            </div>
                            {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                        </div>
                    )}
                />

                {/* Submit Button with Loader */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full p-4 rounded-lg text-white font-semibold transition-all duration-300 ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-[#835ADCCC] hover:bg-[#6E47C0CC]"
                        }`}
                >
                    {isLoading ? "Logging in..." : "Log In"}
                </button>

                {/* Additional Links - Repositioned */}
                <div className="flex justify-between items-center text-sm text-gray-900 mb-10">
                    <Link href="/auth/signup" className="text-[#787878] font-semibold hover:no-underline">Create an account</Link>
                    <Link href="/auth/forgot-password" className="text-[#787878] font-semibold hover:no-underline">Forgot your password?</Link>
                </div>
                
                {/* Miracle Logo at the bottom of the login box */}
                <div className="flex justify-center mt-12 mb-5">
                    <Image 
                        src={miracleLogo} 
                        alt="Miracle Logo" 
                        height={50} 
                        className="opacity-90 hover:opacity-100 transition-opacity"
                    />
                </div>
            </form>
        </div>
    );
};

export default Login;