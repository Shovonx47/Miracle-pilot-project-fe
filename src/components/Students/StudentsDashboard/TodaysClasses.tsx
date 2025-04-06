"use client";

import React, { useEffect, useState } from 'react';
import { useStudent } from './StudentDashboardContent';
import { format } from 'date-fns';
import { baseApi } from '@/redux/api/baseApi';

interface ClassRoutine {
  _id: string;
  class: string;
  section: string;
  teacherName: string;
  subjectCode: string;
  subjectName: string;
  days: string[];
  startTime: string;
  endTime: string;
  roomNumber: string;
  buildingName: string;
}

interface ClassItem {
  subject: string;
  time: string;
  status: string;
  teacherName: string;
}

const classRoutineApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClassRoutine: build.query<{ data: { data: ClassRoutine[] } }, void>({
      query: () => ({
        url: '/class-routine'
      }),
    }),
  }),
});

export const { useGetClassRoutineQuery } = classRoutineApi;

const TodaysClasses = () => {
  const student = useStudent();
  const { data: routineData, isLoading } = useGetClassRoutineQuery();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [currentDate, setCurrentDate] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Handle client-side only code
  useEffect(() => {
    setIsClient(true);
    // Set date string only on client-side
    setCurrentDate(format(new Date(), 'd MMM yyyy'));
  }, []);

  // Process class data
  useEffect(() => {
    if (!isClient || !routineData?.data?.data || !student) return;

    // Get current day of week
    const today = new Date();
    const dayOfWeek = format(today, 'EEEE');
    
    const todaysClasses = routineData.data.data
      .filter(routine => {
        // Handle different class formats ("Class VIII" vs "VIII")
        const routineClass = routine.class.replace(/^Class\s+/i, '');
        const studentClass = student.class;
        return routineClass === studentClass && routine.days.includes(dayOfWeek);
      })
      .map(routine => ({
        subject: routine.subjectName,
        time: `${routine.startTime} - ${routine.endTime}`,
        status: getClassStatus(routine.startTime, routine.endTime),
        teacherName: routine.teacherName
      }));

    setClasses(todaysClasses);
  }, [routineData, student, isClient]);

  // Calculate class status based on time
  const getClassStatus = (startTime: string, endTime: string) => {
    if (!isClient) return "Upcoming"; // Default for SSR
    
    const now = new Date();
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;

    if (currentTimeInMinutes < startTimeInMinutes) return "Upcoming";
    if (currentTimeInMinutes > endTimeInMinutes) return "Completed";
    return "In Progress";
  };

  // Style based on status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600";
      case "In Progress":
        return "bg-yellow-100 text-yellow-600";
      case "Upcoming":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Loading state
  if (isLoading) {
    return <div className="bg-white rounded-lg p-6 shadow-sm">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Today's Class</h2>
          {isClient && <span className="text-sm text-gray-300">{currentDate}</span>}
        </div>
        <div className="border-b border-gray-200 -mx-6"></div>
      </div>
      
      <div className="space-y-4">
        {!isClient ? (
          <div className="text-center py-4 text-gray-500">Loading classes...</div>
        ) : classes.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No classes scheduled for today
          </div>
        ) : (
          classes.map((classItem, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-lg p-2 hover:bg-gray-50 border border-gray-200 p-3 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  {classItem.subject.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{classItem.subject}</h3>
                  <p className="text-sm text-gray-500">{classItem.time}</p>
                  <p className="text-xs text-gray-400">{classItem.teacherName}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-sm text-xs font-medium ${getStatusStyle(classItem.status)}`}>
                {classItem.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodaysClasses;