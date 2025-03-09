"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { PaginationPage } from '@/components/Reusable/Pagination';

const PaymentTable = () => {
  const [filterBy, setFilterBy] = useState('Paid');
  const [sortBy, setSortBy] = useState('type');
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Dummy data for payments with new structure
  const dummyPayments = [
    {
      no: "001",
      type: "Invoice",
      category: "Operations",
      subCategory: "Office Supplies",
      amount: "$1,250",
      mode: "Bank Transfer",
      status: "Paid"
    },
    {
      no: "002",
      type: "Expense",
      category: "Marketing",
      subCategory: "Advertising",
      amount: "$2,500",
      mode: "Credit Card",
      status: "Generated"
    },
    {
      no: "003",
      type: "Salary",
      category: "HR",
      subCategory: "Regular Staff",
      amount: "$3,800",
      mode: "Direct Deposit",
      status: "Paid"
    },
    {
      no: "004",
      type: "Vendor",
      category: "Procurement",
      subCategory: "Raw Materials",
      amount: "$5,350",
      mode: "Check",
      status: "Generated"
    },
    {
      no: "005",
      type: "Utility",
      category: "Facilities",
      subCategory: "Electricity",
      amount: "$975",
      mode: "Auto-debit",
      status: "Paid"
    }
  ];

  // Filter dummy data based on search term and status
  const filteredPayments = dummyPayments
    .filter(payment => 
      (filterBy === 'all' || payment.status === filterBy) &&
      (searchData === '' || 
        payment.no.toLowerCase().includes(searchData.toLowerCase()) ||
        payment.type.toLowerCase().includes(searchData.toLowerCase()) ||
        payment.category.toLowerCase().includes(searchData.toLowerCase()) ||
        payment.subCategory.toLowerCase().includes(searchData.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'type') {
        return a.type.localeCompare(b.type);
      } else if (sortBy === '-type') {
        return b.type.localeCompare(a.type);
      }
      return 0;
    });

  // Paginate data
  const paginatedPayments = filteredPayments.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredPayments.length / limit);

  // Function to handle submit action
  const handleSubmit = (no: string) => {
    console.log(`Submitting payment ${no}`);
    // This would typically submit the payment to the backend
  };

  return (
    <div className="bg-white shadow-lg">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-semibold text-gray-800">Income and Expense</h1>
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
                <option value="Generated">Generated</option>
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
              <option value="type">Type Ascending</option>
              <option value="-type">Type Descending</option>
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
              <th className="p-4 text-left text-sm font-semibold text-gray-600">No</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Type</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Sub Category</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Mode</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Submit</th>
            </tr>
          </thead>
          {paginatedPayments.length > 0 && (
            <tbody className="text-sm font-medium text-[#515B73]">
              {paginatedPayments.map((payment, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <span className="text-blue-600">{payment.no}</span>
                  </td>
                  <td className="p-4">{payment.type}</td>
                  <td className="p-4">{payment.category}</td>
                  <td className="p-4">{payment.subCategory}</td>
                  <td className="p-4">{payment.amount}</td>
                  <td className="p-4">{payment.mode}</td>
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
                      onClick={() => handleSubmit(payment.no)}
                      style={{
                        backgroundColor: payment.status === 'Paid' ? '#007AFF26' : '#FFC0C0',
                        color: payment.status === 'Paid' ? '#2A52BE' : '#FF0000',
                        border: `1px solid ${payment.status === 'Paid' ? '#2A52BE' : '#FF0000'}`
                      }}
                      className="py-1 px-3 rounded text-sm"
                    >
                      {payment.status === 'Paid' ? 'Submit' : 'Pending'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {paginatedPayments.length === 0 && (
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

export default PaymentTable;