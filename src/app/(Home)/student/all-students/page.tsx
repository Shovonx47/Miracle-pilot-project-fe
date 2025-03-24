import React from 'react'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"; 
import AllStudentsTable from "@/components/Students/AllStudents/Tables/AllStudentsTable"; 
import Link from 'next/link';

export default function AllStudentsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText text-xl">All Students</span>
          <span className="text-dataText text-sm">Dashboard / Students</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-[180px] bg-gray-200">
                <SelectValue placeholder="Export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">Export as PDF</SelectItem>
                <SelectItem value="excel">Export as Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Link href="/student/add-student" className="w-full sm:w-auto">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto">
              Add Student
            </button>
          </Link>
        </div>
      </div>
      
      <AllStudentsTable />
    </div>
  );
}