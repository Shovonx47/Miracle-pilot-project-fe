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
import TodoList from "@/components/Staff/Admin/Admin Dashboard/TodoList";

export default function Page() {
  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full md:w-2/5">
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-full px-4 py-2 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="border border-gray-200 px-3 py-1 rounded-md flex items-center space-x-2 shadow-sm">
            <span className="text-sm text-gray-600">Academic Year :</span>
            <span className="text-sm font-medium">2025 / 2026</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center border border-gray-200 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div className="w-6 h-6 flex items-center justify-center border border-gray-200 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">Human Resource</span>
          <span className="text-dataText">Dashboard / HR Admin</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-3 py-1.5 text-sm bg-[#506EE4] text-white rounded-sm hover:bg-blue-700 transition-colors">
            Add New Student
          </button>
          <button className="px-3 py-1.5 text-sm bg-[#E9EDF4] text-black rounded-sm hover:bg-green-700 transition-colors">
            Fees Details
          </button>
        </div>
      </div>
      <MorningNotification name="Najmus Sakib" />
      <DashboardMetrics />
      {/* Update the grid layout structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="w-full">
          <Schedule />
        </div>
        <div className="w-full">
          <DashboardStats />
        </div>
        <div className="flex flex-col gap-6">
          <QuickLinksDashboard />
          <ClassRoutine />
          <LeaveRequestsComponent />
        </div>
      </div>
      
      {/* New row for Financial metrics and Fees Collection Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6">
        <div className="md:col-span-1">
          <FinancialMetricsCards />
        </div>
        <div className="md:col-span-2">
          <FeesCollectionChart />
        </div>
      </div>
      <div className="w-full">
        <NavMenu />
      </div>
      
      {/* New row for Notice Board, Student Activity, and Todo List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6">
        <div className="h-full">
          <NoticeBoard />
        </div>
        <div className="h-full">
          <StudentActivity timeFrame="Weekly" />
        </div>
        <div className="h-full">
          <TodoList />
        </div>
      </div>
    </div>
  );
}