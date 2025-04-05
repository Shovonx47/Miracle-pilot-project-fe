import React from 'react';
import { Student } from '@/types/student';
import { useStudent } from './useStudent';

interface FeesReminderSectionProps {
  student?: Student | null;
}

const FeesReminderSection = ({ student: propStudent }: FeesReminderSectionProps) => {
  // Use student from props or context
  const contextStudent = useStudent();
  const student = propStudent || contextStudent;
  const fees = [
    {
      type: "Mess Fees",
      amount: "Tk 2000 + Tk 150",
      lastDate: "28 Feb 2025",
      isDue: true
    },
    {
      type: "Hostel",
      amount: "Tk 2500",
      lastDate: "28 Feb 2025",
      isDue: false
    },
    {
      type: "Book Fees",
      amount: "Tk 1500",
      lastDate: "28 Feb 2025",
      isDue: false
    },
    {
      type: "Exam Fees",
      amount: "Tk 1000",
      lastDate: "28 Feb 2025",
      isDue: false
    },
    {
      type: "Transport Fees",
      amount: "Tk 1500",
      lastDate: "28 Feb 2025",
      isDue: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Fees Reminder</h2>
        <button className="text-blue-600 text-sm">View All</button>
      </div>
      <div className="border-b border-gray-200 -mx-6 mb-4"></div>

      <div className="space-y-4 mt-4">
        {fees.map((fee, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-red-100"></div>
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{fee.type}</span>
                {fee.isDue && (
                  <span className="text-xs text-red-500 px-2 py-0.5 bg-red-50 rounded">
                    Due
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">{fee.amount}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last Date</div>
              <div className="text-sm text-gray-900">{fee.lastDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeesReminderSection;