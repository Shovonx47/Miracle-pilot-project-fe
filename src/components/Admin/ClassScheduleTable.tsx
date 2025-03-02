"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { PaginationPage } from '@/components/Reusable/Pagination';

const ClassScheduleTable = () => {
  const [filterBy, setFilterBy] = useState('Active');
  const [sortBy, setSortBy] = useState('-startTime');
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Dummy data for class schedules
  const dummySchedules = [
    {
      id: "SCH001",
      class: "10",
      section: "A",
      teacher: "Mr. Johnson",
      subject: "Mathematics",
      day: "Monday",
      startTime: "08:00 AM",
      endTime: "09:00 AM",
      classRoom: "Room 101",
      status: "Active"
    },
    {
      id: "SCH002",
      class: "9",
      section: "B",
      teacher: "Mrs. Smith",
      subject: "English",
      day: "Tuesday",
      startTime: "10:30 AM",
      endTime: "11:30 AM",
      classRoom: "Room 203",
      status: "Active"
    },
    {
      id: "SCH003",
      class: "11",
      section: "C",
      teacher: "Dr. Williams",
      subject: "Physics",
      day: "Wednesday",
      startTime: "01:15 PM",
      endTime: "02:15 PM",
      classRoom: "Lab 3",
      status: "Inactive"
    },
    {
      id: "SCH004",
      class: "8",
      section: "A",
      teacher: "Ms. Davis",
      subject: "History",
      day: "Thursday",
      startTime: "09:15 AM",
      endTime: "10:15 AM",
      classRoom: "Room 105",
      status: "Active"
    },
    {
      id: "SCH005",
      class: "12",
      section: "D",
      teacher: "Mr. Brown",
      subject: "Chemistry",
      day: "Friday",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      classRoom: "Lab 2",
      status: "Active"
    }
  ];

  // Filter dummy data based on search term and status
  const filteredSchedules = dummySchedules
    .filter(schedule => 
      (filterBy === 'all' || schedule.status === filterBy) &&
      (searchData === '' || 
        schedule.id.toLowerCase().includes(searchData.toLowerCase()) ||
        schedule.class.toLowerCase().includes(searchData.toLowerCase()) ||
        schedule.teacher.toLowerCase().includes(searchData.toLowerCase()) ||
        schedule.subject.toLowerCase().includes(searchData.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === '-startTime') {
        return a.startTime.localeCompare(b.startTime);
      } else if (sortBy === 'startTime') {
        return b.startTime.localeCompare(a.startTime);
      }
      return 0;
    });

  // Paginate data
  const paginatedSchedules = filteredSchedules.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredSchedules.length / limit);

  return (
    <div className="bg-white shadow-lg">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-semibold text-gray-800">Class Routine</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="border border-gray-200 py-1 px-2">
              <span className="text-sm text-gray-600">01/01/2025 - 31/01/2025</span>
            </div>
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Filters</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <Filter className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="-startTime">Time Ascending</option>
              <option value="startTime">Time Descending</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>

      <div className="flex items-center justify-between mb-4 p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
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
          </div>
          <span className="text-sm text-gray-600">Entries</span>
        </div>
        <input
          onChange={(e) => setSearchData(e.target.value)}
          type="search"
          placeholder="Search"
          className="border rounded px-3 py-1 text-sm"
          value={searchData}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
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
          {paginatedSchedules.length > 0 && (
            <tbody className="text-sm font-medium text-[#515B73]">
              {paginatedSchedules.map((schedule, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <span className="text-blue-600">{schedule.id}</span>
                  </td>
                  <td className="p-4">{schedule.class}</td>
                  <td className="p-4">{schedule.section}</td>
                  <td className="p-4">{schedule.teacher}</td>
                  <td className="p-4">{schedule.subject}</td>
                  <td className="p-4">{schedule.day}</td>
                  <td className="p-4">{schedule.startTime}</td>
                  <td className="p-4">{schedule.endTime}</td>
                  <td className="p-4">{schedule.classRoom}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {paginatedSchedules.length === 0 && (
          <div className='h-40 flex items-center justify-center w-full'>No data found.</div>
        )}
      </div>

      <div className="flex justify-end p-6">
      <div className="flex items-center gap-2">
        <PaginationPage totalPages={totalPages} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleTable;
