"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import LoadingSpinner from '@/components/Loader';
import { PaginationPage } from '@/components/Reusable/Pagination';
import { useGetAllStaffsQuery } from '@/redux/api/Staff/staffApi';

const AllStaffTable = () => {
  const [filterBy, setFilterBy] = useState('Active');
  const [sortBy, setSortBy] = useState('-joiningDate');
  const [searchData, setSearchData] = useState('');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data: staffData, isLoading } = useGetAllStaffsQuery({ 
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
    <div className="bg-white shadow-lg">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-semibold text-gray-800">Staff List</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
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
              <option value="-joiningDate">Date Ascending</option>
              <option value="joiningDate">Date Descending</option>
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
          className="border rounded px-3 py-1 text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 w-full">
              <th className="w-4 p-4 -mx-6">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Staff ID</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Gender</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Joining Date</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Contract Type</th>
            </tr>
          </thead>
          {staffData?.data?.data?.length > 0 && (
            <tbody className="text-sm font-medium text-[#515B73]">
              {staffData?.data?.data?.map((staff: any) => (
                <tr key={staff._id} className="border-b">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <span className="text-blue-600">{staff.staffId}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={staff.profileImage}
                        alt={`${staff.firstName}'s profile`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{staff.firstName} {staff.lastName}</span>
                    </div>
                  </td>
                  <td className="p-4">{staff.category}</td>
                  <td className="p-4">{staff.gender}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      staff.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(staff.joiningDate).toLocaleDateString()}</td>
                  <td className="p-4">{staff.contractType}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!staffData?.data?.data?.length && (
          <div className='h-40 flex items-center justify-center w-full'>No data found.</div>
        )}
      </div>

      <div className="flex justify-end p-6">
        <div className="flex items-center gap-2">
          <PaginationPage 
            totalPages={staffData?.data?.meta?.totalPage} 
            page={page} 
            setPage={setPage} 
          />
        </div>
      </div>
    </div>
  );
};

export default AllStaffTable;