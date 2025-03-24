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
import EmployeePaymentTable from '@/components/Staff/Payroll/EmployeePaymentTable';

export default function AllStudentsPage() {
  return (
    <div className="p-2 md:p-2 lg:p-7">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">Employee Payroll</span>
          <span className="text-dataText">Payroll / Employee Payroll</span>
        </div>
        <div className="mt-3 sm:mt-0">
          <Select>
            <SelectTrigger className="w-[150px] sm:w-[180px] bg-gray-200">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Export as PDF</SelectItem>
              <SelectItem value="excel">Export as Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <EmployeePaymentTable />
      </div>
    </div>
  );
}