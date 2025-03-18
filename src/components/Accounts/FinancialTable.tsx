// components/FinancialTable.tsx
import React from 'react';

interface FinancialEntry {
  particular: string;
  type: 'Income' | 'Expense';
  subCategory: string;
  receipt?: string;
  payment?: string;
  balance?: string;
}

const FinancialTable = () => {
  const financialData: FinancialEntry[] = [
    { particular: 'Opening Balance', type: 'Income', subCategory: 'Account', receipt: '$25,0000' },
    { particular: 'Student Fees', type: 'Income', subCategory: 'Fees', receipt: '$15,000' },
    { particular: 'Admission/Booking', type: 'Income', subCategory: 'Admission', receipt: '$10,000' },
    { particular: 'Bills', type: 'Expense', subCategory: 'Transportation', payment: '$3,000' },
    { particular: 'Salary', type: 'Expense', subCategory: 'Employee', payment: '$1,00000' },
    { particular: 'Commission', type: 'Expense', subCategory: 'Influencer', payment: '$2,000' },
  ];

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
            {financialData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3 text-gray-700">{item.particular}</td>
                <td className="p-3 text-gray-700">{item.type}</td>
                <td className="p-3 text-gray-700">{item.subCategory}</td>
                <td className="p-3 text-gray-700">{item.receipt || ''}</td>
                <td className="p-3 text-gray-700">{item.payment || ''}</td>
                <td className="p-3 text-gray-700"></td>
              </tr>
            ))}
            
            <tr className="border-b">
              <td colSpan={3} className="p-3 text-green-600 font-medium">Total Receive</td>
              <td className="p-3 text-green-600 font-medium">$4,50000</td>
              <td></td>
              <td></td>
            </tr>
            
            <tr className="border-b">
              <td colSpan={3} className="p-3 text-red-600 font-medium">Total Expense</td>
              <td></td>
              <td className="p-3 text-red-600 font-medium">$1,05000</td>
              <td></td>
            </tr>
            
            <tr className="border-b">
              <td colSpan={3} className="p-3 text-blue-600 font-medium">Cash In Hand</td>
              <td></td>
              <td></td>
              <td className="p-3 text-blue-600 font-medium">$3,45000</td>
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