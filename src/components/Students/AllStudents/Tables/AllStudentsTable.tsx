"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import LoadingSpinner from '@/components/Loader';
import { PaginationPage } from '@/components/Reusable/Pagination';
import { useGetAllStudentsQuery } from '@/redux/api/Student/studentApi';

const AllStudentsTable = () => {
  const [filterBy, setFilterBy] = useState('Active');
  const [sortBy, setSortBy] = useState('-admissionDate');
  const [searchData, setSearchData] = useState('');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data: studentData, isLoading } = useGetAllStudentsQuery({ 
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
    <div className="bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6 gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Students List</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            >
              <option value="all">Filters</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <Filter className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            >
              <option value="-admissionDate">Date Ascending</option>
              <option value="admissionDate">Date Descending</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Row Per Page</span>
            <select 
              value={limit}
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
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          type="search"
          placeholder="Search"
          className="border rounded px-3 py-2 text-sm w-full sm:w-auto"
        />
      </div>

      {/* Table Section - With horizontal scroll for mobile */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 w-full">
              <th className="w-4 p-2 sm:p-4">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Student ID</th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Name</th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Class</th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Gender</th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Status</th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Admission Date</th>
            </tr>
          </thead>
          {studentData?.data?.data?.length > 0 && (
            <tbody className="text-xs sm:text-sm font-medium text-[#515B73]">
              {studentData?.data?.data?.map((student: any) => (
                <tr key={student._id} className="border-b">
                  <td className="p-2 sm:p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-2 sm:p-4">
                    <span className="text-blue-600">{student.studentId}</span>
                  </td>
                  <td className="p-2 sm:p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={student.profileImage}
                        alt={`${student.firstName}'s profile`}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                      />
                      <span>{student.firstName} {student.lastName}</span>
                    </div>
                  </td>
                  <td className="p-2 sm:p-4">Class {student.class} ({student.section})</td>
                  <td className="p-2 sm:p-4">{student.gender}</td>
                  <td className="p-2 sm:p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      student.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-2 sm:p-4">{new Date(student.admissionDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!studentData?.data?.data?.length && (
          <div className='h-40 flex items-center justify-center w-full'>No data found.</div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center sm:justify-end p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <PaginationPage 
            totalPages={studentData?.data?.meta?.totalPage} 
            page={page} 
            setPage={setPage} 
          />
        </div>
      </div>
    </div>
  );
};

export default AllStudentsTable;