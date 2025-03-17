"use client";

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
import FinancialTable from "@/components/Accounts/FinancialTable";

export default function AccountsReportPage() {
  return (
    <div className="p-2 md:p-2 lg:p-7">
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">Accounts Report</span>
          <span className="text-dataText">Accounts / Accounts Report</span>
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
      
      {/* Income and Expense Section */}
      <div className="bg-white shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-center p-3">
          <h1 className="text-md font-semibold text-gray-800">Income and Expense</h1>
          <div className="border border-gray-200 py-1 px-2">
            <span className="text-sm text-gray-600">01/02/2025 - 28/02/2025</span>
          </div>
        </div>
      </div>
      
      {/* FinancialTable Component with white background and larger size */}
      <div className="flex justify-center">
        <div className="w-11/12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <FinancialTable />
        </div>
      </div>
    </div>
  );
}