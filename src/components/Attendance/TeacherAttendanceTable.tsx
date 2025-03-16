"use client";
import React, { useEffect,  useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { PaginationPage } from '@/components/Reusable/Pagination';
import Image from 'next/image';
import dayjs from "dayjs";
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { useAddAttendanceMutation } from '@/redux/api/Attendance/attendanceApi';
import { toast } from 'sonner';



type TeacherType = {
  _id: string;
  teacherId: string;
  subject: string;
  firstName: string;
  lastName: string;
  category: string;
  profileImage: string;
};


type PaginationDetails = {
  page: number;
  limit: number;
  totalPage: number
}

type TeacherDetailsProps = {
  allTeachers: { data?: { data?: TeacherType[], meta?: PaginationDetails } };
  filterBy: string;  // Defined filter options
  setFilterBy: (value: string) => void;  // Set filter handler
  sortBy: string;  // Sorting options (alphabetical)
  setSortBy: (value: string) => void;  // Set sort handler
  page: number;  // Current page number
  setPage: (value: number) => void;  // Set page handler
  limit: number;  // Number of records per page
  setLimit: (value: number) => void;  // Set limit handler

};



const TeacherAttendanceTable = ({ allTeachers, filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  page,
  setPage,
  limit,
  setLimit }: TeacherDetailsProps) => {

  const [attendance, { isLoading }] = useAddAttendanceMutation()

  const { control } = useForm();


  // Function to update Teacher attendance
  const teachers = allTeachers?.data?.data || [];

  // Optimized State for Attendance Management
  const [attendanceData, setAttendanceData] = useState<any[]>([]);

  useEffect(() => {
    setAttendanceData(
      teachers.map((teacher) => ({
        user: {
          id: teacher._id,
          providedId: teacher.teacherId,
          role: "teacher",
        },
        full_name: `${teacher.firstName} ${teacher.lastName || ''}`.trim(),
        designation: `${teacher.category} Teacher`,
        date: dayjs().format("DD-MM-YYYY"),
        present: false,
        absent: false,
        in_time: null,
        out_time: null,
      }))
    );
  }, [teachers]);

  // Handle Attendance Update
  const updateAttendance = (teacherId: string, field: string, value: boolean | string) => {
    setAttendanceData((prevData) =>
      prevData.map((entry) =>
        entry.user.providedId === teacherId
          ? {
            ...entry,
            [field]: value,
            ...(field === "present" && { absent: !value }), // Toggle absent if present is selected
            ...(field === "absent" && { present: !value }), // Toggle present if absent is selected
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
        // reset()
      } else if (response.success === false && response.errorSources) {
        // Extract error messages from errorSources array
        const errorMessage = response.errorSources.map((err: any) => err.message).join(", ");
        toast.error(errorMessage);
      }
    } catch (error: any) {
      let errorMessage = "Network error, please try again!";

      // Check if error contains data with specific error messages
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
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">Teacher Attendance List</h1>
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
              <option value="teacherId">Sort by A-Z</option>
              <option value="-teacherId">Sort by Z-A</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      <div>
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
            onClick={onSubmit}
            className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit"}
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
                 Id
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Subject Name
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Category
                </th>
                
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Attendance
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Time
                </th>
              </tr>
            </thead>
            {teachers?.length > 0 && (
              <tbody className="text-sm font-medium text-gray-700">
                {teachers.map((teacher) => {
                  const attendanceEntry = attendanceData.find(
                    (entry) => entry.user.providedId === teacher.teacherId
                  );

                  return (
                    <tr key={teacher.teacherId} className="border-t hover:bg-gray-50">
                      <td className="p-4 text-center">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="p-4">
                        <span className="text-blue-600">{teacher.teacherId}</span>
                      </td>
                      <td className="p-4">{teacher.subject}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-3 rounded-full overflow-hidden">
                            <Image
                              src={teacher?.profileImage}
                              alt={`${teacher.firstName} avatar`}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {teacher.firstName}
                        </div>
                      </td>
                      <td className="p-4">{teacher.category}</td>
                      
                      <td className="p-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-4">
                            {/* Present Button */}
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() =>
                                  updateAttendance(teacher.teacherId, "present", !attendanceEntry?.present)
                                }
                                className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${attendanceEntry?.present
                                  ? "bg-blue-500 text-white"
                                  : "bg-white border border-gray-300 hover:bg-gray-100"
                                  }`}
                                aria-label="Mark as Present"
                              >
                                {attendanceEntry?.present && <div className="w-2 h-2 bg-white rounded-full"></div>}
                              </button>
                              <span className="text-xs text-gray-500">Present</span>
                            </div>

                            {/* Absent Button */}
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() =>
                                  updateAttendance(teacher.teacherId, "absent", !attendanceEntry?.absent)
                                }
                                className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${attendanceEntry?.absent
                                  ? "bg-blue-500 text-white"
                                  : "bg-white border border-gray-300 hover:bg-gray-100"
                                  }`}
                                aria-label="Mark as Absent"
                              >
                                {attendanceEntry?.absent && <div className="w-2 h-2 bg-white rounded-full"></div>}
                              </button>
                              <span className="text-xs text-gray-500">Absent</span>
                            </div>
                          </div>


                        </div>
                      </td>
                      <td className="p-2 flex space-x-2">
                        {/* In Time Input */}
                        <Controller
                          name={`attendance.${teacher.teacherId}.in_time`}
                          control={control}
                          render={({ field }) => (
                            <div>
                              <label className="text-sm text-gray-600">In Time</label>
                              <Input
                                type="time"
                                {...field}
                                value={attendanceData.find(entry => entry.user.providedId === teacher.teacherId)?.in_time || ""}
                                onChange={(e) => updateAttendance(teacher.teacherId, "in_time", e.target.value)}
                              />
                            </div>
                          )}
                        />

                        {/* Out Time Input */}
                        <Controller
                          name={`attendance.${teacher.teacherId}.out_time`}
                          control={control}
                          // rules={{ required: "Out Time is required" }}
                          render={({ field }) => (
                            <div>
                              <label className="text-sm text-gray-600">Out Time</label>
                              <Input
                                type="time"
                                {...field}
                                value={attendanceData.find(entry => entry.user.providedId === teacher.teacherId)?.out_time || ""}
                                onChange={(e) => updateAttendance(teacher.teacherId, "out_time", e.target.value)}
                              />
                            </div>
                          )}
                        />
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            )}
          </table>
          {teachers.length === 0 && (
            <div className='h-40 flex items-center justify-center w-full'>No data found.</div>
          )}
        </div>
      </div>

      <div className="flex justify-end p-4 border-t">
        <div className='flex items-center'>
          <PaginationPage totalPages={allTeachers?.data?.meta?.totalPage as number} page={page} setPage={setPage} />
        </div>

      </div>
    </div>
  );
};

export default TeacherAttendanceTable;
