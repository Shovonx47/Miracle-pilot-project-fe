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
import { useGetSingleTeacherQuery } from '@/redux/api/Teacher/teacherApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { verifyToken } from '@/utils/verifyToken';
import { TUser } from '@/redux/features/Auth/authSlice';
import LoadingSpinner from '@/components/Loader';
import Link from 'next/link';

export default function TeacherDetailsPage() {

    const userToken = useSelector((state: RootState) => state?.auth?.token);

    // Get user role if token exists
    let email = "";
    if (userToken) {
        const userId = (verifyToken(userToken) as TUser);
        email = userId?.email ?? ""; // Fallback to empty string if no id found
    }

    const [activeTab, setActiveTab] = useState('details');
    const { data: singleTeacher, isLoading } = useGetSingleTeacherQuery(email)


    const profileData = {
        id: singleTeacher?.data?.teacherId,
        name: singleTeacher?.data?.firstName + " " + singleTeacher?.data?.lastName,
        profileImage: singleTeacher?.data?.profileImage,
        joinDate: singleTeacher?.data?.joiningDate,
        subject: singleTeacher?.data?.subject,
        gender: singleTeacher?.data?.gender,
        bloodGroup: singleTeacher?.data?.bloodGroup,
        languageKnown: singleTeacher?.data?.motherTongue,
        languages: ['Bangla', 'English']
    };
    


    const contactData = {
        phone: singleTeacher?.data?.contactNumber,
        email: singleTeacher?.data?.email,
        address: singleTeacher?.data?.presentAddress,
    };

    const profileDetailsData = {
        fatherName: singleTeacher?.data?.fatherName,
        motherName: singleTeacher?.data?.motherName,
        dob: singleTeacher?.data?.dateOfBirth,
        maritalStatus: singleTeacher?.data?.maritalStatus,
        qualification: singleTeacher?.data?.educationalQualification,
        category: singleTeacher?.data?.category,
    };

    const documentsData = [
        { name: singleTeacher?.data?.resume },
        { name: singleTeacher?.data?.joiningLetter },
    ];

    const addressesData = {
        current: singleTeacher?.data?.presentAddress,
        permanent: singleTeacher?.data?.permanentAddress
    };

    const BankProps = {
        name: singleTeacher?.data?.accountName,
        branch: singleTeacher?.data?.bankName,
        ifsc: singleTeacher?.data?.IFSCCode
    };

    const workDetailsData = {
        department: singleTeacher?.data?.subject,
        joiningDate: singleTeacher?.data?.joiningDate,
        status: singleTeacher?.data?.status,
        contractType: singleTeacher?.data?.contractType,
        shift: singleTeacher?.data?.workShift,
        location: singleTeacher?.data?.workLocation
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


    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="p-4 md:p-6 lg:p-10">

            {/* Main Content Section */}
            <div className="space-y-4 md:space-y-6">
                {/* Header and Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-headerText">Teacher Details</span>
                        <span className="text-dataText">Teacher / Teacher Details</span>
                    </div>
                    <div className="flex items-center space-x-4 cursor-pointer z-50">
                        <Link href={`/teacher/edit-teacher/${singleTeacher?.data?._id}`}>
                            <button
                                className="bg-[#506EE4] text-white px-4 py-2 rounded-sm hover:bg-[#4058c7] transition duration-300 ease-in-out"
                            >
                                Edit Teacher
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Two Column Layout that becomes single column on mobile */}
                <div className="flex flex-col md:flex-row">
                    {/* Left Column - Profile Information */}
                    <div className="w-full md:w-1/3 space-y-4">
                        <ProfileCard profileData={profileData}/>
                        <PrimaryContact contact={contactData} />
                        <IdNumber idNumber={singleTeacher?.data?.teacherId}/>
                        <HostelTransportInfo singleTeacher={singleTeacher?.data}/>
                    </div>

                    {/* Right Column - Tabs Section */}
                    <div className="w-full md:w-3/4 mt-8 md:-mt-14 md:-ml-12">
                        {/* Tabs Navigation - Scrollable on mobile */}
                        <div className="flex overflow-x-auto pb-2 md:overflow-visible">
                            <button
                                key="details"
                                onClick={() => setActiveTab('details')}
                                className={`px-4 md:px-6 py-2 md:py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'details'
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
                                className="px-4 md:px-6 py-2 md:py-3 text-sm font-medium border-transparent text-gray-500 cursor-not-allowed whitespace-nowrap"
                                disabled
                            >
                                Routine
                            </button>
                            <button
                                key="attendance"
                                onClick={() => setActiveTab('attendance')}
                                className="px-4 md:px-6 py-2 md:py-3 text-sm font-medium border-transparent text-gray-500 cursor-not-allowed whitespace-nowrap"
                                disabled
                            >
                                Leave & Attendance
                            </button>
                            <button
                                key="salary"
                                onClick={() => setActiveTab('salary')}
                                className="px-4 md:px-6 py-2 md:py-3 text-sm font-medium border-transparent text-gray-500 cursor-not-allowed whitespace-nowrap"
                                disabled
                            >
                                Salary
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-4 md:mt-0">
                            {activeTab === 'details' && (
                                <div className="w-full space-y-4 md:space-y-6">
                                    <ProfileDetails {...profileDetailsData} />
                                    
                                    {/* Documents and Address - full width on mobile, side by side on desktop */}
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                        <div className="w-full md:w-1/2">
                                            <Documents documents={documentsData} />
                                        </div>
                                        <div className="w-full md:w-1/2 mt-4 md:mt-0">
                                            <Address addresses={addressesData} />
                                        </div>
                                    </div>
                                    
                                    {/* Bank Details and Work Details - full width on mobile, side by side on desktop */}
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                        <div className="w-full md:w-1/2">
                                            <BankDetails bank={BankProps} />
                                        </div>
                                        <div className="w-full md:w-1/2 mt-4 md:mt-0">
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