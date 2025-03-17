import React from 'react';
import Avatar from '@/assets/avatars/pe.png';

interface ProfileInfo {
  id: string;
  name: string;

  profileImage:string
  joinDate: string;
  subject: string;
  gender: string;
  bloodGroup: string;
  languageKnown: string;
  languages: string[];
}

interface ProfileDataProps {
  profileData: ProfileInfo;
}

const ProfileCard = ({ profileData }: ProfileDataProps) => {
   

  return (
    <div className="w-[318px] rounded-lg bg-white shadow-sm">
      {/* Header Section */}
      <div className="flex items-center gap-4 p-4 pb-6">
        <div className="h-12 w-12 overflow-hidden rounded-lg">
          <img
            src={profileData?.profileImage || Avatar.src}
            alt={profileData.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-md font-medium text-gray-900">{profileData.name}</h2>
          <p className="text-xs text-blue-600">{profileData.id}</p>
          <p className="text-xs text-gray-500">Joined : {profileData.joinDate}</p>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="border-t border-gray-100 px-4 py-3">
        <h3 className="mb-3 text-base font-medium text-black">Basic Information</h3>

        <div className="space-y-3">
          <InfoRow label={<span className="text-black">Subject</span>} value={profileData.subject} />
          <InfoRow label={<span className="text-black">Gender</span>} value={profileData.gender} />
          <InfoRow label={<span className="text-black">Blood Group</span>} value={profileData.bloodGroup} />
          
          <InfoRow label={<span className="text-black">Language Known</span>} value={profileData.languageKnown} />

          {/* Language Tags */}
          <div className="flex items-start gap-4">
            <span className="min-w-[128px] text-sm text-black">Language</span>
            <div className="flex flex-wrap gap-2">
              {profileData.languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded bg-gray-100 px-3 py-1 text-xs font-semibold text-black"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: React.ReactNode; value: string }) => (
  <div className="flex items-start gap-4">
    <span className="min-w-[128px] text-sm text-gray-600">{label}</span>
    <span className="text-sm text-gray-600">{value}</span>
  </div>
);

export default ProfileCard;