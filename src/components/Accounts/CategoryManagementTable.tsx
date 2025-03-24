"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter, Menu } from 'lucide-react';
import { useCreateTransactionTypeMutation, useGetAllTransactionTypesQuery } from '@/redux/api/transactionTypeApi';
import { toast } from 'sonner';

// Update the Category interface to match API response
interface Category {
  _id: string;
  type: string;
  category: string;
  subCategory: string;
  createdAt: string;
  updatedAt: string;
}

const CategoryManagementTable = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchData, setSearchData] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('a-z');
  const [showSidebar, setShowSidebar] = useState(false);

  const [formData, setFormData] = useState({
    no: '',
    type: '',
    category: '',
    subCategory: ''
  });

  const [createTransactionType, { isLoading: isSubmitting }] = useCreateTransactionTypeMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Replace dummy data with API query
  const query: Record<string, any> = {};

  if (searchData) {
    query.searchTerm = searchData;
  }

  if (filterBy !== 'all') {
    query.type = filterBy;
  }

  const { data: transactionTypesData, isLoading } = useGetAllTransactionTypesQuery({});

  // Update the filtering logic to use API data
  const filteredCategories = transactionTypesData?.data || [];

  // Handle checkbox selection
  const handleSelectItem = (_id: string) => {
    if (selectedItems.includes(_id)) {
      setSelectedItems(selectedItems.filter(item => item !== _id));
    } else {
      setSelectedItems([...selectedItems, _id]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === filteredCategories.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredCategories.map(item => item._id));
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      const result = await createTransactionType(formData).unwrap();
      toast.success('Category added successfully');
      // Reset form
      setFormData({
        no: '',
        type: '',
        category: '',
        subCategory: ''
      });
      // Hide sidebar on mobile after submission
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to add category');
    }
  };

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between items-center p-2 md:p-4 border-b">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-2 p-1 rounded-md md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg md:text-xl font-medium">Add Category</h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4">
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none bg-white border rounded px-2 md:px-3 py-1 pr-8 text-xs md:text-sm text-gray-600 cursor-pointer"
            >
              <option value="all">Filter</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <Filter className="w-3 h-3 md:w-4 md:h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border rounded px-2 md:px-3 py-1 pr-8 text-xs md:text-sm text-gray-600 cursor-pointer"
            >
              <option value="a-z">Sort by A-Z</option>
              <option value="z-a">Sort by Z-A</option>
            </select>
            <ChevronDown className="w-3 h-3 md:w-4 md:h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left sidebar with form - hidden by default on mobile */}
        <div className={`${showSidebar ? 'block' : 'hidden'} md:block w-full md:w-44 border-b md:border-b-0 md:border-r p-4 bg-white md:static fixed top-0 left-0 h-auto md:h-auto z-10`}>
          <div className="md:hidden flex justify-between items-center mb-4">
            <h2 className="font-medium">Add New Category</h2>
            <button onClick={toggleSidebar} className="p-1">
              ✕
            </button>
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              name="no"
              placeholder="No"
              value={formData.no}
              onChange={handleInputChange}
              className="w-full h-9 md:h-10 px-3 py-2 bg-white border rounded text-sm"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full h-9 md:h-10 px-3 py-2 bg-white border rounded text-sm"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full h-9 md:h-10 px-3 py-2 bg-white border rounded text-sm"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="subCategory"
              placeholder="Sub-Category"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-full h-9 md:h-10 px-3 py-2 bg-white border rounded text-sm"
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 text-white font-medium rounded text-center disabled:bg-blue-400"
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </div>

        {/* Main content with table */}
        <div className="flex-1">
          <div className="p-2 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-gray-600">Row Per Page</span>
              <select 
                onChange={(e) => setLimit(Number(e.target.value))} 
                className="border rounded px-1 md:px-2 py-1 text-xs md:text-sm"
                value={limit}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <span className="text-xs md:text-sm text-gray-600">Entries</span>
            </div>

            <input
              onChange={(e) => setSearchData(e.target.value)}
              type="search"
              placeholder="Search"
              className="border rounded px-2 md:px-3 py-1 text-xs md:text-sm w-full md:w-auto"
              value={searchData}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 md:p-4">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={selectedItems.length === filteredCategories.length && filteredCategories.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-medium text-gray-600 border-r">
                    <div className="flex items-center justify-between">
                      <span>Id</span>
                      <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-medium text-gray-600 border-r">
                    <div className="flex items-center justify-between">
                      <span>Type</span>
                      <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-medium text-gray-600 border-r">
                    <div className="flex items-center justify-between">
                      <span>Category</span>
                      <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-medium text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Sub Category</span>
                      <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 md:p-4 text-center">
                        <input 
                          type="checkbox" 
                          className="rounded" 
                          checked={selectedItems.includes(category._id)}
                          onChange={() => handleSelectItem(category._id)}
                        />
                      </td>
                      <td className="p-2 md:p-4 text-blue-600 border-r text-xs md:text-sm">
                        <div className="truncate max-w-[80px] md:max-w-none">
                          {category._id}
                        </div>
                      </td>
                      <td className="p-2 md:p-4 border-r text-xs md:text-sm">{category.type}</td>
                      <td className="p-2 md:p-4 border-r text-xs md:text-sm">{category.category}</td>
                      <td className="p-2 md:p-4 text-xs md:text-sm">{category.subCategory}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Floating action button for mobile to show form */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-4 right-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
      >
        <span className="text-xl">+</span>
      </button>
    </div>
  );
};

export default CategoryManagementTable;