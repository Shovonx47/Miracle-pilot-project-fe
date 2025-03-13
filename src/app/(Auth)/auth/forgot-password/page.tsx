import React from 'react';
import ForgotPassword from './_component/SendOtp';
import loginBg from "@/assets/loginform/login_bg.jpeg";

const page = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: `url(${loginBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
      <ForgotPassword />
    </div>
  );
};

export default page;