'use client';
import Image from 'next/image';
import { useState } from 'react';
import PaymentModal from '../modals/PaymentModal';

interface StudentProps {
  student: {
    profileImage: string;
    status: string;
    firstName: string;
    lastName: string;
    
    studentId: string;
    gender: string;
    dateOfBirth: string;
    bloodGroup: string;
    religion: string;
    class: string;
    motherTongue: string;
  }
}

export default function BasicInformation({ student }: StudentProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const handlePayment = (amount: number) => {
    // Handle payment logic here
    console.log('Processing payment for amount:', amount);
    setIsPaymentModalOpen(false);
  };

  const studentInfo = {
    "Roll No": student?.studentId,
    "Gender": student?.gender,
    "Date Of Birth": student?.dateOfBirth,
    "Blood Group": student?.bloodGroup,
    "Religion": student?.religion,
    "Class": student?.class,
    "Mother tongue": student?.motherTongue,
    "Language": (
      <div className="flex gap-2">
        <span className="px-2 py-1 bg-gray-100 text-black rounded text-sm">Bangla</span>
        <span className="px-2 py-1 bg-gray-100 rounded text-black text-sm">English</span>
      </div>
    )
  };
  
  return (
    <>
      <div className="p-6">
        {/* Header with Image and Name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
            <Image
              src={student?.profileImage}
              alt={student?.firstName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{student?.firstName} {student?.lastName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-[#3D5EE1]">{student?.studentId}</span>
              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full">{student?.status}</span>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gray-200 -mx-6 mb-4"></div>
        
        {/* Basic Information Title */}
        <h3 className="font-bold text-gray-800 mb-4">Basic Information</h3>
        
        {/* Information Grid */}
        <div className="space-y-3 mb-6">
          {Object.entries(studentInfo).map(([key, value]) => (
            <div key={key} className="flex flex-row">
              <div className="w-1/3 text-gray-700 font-medium">{key}</div>
              <div className="w-2/3 text-gray-600">{value}</div>
            </div>
          ))}
        </div>
        
        {/* Add Fees Button */}
        <button 
          onClick={() => setIsPaymentModalOpen(true)}
          className="w-full bg-[#48CB45] text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Fees
        </button>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={handlePayment}
      />
    </>
  );
}