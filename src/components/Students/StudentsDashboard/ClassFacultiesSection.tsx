import React from 'react';
import { Mail, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import Avatar from '@/assets/avatars/hijab 1.png';
import { useGetAllTeachersQuery } from '@/redux/api/Teacher/teacherApi';

interface Teacher {
  firstName: string;
  subject: string;
  email: string;
  profileImage: string;
}

const ClassFacultiesSection = () => {
  const { data: teacherData, isLoading } = useGetAllTeachersQuery({ page: 1, limit: 10 });

  const teachers = teacherData?.data?.data || [];

  if (isLoading) {
    return <div className="bg-white p-6 rounded-lg shadow-sm w-full">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Class Faculties</h2>
        <div className="flex gap-2">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </div>
      </div>
      <div className="border-b border-gray-200 -mx-6 mb-4"></div>

      {/* Horizontal Scrollable Faculty List */}
      <div className="flex overflow-x-auto gap-4">
        {teachers.map((teacher: Teacher, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-4 min-w-[220px]">
            <div className="flex items-start space-x-4">
              <img
                src={teacher.profileImage || Avatar.src}
                alt={teacher.firstName}
                className="w-10 h-10 object-cover flex-shrink-0"
              />
              <div className="flex flex-col">
                <h3 className="text-base font-medium text-gray-900">{teacher.firstName}</h3>
                <p className="text-sm text-gray-500">{teacher.subject}</p>
              </div>
            </div>

            {/* Buttons in a Single Row */}
            <div className="flex flex-row gap-2 w-full">
              <button 
                className="px-4 py-2 bg-white border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                onClick={() => window.location.href = `mailto:${teacher.email}`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassFacultiesSection;