"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Avatar from '@/assets/avatars/ce.png';

// Define types for our data structure
interface ClassSession {
  time: string;
  subject: string;
  teacher: {
    name: string;
    avatar: string;
  };
}

interface DaySchedule {
  day: string;
  sessions: ClassSession[];
}

const ScheduleGrid: React.FC = () => {
  // Sample data structure
  const schedule: DaySchedule[] = [
    {
      day: "Monday",
      sessions: [
        { time: "09:00 - 09:45 AM", subject: "Maths", teacher: { name: "Jack", avatar: "/avatars/jack.png" } },
        { time: "09:45 - 10:30 AM", subject: "English", teacher: { name: "Hellana", avatar: "/avatars/hellana.png" } },
        { time: "10:45 - 11:30 AM", subject: "Computer", teacher: { name: "Daniel", avatar: "/avatars/daniel.png" } },
        { time: "11:30 - 12:15 PM", subject: "Bangla", teacher: { name: "Era", avatar: "/avatars/era.png" } },
        { time: "01:30 - 02:15 PM", subject: "Science", teacher: { name: "Morgan", avatar: "/avatars/morgan.png" } },
        { time: "02:15 - 03:00 PM", subject: "Chemistry", teacher: { name: "Aaron", avatar: "/avatars/aaron.png" } },
        { time: "03:15 - 04:00 PM", subject: "Physics", teacher: { name: "Teresa", avatar: "/avatars/teresa.png" } },
      ]
    },
    {
      day: "Tuesday",
      sessions: [
        { time: "09:00 - 09:45 AM", subject: "Bangla", teacher: { name: "Era", avatar: "/avatars/era.png" } },
        { time: "09:45 - 10:30 AM", subject: "Physics", teacher: { name: "Teresa", avatar: "/avatars/teresa.png" } },
        { time: "10:45 - 11:30 AM", subject: "Chemistry", teacher: { name: "Aaron", avatar: "/avatars/aaron.png" } },
        { time: "11:30 - 12:15 PM", subject: "Maths", teacher: { name: "Jack", avatar: "/avatars/jack.png" } },
        { time: "01:30 - 02:15 PM", subject: "Computer", teacher: { name: "Daniel", avatar: "/avatars/daniel.png" } },
        { time: "02:15 - 03:00 PM", subject: "English", teacher: { name: "Hellana", avatar: "/avatars/hellana.png" } },
        { time: "03:15 - 04:00 PM", subject: "Science", teacher: { name: "Morgan", avatar: "/avatars/morgan.png" } },
      ]
    },
    {
      day: "Wednesday",
      sessions: [
        { time: "09:00 - 09:45 AM", subject: "Computer", teacher: { name: "Daniel", avatar: "/avatars/daniel.png" } },
        { time: "09:45 - 10:30 AM", subject: "Science", teacher: { name: "Morgan", avatar: "/avatars/morgan.png" } },
        { time: "10:45 - 11:30 AM", subject: "Maths", teacher: { name: "Jack", avatar: "/avatars/jack.png" } },
        { time: "11:30 - 12:15 PM", subject: "Chemistry", teacher: { name: "Aaron", avatar: "/avatars/aaron.png" } },
        { time: "01:30 - 02:15 PM", subject: "Physics", teacher: { name: "Teresa", avatar: "/avatars/teresa.png" } },
        { time: "02:15 - 03:00 PM", subject: "English", teacher: { name: "Hellana", avatar: "/avatars/hellana.png" } },
        { time: "03:15 - 04:00 PM", subject: "Bangla", teacher: { name: "Era", avatar: "/avatars/era.png" } },
      ]
    },
    {
      day: "Thursday",
      sessions: [
        { time: "09:00 - 09:45 AM", subject: "Physics", teacher: { name: "Teresa", avatar: "/avatars/teresa.png" } },
        { time: "09:45 - 10:30 AM", subject: "Computer", teacher: { name: "Daniel", avatar: "/avatars/daniel.png" } },
        { time: "10:45 - 11:30 AM", subject: "English", teacher: { name: "Hellana", avatar: "/avatars/hellana.png" } },
        { time: "11:30 - 12:15 PM", subject: "Science", teacher: { name: "Morgan", avatar: "/avatars/morgan.png" } },
        { time: "01:30 - 02:15 PM", subject: "Bangla", teacher: { name: "Era", avatar: "/avatars/era.png" } },
        { time: "02:15 - 03:00 PM", subject: "Chemistry", teacher: { name: "Aaron", avatar: "/avatars/aaron.png" } },
        { time: "03:15 - 04:00 PM", subject: "Maths", teacher: { name: "Jack", avatar: "/avatars/jack.png" } },
      ]
    },
    {
      day: "Friday",
      sessions: [
        { time: "09:00 - 09:45 AM", subject: "English", teacher: { name: "Hellana", avatar: "/avatars/hellana.png" } },
        { time: "09:45 - 10:30 AM", subject: "Bangla", teacher: { name: "Era", avatar: "/avatars/era.png" } },
        { time: "10:45 - 11:30 AM", subject: "Physics", teacher: { name: "Teresa", avatar: "/avatars/teresa.png" } },
        { time: "11:30 - 12:15 PM", subject: "Chemistry", teacher: { name: "Aaron", avatar: "/avatars/aaron.png" } },
        { time: "01:30 - 02:15 PM", subject: "Maths", teacher: { name: "Jack", avatar: "/avatars/jack.png" } },
        { time: "02:15 - 03:00 PM", subject: "Computer", teacher: { name: "Daniel", avatar: "/avatars/daniel.png" } },
        { time: "03:15 - 04:00 PM", subject: "Science", teacher: { name: "Morgan", avatar: "/avatars/morgan.png" } },
      ]
    },
    {
      day: "Saturday",
      sessions: [
        { time: "09:00 - 09:45 AM", subject: "English", teacher: { name: "Hellana", avatar: "/avatars/hellana.png" } },
        { time: "09:45 - 10:30 AM", subject: "Bangla", teacher: { name: "Era", avatar: "/avatars/era.png" } },
        { time: "10:45 - 11:30 AM", subject: "Physics", teacher: { name: "Teresa", avatar: "/avatars/teresa.png" } },
        { time: "11:30 - 12:15 PM", subject: "Chemistry", teacher: { name: "Aaron", avatar: "/avatars/aaron.png" } },
        { time: "01:30 - 02:15 PM", subject: "Maths", teacher: { name: "Jack", avatar: "/avatars/jack.png" } },
        { time: "02:15 - 03:00 PM", subject: "Computer", teacher: { name: "Daniel", avatar: "/avatars/daniel.png" } },
        { time: "03:15 - 04:00 PM", subject: "Science", teacher: { name: "Morgan", avatar: "/avatars/morgan.png" } },
      ]
    },
  ];

  // Get all unique subjects for the filter dropdown
  const allSubjects = Array.from(
    new Set(schedule.flatMap(day => day.sessions.map(session => session.subject)))
  );

  // State for the selected subject filter
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  // Function to determine background color based on subject
  const getSubjectBgColor = (subject: string): string => {
    const colors: Record<string, string> = {
      "Maths": "bg-blue-50",
      "English": "bg-green-50",
      "Computer": "bg-blue-50",
      "Bangla": "bg-green-50",
      "Science": "bg-blue-50",
      "Chemistry": "bg-blue-50",
      "Physics": "bg-yellow-50",
    };
    return colors[subject] || "bg-gray-50";
  };

  // Filter sessions based on selected subject
  const filteredSchedule = schedule.map(day => ({
    day: day.day,
    sessions: selectedSubject
      ? day.sessions.filter(session => session.subject === selectedSubject)
      : day.sessions
  }));

  return (
    <div className="relative bg-[#FAFAFA]">
      {/* Header with Class Time label and Subject filter */}
      <div className="flex justify-between items-center mb-4 px-2 py-2 bg-[#FAFAFA]">
        <div className="font-bold text-lg">Class Time</div>
        <div className="relative">
          <select
            className="appearance-none bg-white text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {allSubjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="flex overflow-x-auto bg-[#FAFAFA]">
        {filteredSchedule.map((day, index) => (
          <div key={index} className="min-w-[200px] flex-1 bg-[#FAFAFA]">
            <div className="p-2 font-medium text-sm sticky top-0 bg-[#FAFAFA]">{day.day}</div>

            {day.sessions.length > 0 ? (
              day.sessions.map((session, sessionIndex) => (
                <div 
                  key={sessionIndex} 
                  className={`p-4 m-2 rounded-lg ${getSubjectBgColor(session.subject)}`}
                >
                  <div className="text-sm text-gray-600">{session.time}</div>
                  <div className="text-xs">Subject: {session.subject}</div>

                  <div className="mt-2 bg-white p-2 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg overflow-hidden mr-2">
                        <Image
                          src={Avatar}
                          alt={session.teacher.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs">{session.teacher.name}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 m-2 text-center text-gray-500 italic text-sm bg-white rounded-lg">
                No classes for this subject
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleGrid;