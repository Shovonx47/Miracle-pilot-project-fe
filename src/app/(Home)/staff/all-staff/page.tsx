import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import AllStaffsTable from "@/components/Staff/All Staffs/AllStaffTable";
import Link from 'next/link';

export default function AllStudentsPage() {
  return (
    <div className="p-6 md:p-8 lg:p-10">

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">All Staffs</span>
          <span className="text-dataText">Staffs / All Staffs</span>
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
          <Link href="/teacher/all-teachers">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Add Staff
            </button>
          </Link>
        </div>
      </div>

      <AllStaffsTable />
    </div>
  );
}