
import Image from "next/image";
import Link from "next/link";

interface TeacherProfile {
  _id: string;
  teacherId: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

interface TeacherProfileResponse {
  data: TeacherProfile;
}

interface ProfileCardProps {
  singleTeacher: TeacherProfileResponse;
}

const ProfileCard = ({ singleTeacher }: ProfileCardProps) => {
  return (
    <div className="bg-[#1A1C46] text-white p-6 rounded-lg w-full max-w-md">
      <div className="flex flex-col gap-4">
        {/* Top section with avatar, basic info, and edit button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image 
                src={singleTeacher?.data?.profileImage}
                alt="Teacher"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <div>
              <div className="text-xs text-[#3D5EE1] mb-1">
                {singleTeacher?.data?.teacherId}
              </div>
              <h3 className="text-lg font-semibold">
                {singleTeacher?.data?.firstName} {singleTeacher?.data?.lastName}
              </h3>
            </div>
          </div>
          <Link href={`/teacher/edit-teacher/${singleTeacher?.data?._id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
