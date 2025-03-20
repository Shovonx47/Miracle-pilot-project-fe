"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { PaginationPage } from '@/components/Reusable/Pagination';
import { useGetAllTransactionsQuery } from '@/redux/api/transaction/transactionApi';
import LoadingSpinner from '@/components/Loader';
import { Transaction } from '@/types/transaction';

const PaymentTable = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [sortBy, setSortBy] = useState('type');
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Fetch transactions - only send parameters if they have non-default values
  const { data: transactionData, isLoading } = useGetAllTransactionsQuery({
    ...(searchData && { searchTerm: searchData }),
    ...(sortBy !== 'type' && { sortBy }),
    ...(selectedDate && { date: selectedDate }) // Add date parameter
  });

  // Get today's date in YYYY-MM-DD format for max date restriction
  const today = new Date().toISOString().split('T')[0];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Get the transactions array and pagination data
  const transactions = transactionData?.data?.data || [];
  const totalPages = Math.ceil((transactionData?.data?.meta?.total || 0) / limit);

  // Function to handle submit action
  const handleSubmit = (id: string) => {
    console.log(`Submitting payment ${id}`);
  };

  // Format the date when displaying in table
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="bg-white shadow-lg">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-semibold text-gray-800">Income and Expense</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                max={today}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="appearance-none bg-white border rounded px-3 py-1 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Type</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Sub Category</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Transaction Date</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          {transactions.length > 0 && (
            <tbody className="text-sm font-medium text-[#515B73]">
              {transactions.map((transaction: Transaction) => (
                <tr key={transaction._id} className="border-b">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <span className="text-blue-600">{transaction.transactionId}</span>
                  </td>
                  <td className="p-4">{transaction.transactionType}</td>
                  <td className="p-4">{transaction.transactionCategory}</td>
                  <td className="p-4">{transaction.transactionSubCategory}</td>
                  <td className="p-4">${transaction.amount.toLocaleString()}</td>
                  <td className="p-4">{formatDate(transaction.transactionDate)}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleSubmit(transaction.transactionId)}
                      className="bg-blue-100 text-blue-800 py-1 px-3 rounded text-sm border border-blue-800"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {transactions.length === 0 && (
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