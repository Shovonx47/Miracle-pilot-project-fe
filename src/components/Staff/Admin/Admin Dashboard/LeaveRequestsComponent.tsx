"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Avatar from '@/assets/avatars/ne.png';

interface LeaveRequest {
  id: string;
  name: string;
  role: string;
  leaveType: 'Emergency' | 'Casual' | 'Sick' | 'Annual';
  leaveDate: string;
  applyDate: string;
  profileImage: string;
}

const LeaveRequestsComponent: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      name: 'Zaman',
      role: 'Sports Teacher',
      leaveType: 'Emergency',
      leaveDate: '12-13 Feb',
      applyDate: '12 Feb',
      profileImage: Avatar.src,
    },
    {
      id: '2',
      name: 'Abrar',
      role: 'Accountant',
      leaveType: 'Casual',
      leaveDate: '12-13 Feb',
      applyDate: '12 Feb',
      profileImage: Avatar.src,
    }
  ];

  const getLeaveTypeColor = (type: string) => {
    switch(type) {
      case 'Emergency':
        return 'bg-red-50 text-red-500';
      case 'Casual':
        return 'bg-yellow-50 text-yellow-500';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Leave Requests</h2>
        <button 
          className="flex items-center text-gray-600 text-sm"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Today
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      <div className="space-y-3">
        {leaveRequests.map((request) => (
          <div key={request.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="relative mr-3">
                <img 
                  src={request.profileImage}
                  alt={request.name}
                  className="w-12 h-12 rounded-md"
                />
                
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="font-semibold text-gray-800">{request.name}</p>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded ${getLeaveTypeColor(request.leaveType)}`}>
                      {request.leaveType}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 bg-green-500 rounded-md w-6 h-6 flex items-center justify-center text-white">
                      ✓
                    </button>
                    <button className="p-1 bg-red-500 rounded-md w-6 h-6 flex items-center justify-center text-white">
                      ✕
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{request.role}</p>
              </div>
            </div>
            
            <div className="flex justify-between mt-3 text-sm text-gray-600">
              <div>
                <span className="font-medium">Leave : </span>
                <span>{request.leaveDate}</span>
              </div>
              <div>
                <span className="font-medium">Apply on : </span>
                <span>{request.applyDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequestsComponent;