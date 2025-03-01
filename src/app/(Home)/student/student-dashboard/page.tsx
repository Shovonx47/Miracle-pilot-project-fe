import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import ProfileCard from "@/components/Students/StudentsDashboard/ProfileCard";
import TodaysClasses from "@/components/Students/StudentsDashboard/TodaysClasses";
import StatusIndicators from "@/components/Students/StudentsDashboard/StatusIndicators";
import AttendanceSection from "@/components/Students/StudentsDashboard/AttendanceSection";
import LeaveStatusSection from "@/components/Students/StudentsDashboard/LeaveStatusSection";
import ExamResultsSection from "@/components/Students/StudentsDashboard/ExamResultsSection";
import ClassFacultiesSection from "@/components/Students/StudentsDashboard/ClassFacultiesSection";
import NoticeBoardSection from "@/components/Students/StudentsDashboard/NoticeBoardSection";
import PerformanceSection from "@/components/Students/StudentsDashboard/PerformanceSection";
import ScheduleSection from "@/components/Students/StudentsDashboard/ScheduleSection";
import HomeWorksSection from "@/components/Students/StudentsDashboard/HomeWorksSection";
import FeesReminderSection from "@/components/Students/StudentsDashboard/FeesReminderSection";
import SyllabusSection from "@/components/Students/StudentsDashboard/SyllabusSection";
import TodoList from "@/components/Students/StudentsDashboard/TodoList";


export default function StudentDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="mb-6">
  <div className="relative w-2/5">
    <input
      type="text"
      placeholder="Search"
      className="w-full max-w-full px-4 py-2 pr-10 bg-white border rounded-lg focus:outline-none focus:border-gray-400"
    />
    <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
</div>

{/* Dashboard Header */}
<div className="flex flex-col gap-1 mb-6">
  <span className="font-bold text-headerText">Student Dashboard</span>
  <span className="text-dataText">Dashboard</span>
</div>

{/* Main Grid Layout */}
<div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-4">
          <ProfileCard />
          <div className="mt-6">
            <TodaysClasses />
          </div>
          <div className="mt-6">
            <StatusIndicators />
          </div>
          <div className="mt-6 -mr-[100%]">
            <div className="col-span-8">
              <PerformanceSection />
            </div>
          </div>
          <div className="mt-6">
            <LeaveStatusSection />
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-span-4">
          <AttendanceSection />
          <div className="mt-[34rem]">
            <ExamResultsSection />
          </div>
          <div className="absolute bottom-32 mt-6">
            <TodoList />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4">
          <ScheduleSection />
          <div className="mt-5">
            <HomeWorksSection />
          </div>
          <div className="mt-[2rem]">
            <FeesReminderSection />
          </div>
        </div>

        {/* Class Faculties - Full Width */}
        <div className="col-span-12">
          <ClassFacultiesSection />
        </div>

        {/* Notice Board - Left Column */}
        <div className="col-span-4">
          <NoticeBoardSection />
        </div>
      </div>

      {/* Syllabus Section - Absolute Bottom Right with Responsive Width */}
      <div className="absolute bottom-10 right-6 w-76 sm:w-92 md:w-[20rem] lg:w-[24rem]">
        <SyllabusSection />
      </div>
    </div>
  );
}
