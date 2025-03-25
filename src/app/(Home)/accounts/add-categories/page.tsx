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
      
      {/* Header section - stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText text-lg">Categories</span>
          <span className="text-dataText text-sm">Accounts / Categories</span>
        </div>
        
        {/* Export dropdown - becomes full width on mobile */}
        <div className="w-full sm:w-auto">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-200">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Export as PDF</SelectItem>
              <SelectItem value="excel">Export as Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* CategoryManagementTable component */}
      <CategoryManagementTable />
    </div>
  );
}