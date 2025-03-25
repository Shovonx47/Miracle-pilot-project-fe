"use client"
import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import LoadingSpinner from '@/components/Loader';
import { useGetAllStaffsQuery } from '@/redux/api/Staff/staffApi';
import StaffAttendanceTable from '@/components/Attendance/StaffAttendanceTable';

export default function AllStaffAttendance() {
    const [filterBy, setFilterBy] = useState<string>('Active');
    const [sortBy, setSortBy] = useState<string>('teacherId');
    const [searchData, setSearchData] = useState('');

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)

    const { data: allStaffs, isLoading } = useGetAllStaffsQuery({ page, limit, sort: sortBy, searchTerm: searchData, status: filterBy })

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="p-4 md:p-6 lg:p-10">
            {/* On mobile: Stack everything in columns */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-headerText text-xl">Student Attendance</span>
                    <span className="text-dataText text-sm">Students / Student Attendance</span>
                </div>
                <div className="w-full md:w-auto mt-2 md:mt-0">
                    <Select>
                        <SelectTrigger className="w-full md:w-[180px] bg-gray-200">
                            <SelectValue placeholder="Export" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Export as PDF</SelectItem>
                            <SelectItem value="excel">Export as Excel</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <StaffAttendanceTable 
                allStaffs={allStaffs} 
                filterBy={filterBy} 
                setFilterBy={setFilterBy} 
                sortBy={sortBy} 
                setSortBy={setSortBy} 
                page={page} 
                setPage={setPage} 
                limit={limit} 
                setLimit={setLimit} 
            />
        </div>
    );
}