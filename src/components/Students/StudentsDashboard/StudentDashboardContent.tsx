"use client";

import React, { useState, createContext, useContext } from 'react';
import ProfileCard from "@/components/Students/StudentsDashboard/ProfileCard";
import TodaysClasses from "@/components/Students/StudentsDashboard/TodaysClasses";
import StatusIndicators from "@/components/Students/StudentsDashboard/StatusIndicators";
import AttendanceSection from "@/components/Students/StudentsDashboard/AttendanceSection";
import LeaveStatusSection from "@/components/Students/StudentsDashboard/LeaveStatusSection";
import ExamResultsSection from "@/components/Students/StudentsDashboard/ExamResultsSection";
import ClassFacultiesSection from "@/components/Students/StudentsDashboard/ClassFacultiesSection";
import NoticeBoardSection from "@/components/Students/StudentsDashboard/NoticeBoardSection";
import ScheduleSection from "@/components/Students/StudentsDashboard/ScheduleSection";
import HomeWorksSection from "@/components/Students/StudentsDashboard/HomeWorksSection";
import FeesReminderSection from "@/components/Students/StudentsDashboard/FeesReminderSection";
import SyllabusSection from "@/components/Students/StudentsDashboard/SyllabusSection";
import TodoList from "@/components/Students/StudentsDashboard/TodoList";
import { Student } from "@/types/student";
import LoadingSpinner from '@/components/Loader';

// Create a context to share student data across components
export const StudentContext = createContext<Student | null>(null);

// Hook to use the student context
export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

interface StudentDashboardContentProps {
  initialStudent: Student | null;
}

const StudentDashboardContent: React.FC<StudentDashboardContentProps> = ({ initialStudent }) => {
  // Simply use the server-provided data, no client-side fetching
  const student = initialStudent;

  // If we don't have student data, show an error
  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">No student data available</h2>
          <p className="mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <StudentContext.Provider value={student}>
      <div className="p-6 bg-white min-h-screen">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-800">Student Dashboard</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Academic Year: 2025/2026</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Profile and Daily Info */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            <ProfileCard student={student} />
            <TodaysClasses />
            <StatusIndicators student={student} />
            <LeaveStatusSection />
            <FeesReminderSection student={student} />
          </div>
          
          {/* Middle Column - Academic Performance */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            <AttendanceSection student={student} />
            <ExamResultsSection />
            <TodoList />
          </div>
          
          {/* Right Column - Schedule and Activities */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            <ScheduleSection />
            <HomeWorksSection />
            <SyllabusSection />
          </div>
          
          {/* Full Width Sections */}
          <div className="col-span-12 mt-6">
            <ClassFacultiesSection />
          </div>
                  
          <div className="col-span-12 md:col-span-6 lg:col-span-6 mt-6">
            <NoticeBoardSection />
          </div>
        </div>
      </div>
    </StudentContext.Provider>
  );
};

export default StudentDashboardContent;