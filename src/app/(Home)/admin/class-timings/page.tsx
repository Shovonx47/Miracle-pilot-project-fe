import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Link from 'next/link';
import ScheduleGrid from '@/components/Admin/ScheduleGrid';

export default function AllStudentsPage() {
  return (
    <div className="p-2 md:p-4 lg:p-7">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">Class Time</span>
          <span className="text-dataText">Admin / Class Time</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:space-x-4">
          <Select>
            <SelectTrigger className="w-[140px] sm:w-[180px] bg-gray-200">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Export as PDF</SelectItem>
              <SelectItem value="excel">Export as Excel</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/student/add-student">
            <button className="bg-blue-500 text-white text-sm px-3 sm:px-4 py-2 rounded-md hover:bg-blue-600 whitespace-nowrap">
              Add Time Table
            </button>
          </Link>
        </div>
      </div>

      {/* Add the ScheduleGrid component below the existing content */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <ScheduleGrid />
      </div>

      {/* Break time cards with responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Morning Break */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="bg-blue-600 text-white text-center py-1 px-2 rounded-md font-medium text-sm inline-block mb-2">
            Morning Break
          </div>
          <div className="text-gray-800 text-sm">
            10:30 to 10:45 AM
          </div>
        </div>

        {/* Lunch */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="bg-yellow-500 text-white text-center py-1 px-2 rounded-md font-medium text-sm inline-block mb-2">
            Lunch
          </div>
          <div className="text-gray-800 text-sm">
            01:30 to 01:45 PM
          </div>
        </div>

        {/* Evening Break */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="bg-blue-600 text-white text-center py-1 px-2 rounded-md font-medium text-sm inline-block mb-2">
            Evening Break
          </div>
          <div className="text-gray-800 text-sm">
            03:30 PM to 03:45 PM
          </div>
        </div>
      </div>
    </div>
  );
}