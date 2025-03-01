import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import MorningNotification from '@/components/Teacher/Teacher Dashboard/MorningNotification';
import ProfileCard from '@/components/Teacher/Teacher Dashboard/ProfileCard';
import SyllabusProgress from '@/components/Teacher/Teacher Dashboard/SyllabusProgress';
import ScheduleComponent from '@/components/Teacher/Teacher Dashboard/ScheduleComponent';
import TeacherLeave from '@/components/Teacher/Teacher Dashboard/TeacherLeave';
import ClassTimings from '@/components/Teacher/Teacher Dashboard/ClassTimings';
import StudentMarksTable from '@/components/Teacher/Teacher Dashboard/StudentMarksTable';
import BestPerformers from '@/components/Teacher/Teacher Dashboard/BestPerformers';
import ProgressChart from '@/components/Teacher/Teacher Dashboard/ProgressChart';
import TeacherAttendance from '@/components/Teacher/Teacher Dashboard/TeacherAttendance';
import SyllabusView from '@/components/Teacher/Teacher Dashboard/SyllabusView';
import Avatar from '@/assets/avatars/student-09.jpg.png';

const studentsData = [
    {
        id: "1",
        name: "John Doe",
        grade: "10",
        level: "A",
        progress: 85,
        avatar: Avatar.src
    },
    {
        id: "2",
        name: "Jane Smith",
        grade: "10",
        level: "B",
        progress: 90,
        avatar: Avatar.src
    },
    {
      id: "3",
      name: "Mark Smith",
      grade: "10",
      level: "B",
      progress: 70,
      avatar: Avatar.src
    },
];

export default function TeacherDashboard() {
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

      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">All Students</span>
          <span className="text-dataText">Dashboard / Students</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <div className="border border-gray-200 shadow-md rounded-lg">
          <MorningNotification name="Kashem" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-lg">
                <ProfileCard />
              </div>
              <div className="rounded-lg">
                <SyllabusProgress completed={95} pending={5} />
              </div>
            </div>
            <div className="border border-gray-200 shadow-sm rounded-lg">
              <ClassTimings />
            </div>
            <div className="border border-gray-200 shadow-sm rounded-lg">
              <StudentMarksTable />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="border border-gray-200 shadow-md rounded-lg">
                  <BestPerformers />
                </div>
                <div className="border border-gray-200 shadow-md rounded-lg">
                  <ProgressChart students={studentsData} />
                </div>
              </div>
              <div className="border border-gray-200 shadow-md rounded-lg">
                <TeacherAttendance />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-gray-200 shadow-md rounded-lg">
              <ScheduleComponent />
            </div>
            <div className="border border-gray-200 shadow-md rounded-lg">
              <TeacherLeave />
            </div>
          </div>
        </div>
        
        <div className="mt-6 border border-gray-200 shadow-md rounded-lg">
          <SyllabusView />
        </div>
      </div>
    </div>
  );
}