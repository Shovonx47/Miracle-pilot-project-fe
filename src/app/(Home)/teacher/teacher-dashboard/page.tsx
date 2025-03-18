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

      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">Teacher Dashboard</span>
          <span className="text-dataText">Dashboard / Teacher</span>
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