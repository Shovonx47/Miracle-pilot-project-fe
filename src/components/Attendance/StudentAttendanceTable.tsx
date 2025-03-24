"use client";
import React, { useEffect, useState } from 'react';
import { ChevronDown, Filter, Calendar } from 'lucide-react';
import { PaginationPage } from '@/components/Reusable/Pagination';
import Image from 'next/image';
import dayjs from "dayjs";
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { useAddAttendanceMutation } from '@/redux/api/Attendance/attendanceApi';
import { toast } from 'sonner';

type StudentType = {
  _id: string;
  studentId: string;
  roll: string;
  firstName: string;
  lastName: string;
  class: string;
  section: string;
  profileImage: string;
  notes: string;
};

type PaginationDetails = {
  page: number;
  limit: number;
  totalPage: number
}

type StudentDetailsProps = {
  allStudents: { data?: { data?: StudentType[], meta?: PaginationDetails } };
  filterBy: string;  // Defined filter options
  setFilterBy: (value: string) => void;  // Set filter handler
  sortBy: string;  // Sorting options (alphabetical)
  setSortBy: (value: string) => void;  // Set sort handler
  page: number;  // Current page number
  setPage: (value: number) => void;  // Set page handler
  limit: number;  // Number of records per page
  setLimit: (value: number) => void;  // Set limit handler
};

