"use client";
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { useGetAllStudentsQuery } from '@/redux/api/Student/studentApi';
import { useAddAttendanceMutation } from '@/redux/api/Attendance/attendanceApi';
import LoadingSpinner from '@/components/Loader';

type StudentType = {
  _id: string;
  studentId: string;
  roll: string;
  firstName: string;
  lastName: string;
  class: string;
  section: string;
  profileImage: string;
};

const TeacherAttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const { data: allStudents, isLoading } = useGetAllStudentsQuery({
    page,
    limit,
    sort: 'roll',
    searchTerm: '',
    status: 'Active'
  });

  const [addAttendance, { isLoading: isSubmitting }] = useAddAttendanceMutation();

  useEffect(() => {
    if (allStudents?.data?.data && selectedClass) {
      // Filter students based on selected class
      const filteredStudents = allStudents.data.data.filter((student: StudentType) => 
        student.class === selectedClass
      );
      
      setAttendanceData(
        filteredStudents.map((student: StudentType) => ({
          user: {
            id: student._id,
            providedId: student.studentId,
            role: "student",
          },
          full_name: `${student.firstName} ${student.lastName || ''}`.trim(),
          designation: `${student.class} Student`,
          date: format(selectedDate, 'dd-MM-yyyy'),
          day: format(selectedDate, 'EEEE'),
          present: false,
          absent: false
        }))
      );
    }
  }, [allStudents?.data?.data, selectedDate, selectedClass]);

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

  const handleSubmit = async () => {
    try {
      const response = await addAttendance(attendanceData).unwrap();
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to record attendance');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl text-headerText">Student Attendance</h1>
          <p className="text-dataText">Mark attendance for your class</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="I">Class I</SelectItem>
            <SelectItem value="II">Class II</SelectItem>
            <SelectItem value="III">Class III</SelectItem>
            <SelectItem value="IV">Class IV</SelectItem>
            <SelectItem value="V">Class V</SelectItem>
            <SelectItem value="VI">Class VI</SelectItem>
            <SelectItem value="VII">Class VII</SelectItem>
            <SelectItem value="VIII">Class VIII</SelectItem>
            <SelectItem value="IX">Class IX</SelectItem>
            <SelectItem value="X">Class X</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedClass && attendanceData.length > 0 ? (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Student ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {allStudents?.data?.data?.map((student: StudentType) => {
                  const attendance = attendanceData.find(
                    (a) => a.user.providedId === student.studentId
                  );
                  return (
                    <tr key={student._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{student.studentId}</td>
                      <td className="px-6 py-4">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="px-6 py-4">{student.class}</td>
                      <td className="px-6 py-4">
                        <Select
                          value={attendance?.present ? 'present' : (attendance?.absent ? 'absent' : '')}
                          onValueChange={(value) => {
                            updateAttendance(student.studentId, 'present', value === 'present');
                            updateAttendance(student.studentId, 'absent', value === 'absent');
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
            </Button>
          </div>
        </div>
      ) : selectedClass && (
        <div className="p-6 text-center text-gray-500">
          No students found in Class {selectedClass}
        </div>
      )}
    </div>
  );
};

export default TeacherAttendanceManagement;