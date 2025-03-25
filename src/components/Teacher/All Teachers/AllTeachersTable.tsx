"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter, Menu } from 'lucide-react';
import LoadingSpinner from '@/components/Loader';
import { PaginationPage } from '@/components/Reusable/Pagination';
import { useGetAllTeachersQuery } from '@/redux/api/Teacher/teacherApi';

type Tickers = {
  [key: string]: boolean;
};

type TeacherDetails = {
  teacherId: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  subject: string;
  gender: "Male" | "Female" | "Other";
  status: "Active" | "Inactive";
  joiningDate: string;
  dateOfBirth: string;
  paid: boolean;
};

const AllTeachersTable = () => {
  const [tickers, setTickers] = useState<Tickers>({});
  const [filterBy, setFilterBy] = useState('Active');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleTickerClick = (studentIndex: number, tickerIndex: number) => {
    setTickers(prev => ({
      ...prev,
      [`${studentIndex}-${tickerIndex}`]: !prev[`${studentIndex}-${tickerIndex}`]
    }));
  };

  const { data: allTeachers, isLoading } = useGetAllTeachersQuery({ 
    page, 
    limit, 
    sort: sortBy, 
    searchTerm: searchData, 
    status: filterBy 
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white shadow-lg w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 md:p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-3 md:mb-0">Teachers List</h1>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center bg-gray-100 rounded p-2 mb-3"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Menu className="w-5 h-5" />
          <span className="ml-2 text-sm">Filters & Options</span>
        </button>
        
        {/* Filters - Desktop view always visible, Mobile: toggleable */}
        <div className={`${showMobileFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-3 md:mb-0`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            <div className="border border-gray-200 py-1 px-2 w-full md:w-auto">
              <span className="text-sm text-gray-600">01/01/2025 - 31/01/2025</span>
            </div>
            <div className="relative w-full md:w-auto">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="all">Filters</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
              <Filter className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
          <div className="relative w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="-createdAt">Date Ascending</option>
              <option value="createdAt">Date Descending</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-200"></div>

      {/* Pagination and Search Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-3 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Row Per Page</span>
            <select 
              onChange={(e) => setLimit(Number(e.target.value))} 
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <span className="text-sm text-gray-600">Entries</span>
        </div>
        <input
          onChange={(e) => setSearchData(e.target.value)}
          type="search"
          placeholder="Search"
          className="border rounded px-3 py-1 text-sm w-full md:w-auto"
        />
      </div>

      {/* Table Section with Horizontal Scroll on Mobile */}
      <div className="overflow-x-auto w-full">
        <div className="min-w-[1000px]"> {/* Force minimum width to ensure scrolling on small screens */}
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 w-full">
                <th className="w-4 p-4 -mx-6">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Teacher Id</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Subject</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Gender</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Date of Join</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Date of Birth</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            {allTeachers?.data?.data.length > 0 && (
              <tbody className="text-sm font-medium text-[#515B73]">
                {allTeachers?.data?.data?.map((teacher: TeacherDetails, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="p-4">
                      <span className="text-blue-600">{teacher?.teacherId}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={teacher?.profileImage}
                          alt={`${teacher?.firstName}'s profile`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{teacher?.firstName} {teacher?.lastName}</span>
                      </div>
                    </td>
                    <td className="p-4">{teacher?.subject}</td>
                    <td className="p-4">{teacher?.gender}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        teacher?.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {teacher?.status}
                      </span>
                    </td>
                    <td className="p-4">{teacher?.joiningDate}</td>
                    <td className="p-4">{teacher?.dateOfBirth}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {[1, 2, 3].map((tickerIndex) => (
                            <button
                              key={tickerIndex}
                              onClick={() => handleTickerClick(index, tickerIndex)}
                              className={`w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer transition-colors ${
                                tickers[`${index}-${tickerIndex}`]
                                  ? 'bg-blue-500 border-blue-500'
                                  : 'bg-white'
                              }`}
                            />
                          ))}
                        </div>
                        <button className={`px-4 py-1 rounded text-white ${
                          teacher?.paid ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {teacher?.paid ? 'Paid' : 'Due'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        
        {allTeachers?.data?.data.length === 0 && (
          <div className='h-40 flex items-center justify-center w-full'>
            No data found.
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-center md:justify-end p-4 md:p-6">
        <div className="flex items-center gap-2">
          <PaginationPage 
            totalPages={allTeachers?.data?.meta?.totalPage} 
            page={page} 
            setPage={setPage} 
          />
        </div>
      </div>
    </div>
  );
};

export default AllTeachersTable;