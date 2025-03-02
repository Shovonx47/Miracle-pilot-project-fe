"use client"
import BasicInformation from '@/components/student/BasicInformation';
import ParentsInformation from '@/components/student/ParentsInformation';
import Documents from '@/components/student/Documents';
import PrimaryContact from '@/components/student/PrimaryContact';
import Address from '@/components/student/Address';
import PreviousSchool from '@/components/student/PreviousSchool';
import BankDetails from '@/components/student/BankDetails';
import MedicalHistory from '@/components/student/MedicalHistory';
import SiblingInformation from '@/components/student/SiblingInformation';
import HostelTransportInfo from '@/components/student/HostelTransportInfo';
import OtherInfo from '@/components/student/OtherInfo';
import { IoSearchOutline } from "react-icons/io5";
import Avatar from '@/assets/avatars/3d_avatar_3.png';
import Link from 'next/link';
import { useGetSingleStudentQuery } from '@/redux/api/Student/studentApi';
import LoadingSpinner from '@/components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { verifyToken } from '@/utils/verifyToken';
import { TUser } from '@/redux/features/Auth/authSlice';


interface SiblingsDetailsProps {
    siblingName: string;
    class: string;
    section: string;
    gender: string;
    roll: string;
    motherTongue: string;
}


export default function StudentDetails() {
    const userToken = useSelector((state: RootState) => state?.auth?.token);

    // Get user role if token exists
    let email = "";
    if (userToken) {
        const userId = (verifyToken(userToken) as TUser);
        email = userId?.email ?? ""; // Fallback to empty string if no id found
    }

    // // Only make the query if `id` is valid



    const { data: singleStudent, isLoading } = useGetSingleStudentQuery( email );






    const studentData = singleStudent?.data

    const documentsData = [
        { name: studentData?.birthCertificate },
        { name: studentData?.transferCertificate || "No Transfer Certificate Provided" }, // Use fallback if not available
    ];
    

    const tabs = [
        'Student Details',
        'Leave & Attendance',
        'Fees',
        'Exam & Results',
        'Library'
    ];

    const contactData = {
        phone: studentData?.contactNumber,
        email: studentData?.email
    };

    const addressesData = {
        current: studentData?.presentAddress,
        permanent: studentData?.permanentAddress
    };

    const schoolData = {
        name: studentData?.previousSchoolName,
        address: studentData?.previousSchoolAddress
    };

    const bankData = {
        name: "City Bank",
        branch: "Jashore",
        ifsc: "CB15012015"
    };

    const medicalData = {
        allergies: "None",
        medications: "-"
    };






    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="p-6 md:p-8 lg:p-10">
            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative w-full md:w-2/5">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full max-w-full px-4 py-2 pr-10 bg-white border rounded-lg focus:outline-none focus:border-gray-400"
                    />
                    <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Rest of the component remains the same */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-headerText">Student Details</span>
                    <span className="text-dataText">Dashboard / Student</span>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#E9EDF4] text-gray-700 rounded">Login Details</button>
                    <Link href="/student/edit-student">
                        <button className="px-4 py-2 bg-[#48CB45] text-white rounded">Edit Student</button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
                <div className="space-y-6">
                    <BasicInformation student={{ ...studentData, avatar: Avatar.src }} />
                    <SiblingInformation siblings={singleStudent?.data?.siblings.map((sibling: SiblingsDetailsProps) => ({ ...sibling, avatar: Avatar.src }))} />
                    <HostelTransportInfo />
                </div>

                <div className="space-y-6">
                    <div className="mb-6">
                        <div className="flex space-x-6 border-b">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`pb-4 text-sm font-medium ${tab === 'Student Details'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-dataText hover:text-headerText'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ParentsInformation parents={{ ...studentData, avatar: Avatar.src }} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 shadow-sm">

                        <Documents documents={documentsData} />
                        <PrimaryContact contact={contactData} />
                        <Address addresses={addressesData} />
                    </div>

                    <PreviousSchool school={schoolData} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <BankDetails bank={bankData} />
                        <MedicalHistory medical={medicalData} />
                    </div>
                    <OtherInfo />
                </div>
            </div>
        </div>
    );
}