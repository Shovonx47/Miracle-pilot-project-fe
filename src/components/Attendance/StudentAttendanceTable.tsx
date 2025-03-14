"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { PaginationPage } from '@/components/Reusable/Pagination';
import Image from 'next/image';
import StudentDetails from '../student/StudentDetails';

type StudentType = {
  admissionNo: string;
  rollNo: string;
  name: string;
  class: string;
  section: string;
  attendance: string;
  notes: string;
  
};


type StudentDetailsProps = {
  allStudents:any
}

const StudentAttendanceTable = ({allStudents}:StudentDetailsProps) => {
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [students, setStudents] = useState<StudentType[]>([
    {
      admissionNo: "AD1234",
      rollNo: "5005",
      name: "Juli",
      class: "III",
      section: "A",
      attendance: "Present",
      notes: ""
    },
    {
      admissionNo: "AD1234",
      rollNo: "3511",
      name: "Kotha",
      class: "II",
      section: "A",
      attendance: "Present",
      notes: ""
    },
    {
      admissionNo: "AD1234",
      rollNo: "5010",
      name: "Gibon",
      class: "I",
      section: "B",
      attendance: "Late",
      notes: "Medical Emergency"
    },
    {
      admissionNo: "AD1234",
      rollNo: "5005",
      name: "Suhana",
      class: "VIII",
      section: "B",
      attendance: "Absent",
      notes: "Thunderstorm"
    },
    {
      admissionNo: "AD1234",
      rollNo: "3009",
      name: "Liza",
      class: "II",
      section: "B",
      attendance: "Holiday",
      notes: ""
    },
    {
      admissionNo: "AD1234",
      rollNo: "5012",
      name: "Jami",
      class: "IV",
      section: "B",
      attendance: "Present",
      notes: ""
    },
    {
      admissionNo: "AD1234",
      rollNo: "3007",
      name: "Jane",
      class: "V",
      section: "A",
      attendance: "Late",
      notes: ""
    },
    {
      admissionNo: "AD1234",
      rollNo: "5008",
      name: "Ryan",
      class: "II",
      section: "B",
      attendance: "Halfday",
      notes: ""
    },
    {
      admissionNo: "AD1234",
      rollNo: "3006",
      name: "Johan",
      class: "VI",
      section: "A",
      attendance: "Present",
      notes: ""
    },
    {
      admissionNo: "AD1234",
      rollNo: "5004",
      name: "Nawaz",
      class: "VII",
      section: "B",
      attendance: "Absent",
      notes: ""
    }
  ]);
  
  // Function to update student attendance
  const updateAttendance = (index: number, newStatus: string) => {
    const updatedStudents = [...students];
    updatedStudents[index] = {
      ...updatedStudents[index],
      attendance: newStatus
    };
    setStudents(updatedStudents);
  };

  // Filter dummy data based on search term and status
  const filteredStudents = students
    .filter(student => 
      (filterBy === 'all' || student.attendance === filterBy) &&
      (searchData === '' || 
        student.admissionNo.toLowerCase().includes(searchData.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchData.toLowerCase()) ||
        student.name.toLowerCase().includes(searchData.toLowerCase()) ||
        student.class.toLowerCase().includes(searchData.toLowerCase()) ||
        student.section.toLowerCase().includes(searchData.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === '-name') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  // Paginate data
  const paginatedStudents = filteredStudents.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredStudents.length / limit);

  // Function to handle submit action
  const handleSubmit = () => {
    console.log(`Submitting attendance data`, students);
    // This would typically submit the attendance data to the backend
  };

  // Get the actual index in the students array for each paginated student
  const getStudentIndex = (paginatedIndex: number) => {
    const student = paginatedStudents[paginatedIndex];
    return students.findIndex(s => 
      s.rollNo === student.rollNo && 
      s.name === student.name && 
      s.class === student.class && 
      s.section === student.section
    );
  };

  return (
    <div className="bg-white shadow-sm border rounded">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">Student Attendance List</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="border border-gray-200 py-1 px-3 rounded">
              <span className="text-sm text-gray-600">03/04/2025 - 03/10/2025</span>
            </div>
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">Filter</option>
                <option value="Present">Present</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
                <option value="Holiday">Holiday</option>
                <option value="Halfday">Halfday</option>
              </select>
              <Filter className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="name">Sort by A-Z</option>
              <option value="-name">Sort by Z-A</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border-b">
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
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 w-full">
              <th className="p-4 text-center">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Admission No
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Roll No
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Class
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Section
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Attendance
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Notes
              </th>
            </tr>
          </thead>
          {allStudents?.data?.data?.length > 0 && (
            <tbody className="text-sm font-medium text-gray-700">
              {allStudents?.data?.data?.map((student:any, index:number) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-center">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <span className="text-blue-600">{student.studentId}</span>
                  </td>
                  <td className="p-4">{student.roll}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 rounded-full overflow-hidden">
                        <Image 
                          src={require("@/assets/avatars/le.jpeg")}
                          alt={`${student.firstName} avatar`}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {student.firstName}
                    </div>
                  </td>
                  <td className="p-4">{student.class}</td>
                  <td className="p-4">{student.section}</td>
                  <td className="p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => updateAttendance(getStudentIndex(index), 'Present')}
                            className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                              student.attendance === 'Present' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'
                            }`}
                            aria-label="Mark as Present"
                          >
                            {student.attendance === 'Present' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </button>
                          <span className="text-xs text-gray-500">Present</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => updateAttendance(getStudentIndex(index), 'Late')}
                            className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                              student.attendance === 'Late' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'
                            }`}
                            aria-label="Mark as Late"
                          >
                            {student.attendance === 'Late' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </button>
                          <span className="text-xs text-gray-500">Late</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => updateAttendance(getStudentIndex(index), 'Absent')}
                            className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                              student.attendance === 'Absent' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'
                            }`}
                            aria-label="Mark as Absent"
                          >
                            {student.attendance === 'Absent' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </button>
                          <span className="text-xs text-gray-500">Absent</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => updateAttendance(getStudentIndex(index), 'Holiday')}
                            className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                              student.attendance === 'Holiday' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'
                            }`}
                            aria-label="Mark as Holiday"
                          >
                            {student.attendance === 'Holiday' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </button>
                          <span className="text-xs text-gray-500">Holiday</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => updateAttendance(getStudentIndex(index), 'Halfday')}
                            className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                              student.attendance === 'Halfday' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'
                            }`}
                            aria-label="Mark as Halfday"
                          >
                            {student.attendance === 'Halfday' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </button>
                          <span className="text-xs text-gray-500">Halfday</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <input 
                      type="text" 
                      placeholder="Enter" 
                      defaultValue={student.notes}
                      className="border border-gray-200 rounded px-2 py-1 text-sm w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {paginatedStudents.length === 0 && (
          <div className='h-40 flex items-center justify-center w-full'>No data found.</div>
        )}
      </div>

      <div className="flex justify-end p-4 border-t">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-50">Prev</button>
          <button className="px-3 py-1 bg-blue-600 rounded text-sm text-white">1</button>
          <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceTable;