import React from 'react';
import { Student } from '@/types/student';
import { useStudent } from './useStudent';

interface AttendanceSectionProps {
  student?: Student | null;
}

const AttendanceCard = ({ student: propStudent }: AttendanceSectionProps) => {
  // Use student from props or context
  const contextStudent = useStudent();
  const student = propStudent || contextStudent;

  // Attendance data - would be calculated from actual attendance records
  const totalDays = 28;
  const present = 27;
  const absent = 1;
  const halfDay = 0;

  // Calendar data for last 7 days
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dateRange = '15 Jan 2025 - 21 Jan 2025';

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-gray-900">Attendance</h2>
        <div className="text-sm text-gray-500 flex items-center">
          This Week <span className="ml-1">▾</span>
        </div>
      </div>
      <div className="border-b border-gray-200 -mx-6 mb-4"></div>

      {/* Working days counter */}
      <div className="text-sm text-gray-500 mb-4">
        No of total working days <span className="text-black font-medium">{totalDays} Days</span>
      </div>

      {/* Statistics boxes */}
      <div className="grid grid-cols-3 gap-4 text-center mb-8">
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <div className="text-2xl font-semibold">{present}</div>
          <div className="text-sm text-gray-500">Present</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <div className="text-2xl font-semibold">{absent}</div>
          <div className="text-sm text-gray-500">Absent</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <div className="text-2xl font-semibold">{halfDay}</div>
          <div className="text-sm text-gray-500">Half day</div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#22C55E"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(present/totalDays) * 251.2} 251.2`}
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#EF4444"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(absent/totalDays) * 251.2} 251.2`}
            strokeDashoffset={-((present/totalDays) * 251.2)}
          />
        </svg>
      </div>

      {/* Calendar Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Last 7 Days</div>
          <div className="text-xs text-gray-500">{dateRange}</div>
        </div>
        <div className="flex gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded flex items-center justify-center text-xs text-white
                ${day === 'F' ? 'bg-red-500' : day === 'S' ? 'bg-red-500' : 'bg-green-500'}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;