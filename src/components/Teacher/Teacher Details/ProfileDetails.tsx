import React from 'react';

interface ProfileDetailsProps {
  fatherName: string;
  motherName: string;
  dob: string;
  maritalStatus: string;
  qualification: string;
  category: string;

}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  fatherName,
  motherName,
  dob,
  maritalStatus,
  qualification,
  category
}) => {
  return (
    <div className="w-full bg-white">
      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-800">Profile Details</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {/* First Row */}
            <div>
              <h3 className="text-sm font-medium text-[#202C4B] mb-1">Father's Name</h3>
              <p className="text-gray-600 text-xs">{fatherName}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[#202C4B] mb-1">Mother Name</h3>
              <p className="text-gray-600 text-xs">{motherName}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[#202C4B] mb-1">DOB</h3>
              <p className="text-gray-600 text-xs">{dob}</p>
            </div>
            
            {/* Second Row */}
            <div>
              <h3 className="text-sm font-medium text-[#202C4B] mb-1">Martial Status</h3>
              <p className="text-gray-600 text-xs">{maritalStatus}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[#202C4B] mb-1">Qualification</h3>
              <p className="text-gray-600 text-xs">{qualification}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[#202C4B] mb-1">Category</h3>
              <p className="text-gray-600 text-xs">{category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;