const StudentAttendanceTable = ({ 
  allStudents, 
  filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  page,
  setPage,
  limit,
  setLimit 
}: StudentDetailsProps) => {

  const [attendance, { isLoading }] = useAddAttendanceMutation();
  const { control } = useForm();
  const students = allStudents?.data?.data || [];
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setAttendanceData(
      students.map((student) => ({
        user: {
          id: student._id,
          providedId: student.studentId,
          role: "student",
        },
        full_name: `${student.firstName} ${student.lastName || ''}`.trim(),
        designation: `${student.class} Student`,
        date: dayjs().format("DD-MM-YYYY"),
        present: false,
        absent: false,
        in_time: null,
        out_time: null,
      }))
    );
  }, [students]);

  // Handle Attendance Update
  const updateAttendance = (studentId: string, field: string, value: boolean | string) => {
    setAttendanceData((prevData) =>
      prevData.map((entry) =>
        entry.user.providedId === studentId
          ? {
            ...entry,
            [field]: value,
            ...(field === "present" && { absent: !value }),
            ...(field === "absent" && { present: !value }),
          }
          : entry
      )
    );
  };

  const onSubmit = async () => {
    try {
      const response = await attendance(attendanceData).unwrap();
   
      if (response.success) {
        toast.success(response.message);
      } else if (response.success === false && response.errorSources) {
        const errorMessage = response.errorSources.map((err: any) => err.message).join(", ");
        toast.error(errorMessage);
      }
    } catch (error: any) {
      let errorMessage = "Network error, please try again!";

      if (error?.data?.errorSources) {
        errorMessage = error.data.errorSources.map((err: any) => err.message).join(", ");
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white shadow-sm border rounded">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b space-y-3 sm:space-y-0">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Student Attendance List</h1>
        
        {/* Mobile toggle for filters */}
        <button 
          className="sm:hidden flex items-center gap-1 text-sm border px-3 py-1 rounded"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </button>
        
        <div className={`${showFilters ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto`}>
          {/* Date range - hidden on mobile as requested */}
          <div className="hidden sm:block border border-gray-200 py-1 px-3 rounded">
            <span className="text-sm text-gray-600">03/04/2025 - 03/10/2025</span>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
          
          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="roll">Sort by A-Z</option>
              <option value="-roll">Sort by Z-A</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b space-y-3 sm:space-y-0">
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
          <button
            onClick={onSubmit}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 w-full">
                <th className="p-3 sm:p-4 text-center">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="p-3 sm:p-4 text-left text-sm font-semibold text-gray-600">
                  Admission No
                </th>
                <th className="p-3 sm:p-4 text-left text-sm font-semibold text-gray-600">
                  Roll No
                </th>
                <th className="p-3 sm:p-4 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="p-3 sm:p-4 text-left text-sm font-semibold text-gray-600">
                  Class
                </th>
                <th className="p-3 sm:p-4 text-left text-sm font-semibold text-gray-600">
                  Section
                </th>
                <th className="p-3 sm:p-4 text-left text-sm font-semibold text-gray-600">
                  Attendance
                </th>
                <th className="p-3 sm:p-4 text-left text-sm font-semibold text-gray-600">
                  Time
                </th>
              </tr>
            </thead>
            {students?.length > 0 && (
              <tbody className="text-sm font-medium text-gray-700">
                {students.map((student) => {
                  const attendanceEntry = attendanceData.find(
                    (entry) => entry.user.providedId === student.studentId
                  );

                  return (
                    <tr key={student.studentId} className="border-t hover:bg-gray-50">
                      <td className="p-3 sm:p-4 text-center">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="text-blue-600">{student.studentId}</span>
                      </td>
                      <td className="p-3 sm:p-4">{student.roll}</td>
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 rounded-full overflow-hidden">
                            <Image
                              src={student?.profileImage}
                              alt={`${student.firstName} avatar`}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {student.firstName}
                        </div>
                      </td>
                      <td className="p-3 sm:p-4">{student.class}</td>
                      <td className="p-3 sm:p-4">{student.section}</td>
                      <td className="p-3 sm:p-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            {/* Present Button */}
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() =>
                                  updateAttendance(student.studentId, "present", !attendanceEntry?.present)
                                }
                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center cursor-pointer ${attendanceEntry?.present
                                  ? "bg-blue-500 text-white"
                                  : "bg-white border border-gray-300 hover:bg-gray-100"
                                  }`}
                                aria-label="Mark as Present"
                              >
                                {attendanceEntry?.present && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>}
                              </button>
                              <span className="text-xs text-gray-500">Present</span>
                            </div>

                            {/* Absent Button */}
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() =>
                                  updateAttendance(student.studentId, "absent", !attendanceEntry?.absent)
                                }
                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center cursor-pointer ${attendanceEntry?.absent
                                  ? "bg-blue-500 text-white"
                                  : "bg-white border border-gray-300 hover:bg-gray-100"
                                  }`}
                                aria-label="Mark as Absent"
                              >
                                {attendanceEntry?.absent && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>}
                              </button>
                              <span className="text-xs text-gray-500">Absent</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3">
                        <div className="flex flex-col sm:flex-row gap-2">
                          {/* In Time Input */}
                          <Controller
                            name={`attendance.${student.studentId}.in_time`}
                            control={control}
                            render={({ field }) => (
                              <div className="w-20 sm:w-24">
                                <label className="text-xs sm:text-sm text-gray-600">In Time</label>
                                <Input
                                  type="time"
                                  {...field}
                                  className="h-8 text-xs px-1"
                                  value={attendanceData.find(entry => entry.user.providedId === student.studentId)?.in_time || ""}
                                  onChange={(e) => updateAttendance(student.studentId, "in_time", e.target.value)}
                                />
                              </div>
                            )}
                          />

                          {/* Out Time Input */}
                          <Controller
                            name={`attendance.${student.studentId}.out_time`}
                            control={control}
                            render={({ field }) => (
                              <div className="w-20 sm:w-24">
                                <label className="text-xs sm:text-sm text-gray-600">Out Time</label>
                                <Input
                                  type="time"
                                  {...field}
                                  className="h-8 text-xs px-1"
                                  value={attendanceData.find(entry => entry.user.providedId === student.studentId)?.out_time || ""}
                                  onChange={(e) => updateAttendance(student.studentId, "out_time", e.target.value)}
                                />
                              </div>
                            )}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          {students.length === 0 && (
            <div className='h-40 flex items-center justify-center w-full'>No data found.</div>
          )}
        </div>
      </div>

      <div className="flex justify-center sm:justify-end p-3 sm:p-4 border-t">
        <div className='flex items-center'>
          <PaginationPage totalPages={allStudents?.data?.meta?.totalPage as number} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceTable;