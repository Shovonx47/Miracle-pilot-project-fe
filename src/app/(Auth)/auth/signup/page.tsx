"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import loginBg from "@/assets/loginform/login_bg.jpeg";
import miracleLogo from "@/assets/loginform/Miracle_logo.png";
import { useSignupMutation } from "@/redux/api/Auth/signUpApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DynamicSelect from "@/components/Reusable/DynamicSelect";


const role = ["Student", "Teacher", "Staff", "Accountant"]


const SignUp = () => {
    const { control, handleSubmit, watch, reset, setValue, trigger } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // Watching newPassword field for real-time validation
    const password = watch("password");

    const [signup, { isLoading }] = useSignupMutation()
    const router = useRouter()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };



    const onSubmit = async (data: any) => {
        data.role = data.role.toLowerCase();
        try {
            const response = await signup(data).unwrap();
            console.log("Signup response data:", JSON.stringify(response, null, 2));
            
            if (response.success) {
                toast.success(response.message);
                
                // Store the token in localStorage or Redux for subsequent API calls
                if (response?.data?.token) {
                    console.log("Storing token:", response.data.token.substring(0, 10) + "...");
                    localStorage.setItem('auth_token', response.data.token);
                } else {
                    console.warn("No token received in response");
                }
                
                // Role-based redirection
                const roleRoutes: Record<string, string> = {
                    student: "/add-student",
                    teacher: "/add-teacher",
                    staff: "/add-staff",
                    accountant: "/add-accountant",
                };

                // Save user data for the next step (for both student and teacher roles)
                if (response?.data?.role === 'student' || response?.data?.role === 'teacher') {
                    // Pass user data to the add form page
                    const userData = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        role: data.role,
                        userId: response?.data?.userId || ''
                    };
                    console.log("Storing user data:", userData);
                    localStorage.setItem('user_data', JSON.stringify(userData));
                }

                router.push(roleRoutes[response?.data?.role] || "/auth/login");
                reset();
            } else if (response.success === false && response.errorSources) {
                const errorMessage = response.errorSources.map((err: any) => err.message).join(", ");
                toast.error(errorMessage);
            }
        } catch (error: any) {
            console.error("Signup error:", error);
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
                className="bg-white/5 backdrop-blur-xl p-12 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6 border border-white/10"
            >
                {/* Header with Logo */}
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-900 whitespace-nowrap">Create Account</h2>
                    </div>
                    <Image
                        src={miracleLogo}
                        alt="Miracle Logo"
                        height={45}
                        className="opacity-90 hover:opacity-100 transition-opacity"
                    />
                </div>

                {/* First Name and Last Name - Side by Side */}
                <div className="flex space-x-4">
                    {/* First Name Input */}
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: "First name is required" }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-900">First Name</label>
                                <Input
                                    {...field}
                                    placeholder="First Name"
                                    className="mt-1 p-3 w-full rounded-lg bg-transparent text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none border-black"
                                />
                                {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* Last Name Input */}
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: "Last name is required" }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-900">Last Name</label>
                                <Input
                                    {...field}
                                    placeholder="Last Name"
                                    className="mt-1 p-3 w-full rounded-lg bg-transparent text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none border-black"
                                />
                                {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                            </div>
                        )}
                    />
                </div>

                {/* Email Input */}
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Email</label>
                            <Input
                                {...field}
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 p-3 w-full rounded-lg bg-transparent text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none border-black"
                            />
                            {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                        </div>
                    )}
                />
                {/* role Select */}
                <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Role is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <div>
                            <DynamicSelect
                                label="role"
                                placeholder="Select role"
                                options={role}
                                value={field.value}
                                onChange={(val) => {
                                    setValue("role", val);
                                    trigger("role");
                                }}
                                className="bg-transparent text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none border-black"
                            />
                            {error && <p className="text-red-500 text-sm">{error.message}</p>}
                        </div>
                    )}
                />
                {/* Password Input with Show/Hide Toggle */}
                {/* New Password */}
                <div className="mb-4">
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-900">Password</label>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="mt-1 p-3 w-full rounded-lg bg-transparent text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none border-black"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 flex items-center px-2"
                                    >
                                        {showPassword ? <EyeOff size={18} strokeWidth={1.5} className="text-gray-700" /> : <Eye size={18} strokeWidth={1.5} className="text-gray-700" />}
                                        <span className="ml-1 text-sm text-gray-700">{showPassword ? "Hide" : "Show"}</span>
                                    </button>
                                </div>
                                {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                            </div>
                        )}
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                    <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                            required: "Confirm Password is required",
                            validate: (value) => value === password || "Passwords do not match",
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-900">Confirm Password</label>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Enter password again"
                                        className="mt-1 p-3 w-full rounded-lg bg-transparent text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none border-black"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 flex items-center px-2"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} strokeWidth={1.5} className="text-gray-700" /> : <Eye size={18} strokeWidth={1.5} className="text-gray-700" />}
                                        <span className="ml-1 text-sm text-gray-700">{showConfirmPassword ? "Hide" : "Show"}</span>
                                    </button>
                                </div>
                                {/* Error Message */}
                                {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                                {/* Live Validation Message */}
                                {password && field.value && field.value !== password && <p className="text-red-400 text-sm mt-1">Passwords do not match</p>}
                            </div>
                        )}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-4 rounded-lg text-white font-semibold transition-all duration-300 bg-[#835ADCCC] hover:bg-[#6E47C0CC]"
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Sign Up"}
                </button>


                {/* Login Link */}
                <div className="text-center text-sm text-gray-900">
                    <span></span>
                    <a href="/auth/login" className="text-[#787878] font-semibold hover:no-underline">Already have an account? </a>
                </div>
            </form>
        </div>
    );
};

export default SignUp;