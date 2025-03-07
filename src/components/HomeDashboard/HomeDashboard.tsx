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
    if (userRole === "super_admin") return <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center bg-white p-10 rounded-lg shadow-xl max-w-md w-full space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Super Admin Dashboard</h2>
            <p className="text-lg text-gray-600">This feature is not implemented yet.</p>

            <div className="space-y-4">
                {/* Coming Soon Button */}
                <div className="bg-indigo-600 text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-700 transition">
                    Coming Soon
                </div>

                {/* Logout Button */}
                <div onClick={() => handleLogout(dispatch, isSessionExpired)} className="bg-red-500 text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-red-600 transition">
                    Logout
                </div>
            </div>
        </div>
    </div>
}
