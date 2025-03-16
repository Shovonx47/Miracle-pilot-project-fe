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
import { useGetAllTeachersQuery } from '@/redux/api/Teacher/teacherApi';
import TeacherAttendanceTable from '@/components/Attendance/TeacherAttendanceTable';

export default function AllTeacherAttendance() {
    const [filterBy, setFilterBy] = useState<string>('Active');
    const [sortBy, setSortBy] = useState<string>('teacherId');
    const [searchData, setSearchData] = useState('');

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)

    const { data: allTeachers, isLoading } = useGetAllTeachersQuery({ page, limit, sort: sortBy, searchTerm: searchData, status: filterBy })


    if (isLoading) {
        return <LoadingSpinner />
    }




    return (
        <div className="p-6 md:p-8 lg:p-10">
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-full md:w-2/5">
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearchData(e.target.value)}
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
                            <SelectItem value="csv">Export as CSV</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <TeacherAttendanceTable allTeachers={allTeachers} filterBy={filterBy} setFilterBy={setFilterBy} sortBy={sortBy} setSortBy={setSortBy} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
        </div>
    );
}