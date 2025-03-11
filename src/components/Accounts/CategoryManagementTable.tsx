"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { PaginationPage } from '@/components/Reusable/Pagination';

// Define the Category type
interface Category {
  id: number;
  no: string;
  type: string;
  category: string;
  subCategory: string;
}

const CategoryManagementTable = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchData, setSearchData] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('a-z');
  const [startDate, setStartDate] = useState('02/28/2025');
  const [endDate, setEndDate] = useState('03/11/2025');

  // Dummy data for categories
  const dummyCategories: Category[] = [
    { id: 1, no: "1", type: "Expense", category: "Salary", subCategory: "Staff" },
    { id: 2, no: "2", type: "Expense", category: "Salary", subCategory: "Teachers" },
    { id: 3, no: "3", type: "Expense", category: "Bills", subCategory: "Books" },
    { id: 4, no: "4", type: "Income", category: "Fees", subCategory: "Hostel" },
    { id: 5, no: "5", type: "Expense", category: "Bills", subCategory: "Transportation" },
    { id: 6, no: "6", type: "Expense", category: "Fees", subCategory: "Admission" },
    { id: 7, no: "7", type: "Expense", category: "Donation", subCategory: "Scholarship" },
    { id: 8, no: "8", type: "Expense", category: "Bills", subCategory: "Food" },
    { id: 9, no: "9", type: "Expense", category: "Salary", subCategory: "Guest Teacher" },
    { id: 10, no: "10", type: "Expense", category: "Bills", subCategory: "Marketing" }
  ];

  // Filter dummy data based on search term and type
  const filteredCategories = dummyCategories
    .filter(category => 
      (filterBy === 'all' || category.type === filterBy) &&
      (searchData === '' || 
        category.no.toLowerCase().includes(searchData.toLowerCase()) ||
        category.type.toLowerCase().includes(searchData.toLowerCase()) ||
        category.category.toLowerCase().includes(searchData.toLowerCase()) ||
        category.subCategory.toLowerCase().includes(searchData.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'a-z') {
        return a.category.localeCompare(b.category);
      } else if (sortBy === 'z-a') {
        return b.category.localeCompare(a.category);
      }
      return 0;
    });

  // Paginate data
  const paginatedCategories = filteredCategories.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredCategories.length / limit);

  // Handle checkbox selection
  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === paginatedCategories.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedCategories.map(item => item.id));
    }
  };

  // Handle submit
  const handleSubmit = () => {
    console.log('Submitting selected categories:', selectedItems);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-medium">Add Category</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="border px-3 py-1 text-sm text-gray-600">
              {startDate} - {endDate}
            </div>
          </div>
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer"
            >
              <option value="all">Filter</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <Filter className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer"
            >
              <option value="a-z">Sort by A-Z</option>
              <option value="z-a">Sort by Z-A</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left sidebar with form */}
        {/* Left sidebar with form */}
<div className="w-44 border-r p-4">
  <div className="mb-4">
    <input
      type="text"
      placeholder="No"
      className="w-full h-10 px-3 py-2 bg-white border rounded text-sm"
    />
  </div>

  <div className="mb-4">
    <select
      className="w-full h-10 px-3 py-2 bg-white border rounded text-sm appearance-none"
    >
      <option value="" disabled selected>Type</option>
      <option value="Income">Income</option>
      <option value="Expense">Expense</option>
    </select>
  </div>

  <div className="mb-4">
    <input
      type="text"
      placeholder="Category"
      className="w-full h-10 px-3 py-2 bg-white border rounded text-sm"
    />
  </div>

  <div className="mb-4">
    <input
      type="text"
      placeholder="Sub-Category"
      className="w-full h-10 px-3 py-2 bg-white border rounded text-sm"
    />
  </div>

  <button 
    onClick={handleSubmit}
    className="w-full py-2 bg-blue-600 text-white font-medium rounded text-center"
  >
    SUBMIT
  </button>
</div>

        {/* Main content with table */}
        <div className="flex-1">
          <div className="p-4 flex items-center justify-between">
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
                <tr className="bg-gray-100">
                  <th className="p-4">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={selectedItems.length === paginatedCategories.length && paginatedCategories.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-600 border-r">
                    <div className="flex items-center justify-between">
                      <span>No</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-600 border-r">
                    <div className="flex items-center justify-between">
                      <span>Type</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-600 border-r">
                    <div className="flex items-center justify-between">
                      <span>Category</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Sub Category</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        className="rounded" 
                        checked={selectedItems.includes(category.id)}
                        onChange={() => handleSelectItem(category.id)}
                      />
                    </td>
                    <td className="p-4 text-blue-600 border-r">{category.no}</td>
                    <td className="p-4 border-r">{category.type}</td>
                    <td className="p-4 border-r">{category.category}</td>
                    <td className="p-4">{category.subCategory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination using the PaginationPage component from sample code */}
          <div className="flex justify-end p-6">
            <div className="flex items-center gap-2">
              <PaginationPage totalPages={totalPages} page={page} setPage={setPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementTable;