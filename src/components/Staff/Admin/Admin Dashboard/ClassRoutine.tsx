import React from 'react';
import Avatar from '@/assets/avatars/ne.png';

interface RoutineItem {
  month: string;
  year: string;
  progress: number;
  color: string;
  imageUrl: string;
}

const ClassRoutine = () => {
  const routineData: RoutineItem[] = [
    {
      month: 'Oct',
      year: '2025',
      progress: 75,
      color: 'bg-blue-500',
      imageUrl: Avatar.src
    },
    {
      month: 'Nov',
      year: '2025',
      progress: 85,
      color: 'bg-purple-500',
      imageUrl: Avatar.src
    },
    {
      month: 'Dec',
      year: '2025',
      progress: 80,
      color: 'bg-green-500',
      imageUrl: Avatar.src
    }
  ];

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Class Routine</h2>
        <button className="text-blue-600 text-sm hover:text-blue-700">Add New</button>
      </div>

      <div className="space-y-4">
        {routineData.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
          >
            <img
              src={item.imageUrl}
              alt="Profile"
              className="w-8 h-8 rounded object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-gray-600">
                  {item.month} {item.year}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassRoutine;