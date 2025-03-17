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
import AccountantAttendanceTable from '@/components/Attendance/AccountantAttendanceTable';
import { useGetAllAccountOfficersQuery } from '@/redux/api/Account-officer/accountOfficerApi';

export default function AllAccountantAttendance() {
    const [filterBy, setFilterBy] = useState<string>('Active');
    const [sortBy, setSortBy] = useState<string>('teacherId');
    const [searchData, setSearchData] = useState('');

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)

    const { data: allAccountants, isLoading } = useGetAllAccountOfficersQuery({ page, limit, sort: sortBy, searchTerm: searchData, status: filterBy })


    if (isLoading) {
        return <LoadingSpinner />
    }




    return (
        <div className="p-2 md:p-2 lg:p-7">

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

            <AccountantAttendanceTable allAccountants={allAccountants} filterBy={filterBy} setFilterBy={setFilterBy} sortBy={sortBy} setSortBy={setSortBy} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
        </div>
    );
}