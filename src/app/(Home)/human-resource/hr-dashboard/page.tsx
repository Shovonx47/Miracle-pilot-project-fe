"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { verifyToken } from '@/utils/verifyToken';
import { TUser } from '@/redux/features/Auth/authSlice';
import { useGetSingleUserQuery } from '@/redux/api/Auth/getUserApi';
import LoadingSpinner from '@/components/Loader';

import { IoSearchOutline } from "react-icons/io5";
import MorningNotification from "@/components/Staff/Admin/Admin Dashboard/MorningNotification";
import DashboardMetrics from "@/components/Staff/Admin/Admin Dashboard/DashboardMetrics";
import Schedule from "@/components/Staff/Admin/Admin Dashboard/Schedule";
import DashboardStats from "@/components/Staff/Admin/Admin Dashboard/DashboardStats";
import QuickLinksDashboard from "@/components/Staff/Admin/Admin Dashboard/QuickLinksDashboard";
import ClassRoutine from "@/components/Staff/Admin/Admin Dashboard/ClassRoutine";
import LeaveRequestsComponent from "@/components/Staff/Admin/Admin Dashboard/LeaveRequestsComponent";
import FinancialMetricsCards from "@/components/Staff/Admin/Admin Dashboard/FinancialMetricsCards";
import FeesCollectionChart from "@/components/Staff/Admin/Admin Dashboard/FeesCollectionChart";
import NavMenu from "@/components/Staff/Admin/Admin Dashboard/NavMenu";
import NoticeBoard from "@/components/Staff/Admin/Admin Dashboard/NoticeBoard";
import StudentActivity from "@/components/Staff/Admin/Admin Dashboard/StudentActivity";

export default function HrDashboard() {
  const userToken = useSelector((state: RootState) => state?.auth?.token);

  // Get user email if token exists
  let email = "";
  if (userToken) {
    const userId = (verifyToken(userToken) as TUser);
    email = userId?.email ?? "";
  }

  const { data: singleAdmin, isLoading } = useGetSingleUserQuery(email);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header Section - Stack vertically on mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <span className="font-bold text-headerText">Human Resource</span>
          <span className="text-dataText text-sm">Dashboard / HR Admin</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-[#506EE4] text-white rounded-sm hover:bg-blue-700 transition-colors flex-1 sm:flex-none">
            Add New Student
          </button>
          <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-[#E9EDF4] text-black rounded-sm hover:bg-green-700 transition-colors flex-1 sm:flex-none">
            Fees Details
          </button>
        </div>
      </div>
      
      {/* Morning Notification - Full width on all screens */}
      <div className="w-full mb-4">
        <MorningNotification name={`${singleAdmin?.data?.firstName} ${singleAdmin?.data?.lastName}`} />
      </div>
      
      {/* Dashboard Metrics - Full width on all screens */}
      <div className="w-full mb-4">
        <DashboardMetrics />
      </div>
      
      {/* Primary Dashboard Components - Stack vertically on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Schedule - Full width on mobile */}
        <div className="w-full mb-4 md:mb-0">
          <Schedule />
        </div>
        
        {/* Dashboard Stats - Full width on mobile */}
        <div className="w-full mb-4 md:mb-0">
          <DashboardStats />
        </div>
        
        {/* Quick access section - Keep stacked vertically always */}
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <QuickLinksDashboard />
          </div>
          <div className="w-full">
            <ClassRoutine />
          </div>
          <div className="w-full">
            <LeaveRequestsComponent />
          </div>
        </div>
      </div>
      
      {/* Financial Section - Stack vertically on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Financial metrics - Full width on mobile */}
        <div className="w-full mb-4 md:mb-0">
          <FinancialMetricsCards />
        </div>
        
        {/* Fees Collection Chart - Full width on mobile, span 2 columns on desktop */}
        <div className="w-full md:col-span-2">
          <FeesCollectionChart />
        </div>
      </div>
      
      {/* Nav Menu - Full width on all screens */}
      <div className="w-full mb-4">
        <NavMenu />
      </div>
      
      {/* Bottom Information Section - Stack vertically on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Notice Board - Full width on mobile */}
        <div className="w-full mb-4 md:mb-0">
          <NoticeBoard />
        </div>
        
        {/* Student Activity - Full width on mobile */}
        <div className="w-full mb-4 md:mb-0">
          <StudentActivity timeFrame="Weekly" />
        </div>
        
        {/* Todo List - Full width on mobile */}
        
      </div>
    </div>
  );
}