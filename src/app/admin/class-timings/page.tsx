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
    <div className="p-6 md:p-8 lg:p-10">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full md:w-2/5">
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-full px-4 py-2 pr-10 bg-white border rounded-lg focus:outline-none focus:border-gray-400"
          />
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="border border-gray-300 px-3 py-1 rounded-md flex items-center space-x-2">
            <span className="text-sm text-gray-600">Academic Year :</span>
            <span className="text-sm font-medium">2025 / 2026</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center border border-gray-300">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div className="w-6 h-6 flex items-center justify-center border border-gray-300">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">Class Time</span>
          <span className="text-dataText">Admin / Class Time</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white border border-gray-300 rounded-md p-4 w-9 h-9"></div>
          <Select>
            <SelectTrigger className="w-[180px] bg-gray-200">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Export as PDF</SelectItem>
              <SelectItem value="excel">Export as Excel</SelectItem>
              <SelectItem value="csv">Export as CSV</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/student/add-student">
            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600">
              Add Time Table
            </button>
          </Link>
        </div>
      </div>
      
      {/* Add the ScheduleGrid component below the existing content */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ScheduleGrid />
      </div>
      
      {/* Break time cards with reduced width */}
      <div className="flex flex-wrap gap-4 mt-6">
        {/* Morning Break */}
        <div className="bg-white rounded-lg shadow-sm p-4 w-64">
          <div className="bg-blue-600 text-white text-center py-1 px-2 rounded-md font-medium text-sm inline-block mb-2">
            Morning Break
          </div>
          <div className="text-gray-800 text-sm">
            10:30 to 10:45 AM
          </div>
        </div>
        
        {/* Lunch */}
        <div className="bg-white rounded-lg shadow-sm p-4 w-64">
          <div className="bg-yellow-500 text-white text-center py-1 px-2 rounded-md font-medium text-sm inline-block mb-2">
            Lunch
          </div>
          <div className="text-gray-800 text-sm">
            01:30 to 01:45 PM
          </div>
        </div>
        
        {/* Evening Break */}
        <div className="bg-white rounded-lg shadow-sm p-4 w-64">
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