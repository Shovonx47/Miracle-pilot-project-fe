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
import ClassScheduleTable from '@/components/Admin/ClassScheduleTable';

export default function AllStudentsPage() {
    return (
        <div className="p-2 md:p-2 lg:p-7">
            {/* Header section - stacks vertically on mobile */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                {/* Title section */}
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <span className="font-bold text-headerText">Class Routine</span>
                    <span className="text-dataText text-sm">Admin / Class Routine</span>
                </div>
                
                {/* Actions section - full width on mobile */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:space-x-4 w-full sm:w-auto">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px] bg-gray-200 mb-2 sm:mb-0">
                            <SelectValue placeholder="Export" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Export as PDF</SelectItem>
                            <SelectItem value="excel">Export as Excel</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Link href="/student/add-student" className="w-full sm:w-auto">
                        <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto">
                            Add Class Routine
                        </button>
                    </Link>
                </div>
            </div>

            {/* Class schedule table - full width on all screens */}
            <div className="w-full">
                <ClassScheduleTable />
            </div>
        </div>
    );
}