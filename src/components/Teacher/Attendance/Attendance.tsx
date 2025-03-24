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
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <span className="font-bold text-headerText">Teacher Attendance</span>
                    <span className="text-dataText">Teacher / Attendance</span>
                </div>
                <div className="flex items-center w-full sm:w-auto">
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
            
            {/* Wrap the table in a div with horizontal scroll for mobile */}
            <div className="overflow-x-auto">
                <div className="min-w-full">
                    <TeacherAttendanceTable 
                        allTeachers={allTeachers} 
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
            </div>
        </div>
    );
}