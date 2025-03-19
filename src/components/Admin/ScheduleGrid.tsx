"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Avatar from '@/assets/avatars/ce.png';
import { useGetAllClassRoutinesQuery } from '@/redux/api/Class-routine/classRoutineApi';

// Define types for API response
interface ClassRoutine {
  _id: string;
  class: string;
  section: string;
  teacherName: string;
  subjectName: string;
  subjectCode: string;
  day: string;
  startTime: string;
  endTime: string;
  roomNumber: string;
  buildingName?: string;
}

// Define types for our display structure
interface ClassSession {
  time: string;
  subject: string;
  teacher: {
    name: string;
    avatar: string;
  };
  room?: string;
}

interface DaySchedule {
  day: string;
  sessions: ClassSession[];
}

const ScheduleGrid: React.FC = () => {
  // Fetch class routine data using Redux RTK Query
  const { data: classRoutineData, isLoading, isError } = useGetAllClassRoutinesQuery({});
  
  // State for processed schedule data
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  
  // State for the selected subject filter
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  
  // Process API data into our display format when data is loaded
  useEffect(() => {
    if (classRoutineData?.data?.data) {
      const routines = classRoutineData.data.data;
      
      // Create a map to hold sessions for each day
      const dayMap = new Map<string, ClassSession[]>();
      
      // Initialize days of the week
      const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      daysOfWeek.forEach(day => dayMap.set(day, []));
      
      // Process each routine into the appropriate day
      routines.forEach((routine: ClassRoutine) => {
        const session: ClassSession = {
          time: `${routine.startTime} - ${routine.endTime}`,
          subject: routine.subjectName,
          teacher: {
            name: routine.teacherName,
            avatar: "/avatars/avatar.png" // Default avatar
          },
          room: routine.roomNumber
        };
        
        // Add session to the appropriate day
        const day = routine.day;
        if (dayMap.has(day)) {
          const sessions = dayMap.get(day) || [];
          sessions.push(session);
          dayMap.set(day, sessions);
        }
      });
      
      // Convert map to our schedule format
      const newSchedule: DaySchedule[] = daysOfWeek.map(day => ({
        day,
        sessions: dayMap.get(day) || []
      }));
      
      setSchedule(newSchedule);
    }
  }, [classRoutineData]);
  
  // Get all unique subjects for the filter dropdown
  const allSubjects = Array.from(
    new Set(schedule.flatMap(day => day.sessions.map(session => session.subject)))
  );

  // Function to determine background color based on subject
  const getSubjectBgColor = (subject: string): string => {
    const colors: Record<string, string> = {
      "Math": "bg-blue-50",
      "English": "bg-green-50",
      "Computer Science": "bg-blue-50",
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

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading schedule...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-64">Error loading schedule. Please try again.</div>;
  }

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
                  {session.room && <div className="text-xs">Room: {session.room}</div>}

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