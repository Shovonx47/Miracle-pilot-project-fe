"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import OTPInput from "./OTPInput";
import { useVerifyOtpMutation } from "@/redux/api/Auth/forgotPasswordApi";



interface VerifyUser {
  
  setSuccessVerifyMessage: (message: boolean) => void;
}

const OTPVerifyPage: React.FC<VerifyUser> = ({ setSuccessVerifyMessage }) => {
  const { handleSubmit, control } = useForm<{ otp: string[] }>({ defaultValues: { otp: ["", "", "", "", "", ""] } });
  

  const email = sessionStorage.getItem("email")

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation()

  const onSubmit = async (data: { otp: string[] }) => {
    const otpNumber = data.otp.join("");
    if (otpNumber.length < 6) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    const values = {
      email: email,
      otp: otpNumber
    }

    try {
      const response = await verifyOtp(values).unwrap();
      if (response.success) {
        toast.success(response.message);
         
        setSuccessVerifyMessage(true)
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
    <div className="mt-3">
      <h1 className="text-2xl font-bold text-center py-3">Enter the 6-digit OTP</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <OTPInput control={control} />

        <Button type="submit" className={`mt-5 w-full p-4 rounded-lg text-white font-semibold transition-all duration-300 ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-[#835ADCCC] hover:bg-[#6E47C0CC]"
                        }`} disabled={isLoading}>
         {isLoading ? "Verifying..." : "Verify"} 
        </Button>
      </form>
    </div>
  );
};

export default OTPVerifyPage;
