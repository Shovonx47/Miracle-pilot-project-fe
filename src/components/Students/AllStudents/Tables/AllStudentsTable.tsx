"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { useGetAllStudentsQuery } from '@/redux/api/Student/studentApi';
import LoadingSpinner from '@/components/Loader';
import { PaginationPage } from '@/components/Reusable/Pagination';


type Tickers = {
  [key: string]: boolean;
};

const AllStudentsTable = () => {
  const [tickers, setTickers] = useState<Tickers>({});
  const [filterBy, setFilterBy] = useState('Active');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [searchData, setSearchData] = useState('');

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)


  const handleTickerClick = (studentIndex: number, tickerIndex: number) => {
    setTickers(prev => ({
      ...prev,
      [`${studentIndex}-${tickerIndex}`]: !prev[`${studentIndex}-${tickerIndex}`]
    }));
  };


  const { data: allStudents, isLoading } = useGetAllStudentsQuery({ page, limit, sort: sortBy, searchTerm: searchData, status: filterBy })


  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="bg-white shadow-lg">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-semibold text-gray-800">Students List</h1>
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
                <option value="all">Fiters</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
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
              <option value="-createdAt">Date Ascending</option>
              <option value="createdAt">Date Descending</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>

      {/* Rest of the component remains the same */}
      <div className="flex items-center justify-between mb-4 p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Row Per Page</span>
            <select onChange={(e) => setLimit(Number(e.target.value))} className="border rounded px-2 py-1 text-sm">

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
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Admission No</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Roll No</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Class</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Section</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Gender</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Date of Join</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Date of Birth</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          {
            allStudents?.data?.data.length > 0 &&
            <tbody className="text-sm font-medium text-[#515B73]">
              {allStudents?.data?.data?.map((student: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <span className="text-blue-600">{student.studentId}</span>
                  </td>
                  <td className="p-4">{student.studentId}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={student.profileImage}
                        alt={`${student.firstName}'s profile`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{student.firstName} {student.lastName}</span>
                    </div>
                  </td>
                  <td className="p-4">{student.class}</td>
                  <td className="p-4">{student.section}</td>
                  <td className="p-4">{student.gender}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${student.status === 'Active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                      }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">{student.admissionDate}</td>
                  <td className="p-4">{student.dateOfBirth}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {[1, 2, 3].map((tickerIndex) => (
                          <button
                            key={tickerIndex}
                            onClick={() => handleTickerClick(index, tickerIndex)}
                            className={`w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer transition-colors ${tickers[`${index}-${tickerIndex}`]
                              ? 'bg-blue-500 border-blue-500'
                              : 'bg-white'
                              }`}
                          />
                        ))}
                      </div>
                      <button className={`px-4 py-1 rounded text-white ${student.paid ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                        {student.paid ? 'Paid' : 'Due'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
        {
          allStudents?.data?.data?.length === 0 &&
          <div className='h-40 flex items-center justify-center w-full'> No data found. </div>
        }
      </div>

      <div className="flex justify-end p-6">
        <div className="flex items-center gap-2">
          <PaginationPage totalPages={allStudents?.data?.meta?.totalPage} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default AllStudentsTable;