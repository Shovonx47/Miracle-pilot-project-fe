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