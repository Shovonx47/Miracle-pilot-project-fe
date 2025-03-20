// components/FinancialTable.tsx
import React from 'react';
import { useGetAllTransactionsQuery } from '@/redux/api/transaction/transactionApi';

interface Transaction {
  _id: string;
  transactionCategory: string;
  transactionSubCategory: string;
  amount: number;
  transactionType: 'Income' | 'Expense';
  transactionDate: string;
  transactionId: string;
}

const FinancialTable = () => {
  // Get yesterday's date formatted as YYYY-MM-DD for API
  const getFormattedDate = () => {
    const today = new Date();
    // Get yesterday by going back 1 day from today
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    // Set the time to start of day (00:00:00)
    yesterday.setHours(0, 0, 0, 0);
    
    return yesterday.toISOString().slice(0, 10); // Returns YYYY-MM-DD format
  };

  const formattedDate = getFormattedDate();
  console.log("Fetching transactions for:", formattedDate); // Debug log

  const { data: transactionData, isLoading, isError } = useGetAllTransactionsQuery({
    startDate: formattedDate,
    endDate: formattedDate
  });

  // Debug log
  console.log("API Response:", transactionData);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center p-4 text-red-500">Error loading transactions</div>;
  }

  const transactions: Transaction[] = (transactionData?.data?.data || []).map((item) => ({
    ...item,
    transactionType: item.transactionType as 'Income' | 'Expense',
  }));

  if (transactions.length === 0) {
    return <div className="text-center p-4">No transactions for Yesterday</div>;
  }

  const totalIncome = transactions
    .filter(item => item.transactionType === 'Income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter(item => item.transactionType === 'Expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const cashInHand = totalIncome - totalExpense;

  const calculateBalance = (index: number): number => {
    let runningBalance = 0;
    for (let i = 0; i <= index; i++) {
      const transaction = transactions[i];
      if (transaction.transactionType === 'Income') {
        runningBalance += transaction.amount;
      } else {
        runningBalance -= transaction.amount;
      }
    }
    return runningBalance;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-[#202C4B] font-semibold">Particular</th>
              <th className="p-3 text-left text-[#202C4B] font-semibold">Income / Expense</th>
              <th className="p-3 text-left text-[#202C4B] font-semibold">Sub Category</th>
              <th className="p-3 text-left text-[#202C4B] font-semibold">Receipt</th>
              <th className="p-3 text-left text-[#202C4B] font-semibold">Payment</th>
              <th className="p-3 text-left text-[#202C4B] font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {transactions.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td className="p-3 text-gray-700">{item.transactionCategory}</td>
                <td className="p-3 text-gray-700">{item.transactionType}</td>
                <td className="p-3 text-gray-700">{item.transactionSubCategory}</td>
                <td className="p-3 text-gray-700">
                  {item.transactionType === 'Income' ? `$${item.amount.toLocaleString()}` : ''}
                </td>
                <td className="p-3 text-gray-700">
                  {item.transactionType === 'Expense' ? `$${item.amount.toLocaleString()}` : ''}
                </td>
                <td className="p-3 text-gray-700">${calculateBalance(index).toLocaleString()}</td>
              </tr>
            ))}
            
            <tr className="border-b">
              <td colSpan={3} className="p-3 text-green-600 font-medium">Total Income</td>
              <td className="p-3 text-green-600 font-medium">${totalIncome.toLocaleString()}</td>
              <td></td>
              <td></td>
            </tr>
            
            <tr className="border-b">
              <td colSpan={3} className="p-3 text-red-600 font-medium">Total Expense</td>
              <td></td>
              <td className="p-3 text-red-600 font-medium">${totalExpense.toLocaleString()}</td>
              <td></td>
            </tr>
            
            <tr className="border-b">
              <td colSpan={3} className="p-3 text-blue-600 font-medium">Cash In Hand</td>
              <td></td>
              <td></td>
              <td className="p-3 text-blue-600 font-medium">${cashInHand.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-32 text-center text-gray-500">
        <div>Account Officer</div>
        <div>General Manager</div>
        <div>Director</div>
        <div>Co-Chairman</div>
      </div>
    </div>
  );
};

export default FinancialTable;