export interface Student {
  _id: string;
  auth: string;
  attendance: any[];
  userId: string;
  studentId: string;
  profileImage: string;
  academicYear: string;
  admissionDate: string;
  status: string;
  category: string;
  firstName: string;
  lastName: string;
  previousClass: any[];
  previousClassRoll: any[];
  roll: string;
  class: string;
  section: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  religion: string;
  contactNumber: string;
  email: string;
  board: string;
  motherTongue: string;
  presentAddress: string;
  permanentAddress: string;
  siblings: any[];
  fatherName: string;
  fatherEmail: string;
  fatherContactNumber: string;
  fatherOccupation: string;
  fatherNidNumber: string;
  motherName: string;
  motherEmail: string;
  motherContactNumber: string;
  motherOccupation: string;
  motherNidNumber: string;
  localGuardianName: string;
  relationshipWithLocalGuardian: string;
  localGuardianEmail: string;
  localGuardianContactNumber: string;
  localGuardianOccupation: string;
  localGuardianNidNumber: string;
  route?: string;
  vehicleNumber?: string;
  pickupPoint?: string;
  hostelName?: string;
  roomNumber?: string;
  transferCertificate?: string;
  birthCertificate?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StudentApiResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number | null;
      limit: number | null;
      total: number;
      totalPage: number | null;
    };
    data: Student[];
  };
}