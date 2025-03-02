"use client";
import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import ProfileCard from '@/components/Teacher/Teacher Details/ProfileCard';
import PrimaryContact from '@/components/Teacher/Teacher Details/PrimaryContact';
import IdNumber from '@/components/Teacher/Teacher Details/IdNumber';
import HostelTransportInfo from '@/components/Teacher/Teacher Details/HostelTransportInfo';
import ProfileDetails from '@/components/Teacher/Teacher Details/ProfileDetails';
import Documents from '@/components/Teacher/Teacher Details/Documents';
import Address from '@/components/Teacher/Teacher Details/Address';
import BankDetails from '@/components/Teacher/Teacher Details/BankDetails';
import WorkDetails from '@/components/Teacher/Teacher Details/WorkDetails';
import PreviousSchoolDetails from '@/components/Teacher/Teacher Details/PreviousSchoolDetails';
import SocialMedia from '@/components/Teacher/Teacher Details/SocialMedia';
import OtherInfo from '@/components/student/OtherInfo';

export default function Page() {
  const [activeTab, setActiveTab] = useState('details');
  
  const contactData = {
    phone: "123-456-7890",
    email: "teacher@example.com",
    address: "123 Main St, City, Country",
  };

  const profileDetailsData = {
    fatherName: "John Doe",
    motherName: "Jane Doe",
    dob: "2000-01-01",
    maritalStatus: "Single",
    qualification: "Bachelor of Education",
    experience: "5 years",
  };

  const documentsData = [
    { name: "Resume.pdf" },
    { name: "Certificate.pdf" },
  ];

  const addressesData = {
    current: "123 Main St, City, Country",
    permanent: "456 Work Ave, City, Country",
  };

  const BankProps = {
    name: "John Smith",
    branch: "Main Branch",
    ifsc: "EXBK0001234"
  };

  const workDetailsData = {
    department: "Science",
    designation: "Senior Teacher",
    joiningDate: "2020-01-15",
    employmentType: "Full-time",
    status: "Active",
    contractType: "Permanent",
    shift: "Morning",
    location: "Main Campus"
  };

  const socialMediaData = {
    Facebook: "Facebook",
    Twitter: "Twitter",
    LinkedIn: "LinkedIn",
    Youtube: "Youtube",
    Instagram: "Instagram"
  };

  const tabs = [
    { id: 'details', label: 'Teacher Details' },
    { id: 'routine', label: 'Routine' },
    { id: 'attendance', label: 'Leave & Attendance' },
    { id: 'salary', label: 'Salary' },
  ];

  return (
    <div className="p-6 md:p-8 lg:p-10">
      {/* Top Search and Academic Year Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full md:w-2/5">
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-full px-4 py-2 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="border border-gray-200 px-3 py-1 rounded-md flex items-center space-x-2 shadow-sm">
            <span className="text-sm text-gray-600">Academic Year :</span>
            <span className="text-sm font-medium">2025 / 2026</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center border border-gray-200 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div className="w-6 h-6 flex items-center justify-center border border-gray-200 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="space-y-6">
        {/* Header and Button */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-headerText">Teacher Details</span>
            <span className="text-dataText">Teacher / Teacher Details</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-[#506EE4] text-white px-4 py-2 rounded-sm hover:bg-[#4058c7]"
            >
              Edit Teacher
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex">
          {/* Left Column - Profile Information */}
          <div className="w-1/3 space-y-4">
            <ProfileCard />
            <PrimaryContact contact={contactData} />
            <IdNumber idNumber="0987654321" />
            <HostelTransportInfo/>
          </div>

          {/* Right Column - Tabs Section */}
          <div className="w-3/4 -mt-14 -ml-12">
            {/* Tabs Navigation */}
            <div className="flex mb-2">
              <button
                key="details"
                onClick={() => setActiveTab('details')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'border-[#506EE4] text-[#506EE4]'
                    : 'border-transparent text-gray-500 cursor-not-allowed'
                }`}
                disabled={activeTab !== 'details'}
              >
                Teacher Details
              </button>
              <button
                key="routine"
                onClick={() => setActiveTab('routine')}
                className="px-6 py-3 text-sm font-medium border-transparent text-gray-500 cursor-not-allowed"
                disabled
              >
                Routine
              </button>
              <button
                key="attendance"
                onClick={() => setActiveTab('attendance')}
                className="px-6 py-3 text-sm font-medium border-transparent text-gray-500 cursor-not-allowed"
                disabled
              >
                Leave & Attendance
              </button>
              <button
                key="salary"
                onClick={() => setActiveTab('salary')}
                className="px-6 py-3 text-sm font-medium border-transparent text-gray-500 cursor-not-allowed"
                disabled
              >
                Salary
              </button>
            </div>

            {/* Tab Content */}
            <div className="">
              {activeTab === 'details' && (
                <div className="w-full space-y-6">
                  <ProfileDetails {...profileDetailsData} />
                  {/* Documents and Address components side by side */}
                  <div className="flex gap-6">
                    <div className="w-1/2">
                      <Documents documents={documentsData} />
                    </div>
                    <div className="w-1/2">
                      <Address addresses={addressesData} />
                    </div>
                  </div>
                  {/* Bank Details and Work Details components side by side */}
                  <div className="flex gap-6">
                    <div className="w-1/2">
                      <BankDetails bank={BankProps} />
                    </div>
                    <div className="w-1/2">
                      <WorkDetails work={workDetailsData} />
                    </div>
                  </div>
                  <PreviousSchoolDetails />
                  <SocialMedia data={socialMediaData} />
                  <OtherInfo />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}