"use client";
import React, { useState, useEffect } from 'react';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useGetCurrentStudentQuery } from '@/redux/api/Student/currentStudentApi';
import { baseApi } from '@/redux/api/baseApi';

// Define the exam schedule API endpoint
const examScheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExamSchedules: builder.query({
      query: (params = {}) => ({
        url: "/exam-schedule",
        method: "GET",
        params: params
      }),
      providesTags: ["exam_schedule"],
    }),
  }),
});

// Export the hook for use in this component
export const { useGetExamSchedulesQuery } = examScheduleApi;

// Define interfaces for the API response
interface Exam {
  _id: string;
  courseName: string;
  courseCode: string;
  maxMark: string;
  startTime: string;
  endTime: string;
  durationMinutes: string;
}

interface ExamSchedule {
  _id: string;
  class: string;
  examName: string;
  examYear: string;
  examDate: string;
  description: string;
  exams: Exam[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ExamScheduleApiResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number | null;
      limit: number | null;
      total: number;
      totalPage: number | null;
    };
    data: ExamSchedule[];
  };
}

const ScheduleSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Fetch current student data
  const { data: studentData, isLoading: studentLoading } = useGetCurrentStudentQuery();
  
  // Fetch exam schedules
  const { data: examSchedulesData, isLoading: examLoading } = useGetExamSchedulesQuery({});
  
  // State for filtered exam schedules
  const [filteredExams, setFilteredExams] = useState<ExamSchedule[]>([]);

  // Filter exam schedules based on student's class
  useEffect(() => {
    if (studentData && examSchedulesData && examSchedulesData.data) {
      const studentClass = studentData.data.data[0]?.class;
      
      // Filter exams that match the student's class
      const matchingExams = examSchedulesData.data.data.filter((exam: ExamSchedule) => {
        // Match "Class VIII" with "VIII"
        return exam.class.includes(studentClass) || 
               studentClass.includes(exam.class);
      });
      
      setFilteredExams(matchingExams);
    }
  }, [studentData, examSchedulesData]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Calculate days remaining
  const calculateDaysRemaining = (examDate: string) => {
    const today = new Date();
    const examDay = new Date(examDate);
    const diffTime = examDay.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Format time (convert 24h to 12h format)
  const formatTime = (time: string) => {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Calendar functions
  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false
      });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true
      });
    }
    
    // Add next month's days
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  // Get exam dates to highlight in calendar
  const getExamDates = () => {
    if (!filteredExams.length) return [];
    
    return filteredExams.map(exam => {
      const dateParts = exam.examDate.split('-');
      // Format is MM-DD-YYYY or DD-MM-YYYY
      const examDate = new Date(
        parseInt(dateParts[2]), // Year
        parseInt(dateParts[0]) - 1, // Month (0-indexed)
        parseInt(dateParts[1]) // Day
      );
      return examDate.getDate();
    });
  };

  const examDates = getExamDates();
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Loading state
  if (studentLoading || examLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Schedules</h2>
        <button className="text-blue-600 text-sm font-medium">Add New</button>
      </div>
      <div className="border-b border-gray-200 -mx-6 mb-4"></div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-800">{formatMonth(currentDate)}</span>
          <div className="flex gap-4">
            <button className="text-gray-600" onClick={handlePrevMonth}>
              <IoChevronBack size={20} />
            </button>
            <button className="text-gray-600" onClick={handleNextMonth}>
              <IoChevronForward size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-sm">
          {weekDays.map(day => (
            <div key={day} className="text-center text-gray-600">
              {day}
            </div>
          ))}
          
          {getDaysInMonth(currentDate).map((day, index) => (
            <div
              key={index}
              className={`text-center py-1 ${
                !day.isCurrentMonth ? 'text-gray-400' :
                examDates.includes(day.date) ? 'bg-blue-600 text-white rounded-lg' :
                day.date === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() && 
                currentDate.getFullYear() === new Date().getFullYear() ? 'bg-gray-200 rounded-lg' :
                'text-gray-800'
              }`}
            >
              {day.date}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Exams</h3>
        {filteredExams.length > 0 ? (
          <div className="space-y-4">
            {filteredExams.map((schedule) => (
              schedule.exams.map((exam, examIndex) => (
                <div key={`${schedule._id}-${examIndex}`} className="bg-white border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-800">{schedule.examName}</h4>
                    <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                      {calculateDaysRemaining(schedule.examDate)} Days More
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700 mt-3">{exam.courseName}</p>
                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-gray-500">
                        {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                      </span>
                      <div className="text-right">
                        <p className="text-gray-500">{formatDate(schedule.examDate)}</p>
                        <p className="text-blue-600">Room No : {exam.courseCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No exams scheduled for your class at this time.
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleSection;