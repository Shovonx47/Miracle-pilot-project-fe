"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "@/redux/api/Auth/forgotPasswordApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const ChangeForgotPassword = () => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email = sessionStorage.getItem("email");

  const {
    handleSubmit,
    control,
    watch,

  } = useForm();

  // Watching newPassword field for real-time validation
  const newPassword = watch("newPassword");

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const onSubmit = async (data: any) => {
    const values = {
      email,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await updatePassword(values).unwrap();
      if (response.success) {
        toast.success(response.message);
        sessionStorage.removeItem("email");
        router.push("/auth/login");
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
    <div className="flex items-center justify-center h-full">
      <div className="w-full">
        <h2 className="text-xl font-bold text-center">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* New Password */}
          <div className="mb-4">
            <Controller
              name="newPassword"
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
                validate: (value) => value === newPassword || "Passwords do not match",
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
                  {newPassword && field.value && field.value !== newPassword && <p className="text-red-400 text-sm mt-1">Passwords do not match</p>}
                </div>
              )}
            />
          </div>

          <Button type="submit" className={`mt-5 w-full p-4 rounded-lg text-white font-semibold transition-all duration-300 ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-[#835ADCCC] hover:bg-[#6E47C0CC]"
            }`}>
            {isLoading ? "Processing..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangeForgotPassword;
