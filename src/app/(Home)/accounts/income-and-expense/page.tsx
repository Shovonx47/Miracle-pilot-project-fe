import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import PaymentTable from "@/components/Accounts/PaymentTable";
import Link from 'next/link';

export default function AllStudentsPage() {
  return (
    <div className="p-2 md:p-2 lg:p-7">
      {/* Header section - stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText text-lg">Accounts</span>
          <span className="text-dataText text-sm">Accounts / Income and Expenses</span>
        </div>
        
        {/* Controls section - stacks and becomes full width on mobile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:space-x-4 w-full sm:w-auto">
          <button className="px-3 py-1.5 text-sm bg-[#506EE4] text-white rounded-sm hover:bg-blue-700 transition-colors w-full sm:w-auto">
            Add New Expenses
          </button>
          
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <div className="bg-white border border-gray-300 rounded-md p-4 w-9 h-9 flex items-center justify-center">
              <IoSearchOutline className="text-gray-500" />
            </div>
            
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
      </div>
      
      <PaymentTable />
    </div>
  );
}