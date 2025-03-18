"use client";
import React, { useState } from 'react';


interface HostelInfoProps {
  hostelName: string;
  roomNumber: string;

  route: string;
  vehicleNumber: string;
  pickupPoint: string;
}


interface SingleHotel {
  singleTeacher: HostelInfoProps
}

const HostelTransportInfo = ({ singleTeacher }: SingleHotel) => {
  const [activeTab, setActiveTab] = useState('Hostel');
  const tabs = ['Hostel', 'Transportation'];

  return (
    <div className="w-[318px] rounded-lg bg-white shadow-sm p-4">
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium ${tab === activeTab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-headerText hover:text-gray-700'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      {activeTab === 'Hostel' && (
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#FAFAFA] rounded-sm flex-shrink-0" />
            <div>
              <div className="text-headerText font-semibold">{singleTeacher?.hostelName} </div>
              <div className="flex items-center">
                <span className="text-blue-600">Room No :</span>
                <span className="text-blue-600 ml-1"> {singleTeacher?.roomNumber}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Transportation' && (
         <div className="space-y-2">
         <div className="flex items-center space-x-3">
           <div className="w-8 h-8 bg-[#FAFAFA] rounded-sm flex-shrink-0" />
           <div>
             <div className="text-headerText font-semibold">{singleTeacher?.route} </div>
             <div className="flex items-center">
               <span className="text-blue-600">Vehicle No :</span>
               <span className="text-blue-600 ml-1"> {singleTeacher?.vehicleNumber}</span>
             </div>
             <div className="flex items-center">
               <span className="text-blue-600">Pickup Point :</span>
               <span className="text-blue-600 ml-1"> {singleTeacher?.pickupPoint}</span>
             </div>
           </div>
         </div>
       </div>
      )}
    </div>
  );
};

export default HostelTransportInfo;