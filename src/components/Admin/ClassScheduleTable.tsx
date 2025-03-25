"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter, Menu } from 'lucide-react';
import { PaginationPage } from '@/components/Reusable/Pagination';
import { useGetAllClassRoutinesQuery } from '@/redux/api/Class-routine/classRoutineApi';

interface ClassRoutine {
  _id: string;
  class: string;
  section: string;
  teacherName: string;
  subjectName: string;
  subjectCode: string;
  day: string;
  startTime: string;
  endTime: string;
  roomNumber: string;
  buildingName?: string;
  isOptional: boolean;
  createdBy: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const ClassScheduleTable = () => {
  const [filterBy, setFilterBy] = useState('active');
  const [sortBy, setSortBy] = useState('-startTime');
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // Fetch class routine data using Redux RTK Query
  const { data: classRoutineData, isLoading, isError } = useGetAllClassRoutinesQuery({
    page,
    limit,
    sort: sortBy
  });
  
  // Extract the data from the API response
  const classRoutines = classRoutineData?.data?.data || [];
  const totalCount = classRoutineData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalCount / limit);

  // Filter data based on search term
  const filteredSchedules = classRoutines.filter((routine: ClassRoutine) => 
    searchData === '' || 
    routine._id.toLowerCase().includes(searchData.toLowerCase()) ||
    routine.class.toLowerCase().includes(searchData.toLowerCase()) ||
    routine.teacherName.toLowerCase().includes(searchData.toLowerCase()) ||
    routine.subjectName.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full">
      {/* Header Section - Made responsive for mobile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 space-y-4 md:space-y-0">
        <h1 className="text-xl font-semibold text-gray-800">Class Routine</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
          {/* Date range hidden on mobile, visible on md screens and up */}
          <div className="hidden md:block border border-gray-200 py-1 px-2 text-sm text-gray-600">
            <span>01/01/2025 - 31/01/2025</span>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="all">Filters</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Filter className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
            <div className="relative w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="-startTime">Time Ascending</option>
                <option value="startTime">Time Descending</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>

      {/* Controls Section - Made responsive for mobile */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 space-y-4 md:space-y-0">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm text-gray-600">Row Per Page</span>
          <select 
            onChange={(e) => setLimit(Number(e.target.value))} 
            className="border rounded px-2 py-1 text-sm"
            value={limit}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="text-sm text-gray-600">Entries</span>
        </div>
        <input
          onChange={(e) => setSearchData(e.target.value)}
          type="search"
          placeholder="Search"
          className="border rounded px-3 py-1 text-sm w-full md:w-auto"
          value={searchData}
        />
      </div>

      {/* Loading and Error States */}
      {isLoading ? (
        <div className='h-40 flex items-center justify-center w-full'>Loading...</div>
      ) : isError ? (
        <div className='h-40 flex items-center justify-center w-full'>Error loading data. Please try again.</div>
      ) : (
        <div className="overflow-x-auto">
          {/* Using a single table for all screen sizes with horizontal scrolling */}
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr className="bg-gray-100 w-full">
                <th className="w-4 p-4 -mx-6">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Class</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Section</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Teacher</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Subject</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Day</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Start Time</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">End Time</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Class Room</th>
              </tr>
            </thead>
            {filteredSchedules.length > 0 && (
              <tbody className="text-sm font-medium text-[#515B73]">
                {filteredSchedules.map((routine: ClassRoutine) => (
                  <tr key={routine._id} className="border-b">
                    <td className="p-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="p-4">
                      <span className="text-blue-600">{routine._id.substring(0, 8)}</span>
                    </td>
                    <td className="p-4">{routine.class}</td>
                    <td className="p-4">{routine.section}</td>
                    <td className="p-4">{routine.teacherName}</td>
                    <td className="p-4">{routine.subjectName}</td>
                    <td className="p-4">{routine.day}</td>
                    <td className="p-4">{routine.startTime}</td>
                    <td className="p-4">{routine.endTime}</td>
                    <td className="p-4">{routine.roomNumber}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {filteredSchedules.length === 0 && (
            <div className='h-40 flex items-center justify-center w-full'>No data found.</div>
          )}
        </div>
      )}

      {/* Pagination - Made responsive for mobile */}
      <div className="flex justify-center md:justify-end p-4 md:p-6">
        <div className="flex items-center gap-2">
          <PaginationPage totalPages={totalPages} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleTable;