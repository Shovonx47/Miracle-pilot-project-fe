'use client';

import React from 'react';
import { Suspense } from 'react';
import BasicInformation from './BasicInformation';
import Address from './Address';
import BankDetails from './BankDetails';
import ParentsInformation from './ParentsInformation';
import PrimaryContact from './PrimaryContact';
import HostelTransportInfo from './HostelTransportInfo';
import Documents from './Documents';
import OtherInfo from './OtherInfo';
import MedicalHistory from './MedicalHistory';
import SiblingInformation from './SiblingInformation';
import PreviousSchool from './PreviousSchool';
import { Card } from '../ui/card';
import { useGetCurrentStudentQuery } from '@/redux/api/Student/currentStudentApi';
import { Student } from '@/types/student';
import LoadingSpinner from '@/components/Loader';

// Helper function to map API data to component props
const mapStudentDataToComponentProps = (student: Student) => {
  return {
    studentId: student.studentId,
    firstName: student.firstName,
    lastName: student.lastName,
    gender: student.gender,
    dateOfBirth: student.dateOfBirth,
    bloodGroup: student.bloodGroup,
    religion: student.religion,
    class: student.class,
    motherTongue: student.motherTongue,
    status: student.status,
    profileImage: student.profileImage,
    
    // Address component data
    addresses: {
      current: student.presentAddress,
      permanent: student.permanentAddress
    },

    // Bank details component data - This is a placeholder as the API doesn't provide bank details
    bank: {
      name: "N/A",
      branch: "N/A",
      ifsc: "N/A"
    },

    // Parents information component data
    parents: {
      fatherName: student.fatherName,
      fatherEmail: student.fatherEmail,
      fatherContactNumber: student.fatherContactNumber,
      fatherOccupation: student.fatherOccupation,
      fatherNidNumber: student.fatherNidNumber,

      motherName: student.motherName,
      motherEmail: student.motherEmail,
      motherContactNumber: student.motherContactNumber,
      motherOccupation: student.motherOccupation,
      motherNidNumber: student.motherNidNumber,

      localGuardianName: student.localGuardianName,
      relationshipWithLocalGuardian: student.relationshipWithLocalGuardian,
      localGuardianEmail: student.localGuardianEmail,
      localGuardianContactNumber: student.localGuardianContactNumber,
      localGuardianOccupation: student.localGuardianOccupation,
      localGuardianNidNumber: student.localGuardianNidNumber
    },

    // Primary contact component data
    contact: {
      phone: student.contactNumber,
      email: student.email
    },

    // Medical history component data - This is a placeholder as the API doesn't provide medical history
    medical: {
      allergies: "N/A",
      medications: "N/A"
    },

    // Sibling information component data
    siblings: student.siblings.length > 0 ? student.siblings : [],

    // Previous school component data - This is a placeholder as the API doesn't provide previous school details
    school: {
      name: "N/A",
      address: "N/A"
    },

    // Documents component data
    documents: [
      student.birthCertificate ? { name: student.birthCertificate } : null,
      student.transferCertificate ? { name: student.transferCertificate } : null
    ].filter(Boolean)
  };
};

export default function StudentDetails() {
  // Fetch the current student's data from the API
  const { data: studentApiResponse, isLoading, error } = useGetCurrentStudentQuery();

  // Handle loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
        <div className="text-center py-10 bg-white rounded-lg shadow-md text-red-500">
          Error loading student details. Please try again later.
        </div>
      </div>
    );
  }

  // Check if we have student data
  if (!studentApiResponse?.data?.data?.[0]) {
    return (
      <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          No student data found. Please contact support.
        </div>
      </div>
    );
  }

  // Map the API response to the component props
  const student = mapStudentDataToComponentProps(studentApiResponse.data.data[0]);

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Profile</h1>
      
      <Suspense fallback={<div className="text-center py-10 bg-white rounded-lg shadow-md">Loading student details...</div>}>
        <div className="space-y-6">
          {/* Three column grid for other components */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Basic Information and related components */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <BasicInformation student={student} />
              </Card>
              
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <div className="p-6">
                  <SiblingInformation siblings={student.siblings} />
                </div>
              </Card>
              
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <div className="p-6">
                  <HostelTransportInfo />
                </div>
              </Card>
            </div>
            
            {/* Middle column - Other components */}
            <div className="lg:col-span-1 space-y-6">              
              <div className="grid grid-cols-1 gap-6">
                <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                  <div className="p-6">
                    <Documents documents={student.documents as { name: string }[]} />
                  </div>
                </Card>
                
                <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                  <div className="p-6">
                    <PreviousSchool school={student.school} />
                  </div>
                </Card>
              </div>
              
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <div className="p-6">
                  <BankDetails bank={student.bank} />
                </div>
              </Card>
            </div>
            
            {/* Right column - Address and other components */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <div className="p-6">
                  <Address addresses={student.addresses} />
                </div>
              </Card>
              
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <div className="p-6">
                  <PrimaryContact contact={student.contact} />
                </div>
              </Card>
              
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <div className="p-6">
                  <MedicalHistory medical={student.medical} />
                </div>
              </Card>
            </div>
          </div>
          
          {/* Parents Information - Full width row */}
          <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <div className="p-6">
              <ParentsInformation parents={student.parents} />
            </div>
          </Card>
          
          {/* Other Info - Full width row at the bottom of the page */}
          <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <div className="p-6">
              <OtherInfo />
            </div>
          </Card>
        </div>
      </Suspense>
    </div>
  );
}