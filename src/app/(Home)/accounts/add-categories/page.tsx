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
import CategoryManagementTable from "@/components/Accounts/CategoryManagementTable";

export default function AllStudentsPage() {
  return (
    <div className="p-2 md:p-2 lg:p-7">
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">Categories</span>
          <span className="text-dataText">Accounts / Categories</span>
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
        </div>
      </div>
      
      {/* Added CategoryManagementTable component here */}
      <CategoryManagementTable />
    </div>
  );
}