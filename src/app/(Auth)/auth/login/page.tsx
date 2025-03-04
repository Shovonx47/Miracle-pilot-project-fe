"use client";

import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/api/Auth/loginApi";
import { setUser } from "@/redux/features/Auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const Login = () => {


    const { control, handleSubmit, reset } = useForm();
    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useAppDispatch();

    const router = useRouter()

    const onSubmit = async (data: any) => {

        try {
            const response = await login(data).unwrap();
            // const user = verifyToken(response.data) as TUser;
            if (response.success) {
                dispatch(setUser({ token: response.data }));
                toast.success(response.message);
                router.push("/");
                // reset()
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
        <div className="h-screen w-full flex justify-center items-center bg-gradient-to-r from-[#dce8fd] via-[#b8d3f9] to-[#c6dafc] px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm space-y-6 border border-white/20"
            >
                <h2 className="text-3xl font-semibold text-gray-900 text-center">Welcome Back</h2>
                <p className="text-sm text-gray-800 text-center">Please enter your credentials to continue</p>

                {/* Email Input */}
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Email</label>
                            <Input
                                {...field}
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 p-3 w-full rounded-lg bg-white/20 text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                            />
                            {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                        </div>
                    )}
                />

                {/* Password Input */}
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Password</label>
                            <Input
                                {...field}
                                type="password"
                                placeholder="Enter your password"
                                className="mt-1 p-3 w-full rounded-lg bg-white/20 text-gray-900 placeholder-gray-800 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                            />
                            {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                        </div>
                    )}
                />

                {/* Submit Button with Loader */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {isLoading ? "Logging in..." : "Sign In"}
                </button>

                {/* Additional Links */}
                <div className="text-center">
                    <p className="text-sm text-gray-900">
                        Don't have an account? <a href="#" className="text-gray-700 font-semibold hover:underline">Sign up</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login