"use client";
import React, { useState } from 'react';

type FormData = {
  recipient: string;
  designation: string;
  type: string;
  category: string;
  subCategory: string;
  amount: string;
  mode: string;
};

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    recipient: '',
    designation: '',
    type: '',
    category: '',
    subCategory: '',
    amount: '',
    mode: ''
  });

  // Sample options for select fields
  const designationOptions = ['Manager', 'Director', 'Consultant', 'Vendor', 'Employee'];
  const typeOptions = ['Expense', 'Reimbursement', 'Advance', 'Salary', 'Commission'];
  const categoryOptions = ['Travel', 'Office Supplies', 'Equipment', 'Services', 'Utilities'];
  
  // Subcategory options based on selected category
  const subCategoryMap: Record<string, string[]> = {
    'Travel': ['Airfare', 'Hotel', 'Meals', 'Transportation', 'Visa Fees'],
    'Office Supplies': ['Stationery', 'Printing', 'Computer Accessories', 'Furniture'],
    'Equipment': ['Hardware', 'Software', 'Appliances', 'Machinery'],
    'Services': ['Consulting', 'Maintenance', 'Subscription', 'Legal'],
    'Utilities': ['Electricity', 'Water', 'Internet', 'Phone'],
    '': [] // Default empty option
  };

  const modeOptions = ['Cash', 'Card', 'Bank Transfer', 'Cheque', 'Digital Wallet'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      // If changing category, reset subcategory
      if (name === 'category') {
        return { ...prev, [name]: value, subCategory: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your submission logic here
  };

  return (
    <div className="p-4 bg-[#FAFAFA]">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Recipient Field */}
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient
          </label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Designation Field */}
        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Designation</option>
            {designationOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Type Field */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            {typeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Sub Category Field */}
        <div>
          <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 mb-1">
            Sub Category
          </label>
          <select
            id="subCategory"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!formData.category}
          >
            <option value="">Select Sub Category</option>
            {(subCategoryMap[formData.category] || []).map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Amount Field */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            step="0.01"
            required
          />
        </div>
        
        {/* Mode Field */}
        <div>
          <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1">
            Mode
          </label>
          <select
            id="mode"
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Mode</option>
            {modeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;