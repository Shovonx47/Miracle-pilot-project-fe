"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import LoadingSpinner from '@/components/Loader';
import { PaginationPage } from '@/components/Reusable/Pagination';

type Tickers = {
  [key: string]: boolean;
};

// Mock teacher data
const mockTeachers = [
  {
    id: "T001",
    teacherId: "TCH-2025-001",
    firstName: "John",
    lastName: "Smith",
    profileImage: "/api/placeholder/40/40",
    department: "Science",
    subject: "Physics",
    gender: "Male",
    status: "Active",
    joiningDate: "15/01/2022",
    dateOfBirth: "10/05/1985",
    paid: true
  },
  {
    id: "T002",
    teacherId: "TCH-2025-002",
    firstName: "Sarah",
    lastName: "Johnson",
    profileImage: "/api/placeholder/40/40",
    department: "Mathematics",
    subject: "Algebra",
    gender: "Female",
    status: "Active",
    joiningDate: "03/08/2023",
    dateOfBirth: "22/11/1990",
    paid: true
  },
  {
    id: "T003",
    teacherId: "TCH-2025-003",
    firstName: "Michael",
    lastName: "Williams",
    profileImage: "/api/placeholder/40/40",
    department: "English",
    subject: "Literature",
    gender: "Male",
    status: "Inactive",
    joiningDate: "07/03/2021",
    dateOfBirth: "15/07/1982",
    paid: false
  },
  {
    id: "T004",
    teacherId: "TCH-2025-004",
    firstName: "Emily",
    lastName: "Brown",
    profileImage: "/api/placeholder/40/40",
    department: "Social Studies",
    subject: "History",
    gender: "Female",
    status: "Active",
    joiningDate: "21/09/2022",
    dateOfBirth: "30/03/1988",
    paid: true
  },
  {
    id: "T005",
    teacherId: "TCH-2025-005",
    firstName: "David",
    lastName: "Jones",
    profileImage: "/api/placeholder/40/40",
    department: "Science",
    subject: "Chemistry",
    gender: "Male",
    status: "Active",
    joiningDate: "14/02/2024",
    dateOfBirth: "05/12/1979",
    paid: false
  },
  {
    id: "T006",
    teacherId: "TCH-2025-006",
    firstName: "Jessica",
    lastName: "Garcia",
    profileImage: "/api/placeholder/40/40",
    department: "Arts",
    subject: "Music",
    gender: "Female",
    status: "Inactive",
    joiningDate: "08/11/2021",
    dateOfBirth: "18/09/1992",
    paid: true
  },
  {
    id: "T007",
    teacherId: "TCH-2025-007",
    firstName: "Robert",
    lastName: "Miller",
    profileImage: "/api/placeholder/40/40",
    department: "Physical Education",
    subject: "Sports",
    gender: "Male",
    status: "Active",
    joiningDate: "19/04/2023",
    dateOfBirth: "12/06/1984",
    paid: true
  }
];

const AllTeachersTable = () => {
  const [tickers, setTickers] = useState<Tickers>({});
  const [filterBy, setFilterBy] = useState('Active');
  const [sortBy, setSortBy] = useState('-joiningDate');
  const [searchData, setSearchData] = useState('');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [teachersData, setTeachersData] = useState<any>({
    data: [],
    meta: {
      totalPage: 0,
      currentPage: 1,
      total: 0,
    }
  });

  const handleTickerClick = (teacherIndex: number, tickerIndex: number) => {
    setTickers(prev => ({
      ...prev,
      [`${teacherIndex}-${tickerIndex}`]: !prev[`${teacherIndex}-${tickerIndex}`]
    }));
  };

  // Simulating data fetching and filtering
  useEffect(() => {
    setIsLoading(true);
    
    // Filter by status
    let filteredTeachers = [...mockTeachers];
    if (filterBy !== 'all') {
      if (filterBy === 'paid' || filterBy === 'unpaid') {
        const isPaid = filterBy === 'paid';
        filteredTeachers = filteredTeachers.filter(teacher => teacher.paid === isPaid);
      } else {
        filteredTeachers = filteredTeachers.filter(teacher => teacher.status === filterBy);
      }
    }
    
    // Search functionality
    if (searchData) {
      const searchTerm = searchData.toLowerCase();
      filteredTeachers = filteredTeachers.filter(teacher => 
        teacher.firstName.toLowerCase().includes(searchTerm) || 
        teacher.lastName.toLowerCase().includes(searchTerm) ||
        teacher.teacherId.toLowerCase().includes(searchTerm) ||
        teacher.department.toLowerCase().includes(searchTerm) ||
        teacher.subject.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort by joining date
    filteredTeachers.sort((a, b) => {
      const dateA = new Date(a.joiningDate.split('/').reverse().join('-'));
      const dateB = new Date(b.joiningDate.split('/').reverse().join('-'));
      return sortBy === '-joiningDate' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
    
    // Pagination
    const totalTeachers = filteredTeachers.length;
    const totalPages = Math.ceil(totalTeachers / limit);
    const startIndex = (page - 1) * limit;
    const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + limit);
    
    setTeachersData({
      data: paginatedTeachers,
      meta: {
        totalPage: totalPages,
        currentPage: page,
        total: totalTeachers
      }
    });
    
    // Simulate network delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [page, limit, filterBy, sortBy, searchData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white shadow-lg">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-semibold text-gray-800">Teachers List</h1>
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
                <option value="all">Filters</option>
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
              <option value="-joiningDate">Date Ascending</option>
              <option value="joiningDate">Date Descending</option>
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
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))} 
              className="border rounded px-2 py-1 text-sm"
            >
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
          value={searchData}
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
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Teacher ID</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Department</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Subject</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Gender</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Joining Date</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">DOB</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          {teachersData.data.length > 0 && (
            <tbody className="text-sm font-medium text-[#515B73]">
              {teachersData.data.map((teacher: any, index: number) => (
                <tr key={teacher.id} className="border-b">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <span className="text-blue-600">{teacher.teacherId}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={teacher.profileImage}
                        alt={`${teacher.firstName}'s profile`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{teacher.firstName} {teacher.lastName}</span>
                    </div>
                  </td>
                  <td className="p-4">{teacher.department}</td>
                  <td className="p-4">{teacher.subject}</td>
                  <td className="p-4">{teacher.gender}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      teacher.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="p-4">{teacher.joiningDate}</td>
                  <td className="p-4">{teacher.dateOfBirth}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {[1, 2, 3].map((tickerIndex) => (
                          <button
                            key={tickerIndex}
                            onClick={() => handleTickerClick(index, tickerIndex)}
                            className={`w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer transition-colors ${
                              tickers[`${index}-${tickerIndex}`]
                                ? 'bg-blue-500 border-blue-500'
                                : 'bg-white'
                            }`}
                          />
                        ))}
                      </div>
                      <button className={`px-4 py-1 rounded text-white ${
                        teacher.paid ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {teacher.paid ? 'Paid' : 'Due'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {teachersData.data.length === 0 && (
          <div className='h-40 flex items-center justify-center w-full'>No data found.</div>
        )}
      </div>

      <div className="flex justify-end p-6">
        <div className="flex items-center gap-2">
          <PaginationPage 
            totalPages={teachersData.meta.totalPage} 
            page={page} 
            setPage={setPage} 
          />
        </div>
      </div>
    </div>
  );
};

export default AllTeachersTable;