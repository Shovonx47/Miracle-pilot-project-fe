"use client";
import { verifyToken } from "@/utils/verifyToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TUser } from "@/redux/features/Auth/authSlice";
import StudentDashboard from "@/app/(Home)/student/student-dashboard/page";
import TeacherDashboard from "@/app/(Home)/teacher/teacher-dashboard/page";
import { handleLogout } from "@/utils/logoutFunc";
import HrDashboard from "@/app/(Home)/human-resource/hr-dashboard/page";


export default function HomeDashboard() {

    const dispatch = useDispatch();

    const isSessionExpired = false;

    const userToken = useSelector((state: RootState) => state?.auth?.token);

    // Get user role if token exists
    const userRole = userToken ? (verifyToken(userToken) as TUser)?.role : "";



    // Early return based on user role
    if (userRole === "student") return <StudentDashboard />;
    if (userRole === "teacher") return <TeacherDashboard />;
    if (userRole === "super_admin" || userRole === "admin") return <HrDashboard />;
    if (userRole === "user") {
        return (
            <div className="h-full flex justify-center items-center">
                <div className="text-center mt-14 rounded-lg max-w-xl w-full space-y-8 text-gray-900 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                    {/* Header with gradient text */}
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome to Your Dashboard
                    </h2>
    
                    {/* Subtitle with smooth animation */}
                    <p className="text-lg text-gray-600 animate-fade-in">
                        Empowering you with the tools and insights to make the most of your experience.
                    </p>
    
                    {/* Highlighted message with icon */}
                    <div className="flex items-center justify-center space-x-2">
                         
                        <p className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
                            For further assistance, please contact your school administration.
                        </p>
                    </div>
    
                    {/* Logout button with hover effects */}
                    <div className="space-y-6">
                        <button
                            onClick={() => handleLogout(dispatch, isSessionExpired)}
                            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:from-red-600 hover:to-pink-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}