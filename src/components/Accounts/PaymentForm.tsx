"use client";
import React, { useState, useEffect } from 'react';
import { useCreateTransactionMutation } from '@/redux/api/transaction/transactionApi';
import { useGetAllTransactionTypesQuery } from '@/redux/api/transactionTypeApi';
import { toast } from 'react-hot-toast';
import { Type_of_Transaction } from '@/types/global';

type FormData = {
  recipient: string;
  designation: string;
  type: string;
  category: string;
  subCategory: string;
  amount: string;
  date: string;  // replaced mode with date
};

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    recipient: '',
    designation: '',
    type: '',
    category: '',
    subCategory: '',
    amount: '',
    date: ''  // replaced mode with date
  });

  // Fetch transaction types data
  const { data: transactionTypesData, isLoading: isLoadingTypes } = useGetAllTransactionTypesQuery({});

  // Initialize empty arrays for options
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [subCategoryMap, setSubCategoryMap] = useState<Record<string, string[]>>({});

  // Process API data when it's available
  useEffect(() => {
    if (transactionTypesData?.data) {
      // Extract unique types
      const types = Array.from(new Set(transactionTypesData.data.map(item => item.type)));
      setTypeOptions(types);

      // Extract unique categories
      const categories = Array.from(new Set(transactionTypesData.data.map(item => item.category)));
      setCategoryOptions(categories);

      // Build subCategory map
      const subCatMap: Record<string, string[]> = {};
      categories.forEach(category => {
        // Filter subcategories for this category
        const subCategories = transactionTypesData.data
          .filter(item => item.category === category)
          .map(item => item.subCategory);
        
        // Remove duplicates
        subCatMap[category] = Array.from(new Set(subCategories));
      });
      setSubCategoryMap(subCatMap);
    }
  }, [transactionTypesData]);

  // Add the mutation hook
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a transaction ID with timestamp
    const transactionId = `TRAN_${Date.now()}`;
    
    try {
      // Transform form data to match backend expectations
      const transactionPayload = {
        transactionId,
        transactionDate: new Date(formData.date).toISOString(), // use selected date
        transactionType: formData.type === 'Income' ? Type_of_Transaction.INCOME : Type_of_Transaction.EXPENSE,
        transactionCategory: formData.category,
        transactionSubCategory: formData.subCategory,
        amount: Number(formData.amount),
        recipient: formData.recipient,
        designation: formData.designation,
      };

      const res = await createTransaction(transactionPayload).unwrap();
      
      if (res?.success) {
        toast.success('Transaction created successfully');
        setFormData({
          recipient: '',
          designation: '',
          type: '',
          category: '',
          subCategory: '',
          amount: '',
          date: ''  // replaced mode with date
        });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create transaction');
      console.error('Transaction error:', error);
    }
  };

  // Add loading state to the form
  if (isLoadingTypes) {
    return <div>Loading form options...</div>;
  }

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
            {['Manager', 'Director', 'Consultant', 'Vendor', 'Employee'].map(option => (
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
        
        {/* Replace Mode Field with Date Field */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]} // Sets max date to today
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;