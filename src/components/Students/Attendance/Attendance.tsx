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
import StudentAttendanceTable from "@/components/Attendance/StudentAttendanceTable";
import { useGetAllStudentsQuery } from '@/redux/api/Student/studentApi';
import LoadingSpinner from '@/components/Loader';

export default function AllStudentAttendance() {
    const [filterBy, setFilterBy] = useState<string>('Active');
    const [sortBy, setSortBy] = useState<string>('roll');
    const [searchData, setSearchData] = useState('');

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)

    const { data: allStudents, isLoading } = useGetAllStudentsQuery({ page, limit, sort: sortBy, searchTerm: searchData, status: filterBy })


    if (isLoading) {
        return <LoadingSpinner />
    }




    return (
        <div className="p-6 md:p-8 lg:p-10">
            

            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-headerText">Student Attendance</span>
                    <span className="text-dataText">Students / Student Attendance</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Select>
                        <SelectTrigger className="w-[180px] bg-gray-200">
                            <SelectValue placeholder="Export" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Export as PDF</SelectItem>
                            <SelectItem value="excel">Export as Excel</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <StudentAttendanceTable allStudents={allStudents} filterBy={filterBy} setFilterBy={setFilterBy} sortBy={sortBy} setSortBy={setSortBy} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
        </div>
    );
}