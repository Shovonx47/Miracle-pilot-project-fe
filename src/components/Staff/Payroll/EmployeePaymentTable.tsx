"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { PaginationPage } from '@/components/Reusable/Pagination';
import { useGetAllSalariesQuery } from '@/redux/api/Salary/salaryApi';
import LoadingSpinner from '@/components/Loader';

interface Payment {
  id: string;
  name: string;
  department: string;
  designation: string;
  phone: string;
  amount: string;
  status: string;
}

const EmployeePaymentTable = () => {
  const [filterBy, setFilterBy] = useState('Paid');
  const [sortBy, setSortBy] = useState('name');
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data: salaryData, isLoading } = useGetAllSalariesQuery({
    page,
    limit,
    sort: sortBy,
    searchTerm: searchData,
    status: filterBy === 'all' ? undefined : filterBy
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const payments: Payment[] = salaryData?.data || [];
  const totalPages = Math.ceil((salaryData?.meta?.total || 0) / limit);

  const handleViewPaySlip = (id: string): void => {
    console.log(`Viewing pay slip for employee ${id}`);
    // This would typically open a modal or navigate to a pay slip page
  };

  return (
    <div className="bg-white shadow-lg">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-semibold text-gray-800">Employee Payments</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="border border-gray-200 py-1 px-2">
              <span className="text-sm text-gray-600">01/02/2025 - 28/02/2025</span>
            </div>
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Filters</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
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
              <option value="name">Name Ascending</option>
              <option value="-name">Name Descending</option>
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
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Department</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Designation</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Phone</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          {payments.length > 0 && (
            <tbody className="text-sm font-medium text-[#515B73]">
              {payments.map((payment: Payment, index: number) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <span className="text-blue-600">{payment.id}</span>
                  </td>
                  <td className="p-4">{payment.name}</td>
                  <td className="p-4">{payment.department}</td>
                  <td className="p-4">{payment.designation}</td>
                  <td className="p-4">{payment.phone}</td>
                  <td className="p-4">{payment.amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewPaySlip(payment.id)}
                      className="bg-gray-200 text-[#515B73] py-1 px-3 rounded text-sm"
                    >
                      View Pay Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {payments.length === 0 && (
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

export default EmployeePaymentTable;