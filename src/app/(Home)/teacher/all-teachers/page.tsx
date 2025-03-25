import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import AllTeachersTable from "@/components/Teacher/All Teachers/AllTeachersTable";
import Link from 'next/link';

export default function AllTeachersPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">All Teachers</span>
          <span className="text-dataText">Teachers / All Teachers</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:space-x-4 w-full sm:w-auto">
          <div className="bg-white border border-gray-300 rounded-md p-4 w-9 h-9 hidden sm:block"></div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-200 mb-3 sm:mb-0">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Export as PDF</SelectItem>
              <SelectItem value="excel">Export as Excel</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/teacher/add-teacher" className="w-full sm:w-auto">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto">
              Add Teachers
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <AllTeachersTable />
      </div>
    </div>
  );
}