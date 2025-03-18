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
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">Accounts</span>
          <span className="text-dataText">Accounts / Income and Expenses</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1.5 text-sm bg-[#506EE4] text-white rounded-sm hover:bg-blue-700 transition-colors">
            Add New Expenses
          </button>
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
      
      <PaymentTable />
    </div>
  );
}