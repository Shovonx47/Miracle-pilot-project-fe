import React from "react";

interface AttendanceProps {
  singleTeacher: {
    data: {
      attendance: {
        _id: string;
        date: string;
        in_time: string | null;
        out_time: string | null;
        present: boolean;
        absent: boolean;
        late_status: boolean;
      }[];
    };
  };
}

const AttendanceCard = ({ singleTeacher }: AttendanceProps) => {
  const attendanceRecords = singleTeacher?.data?.attendance || [];

  // Get the current month's total days
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const totalDays = new Date(currentYear, currentMonth, 0).getDate();

  // Calculate statistics
  const present = attendanceRecords.filter((record) => record.present).length;
  const absent = attendanceRecords.filter((record) => record.absent).length;
  const late = attendanceRecords.filter((record) => record.late_status).length;

  // Function to get government holidays dynamically (static list for example)
  const getGovernmentHolidays = (year: number) => {
    const holidays2025 = [
      "25-12-2025", // Christmas Day
      "01-01-2025", // New Year's Day
      "14-04-2025", // Pohela Boishakh
      "21-04-2025", // Eid ul-Fitr
      "22-04-2025", // Eid ul-Fitr Holiday
      "06-10-2025", // Durga Puja
      // Add other government holidays for the year here
    ];

    const holidays2026 = [
      "01-01-2026", // New Year's Day
      "14-04-2026", // Pohela Boishakh
      "20-04-2026", // Eid ul-Fitr
      "21-04-2026", // Eid ul-Fitr Holiday
      // Add other holidays for 2026
    ];

    // Return holidays based on the year
    return year === 2025 ? holidays2025 : holidays2026;
  };

  // Get the government holidays for the current year
  const governmentHolidays = getGovernmentHolidays(currentYear);

  // Function to format date as 'day-month-year'
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Get dates for the last 7 days (starting from today)
  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index)); // Adjust date to go back
    return formatDate(date); // Return date in 'day-month-year' format
  });

  // Count Fridays and Government Holidays in the last 7 days
  const fridayCount = last7Days.filter((date) => {
    const day = new Date(date.split("-").reverse().join("-")).getDay();
    return day === 5; // Friday
  }).length;

  const holidayCount = last7Days.filter((date) => governmentHolidays.includes(date)).length;

  // Calculate dynamic date range
  const endDate = last7Days[6]; // Today (last date)
  const startDate = last7Days[0]; // 6 days ago (first date)

  // Format the date range as '14 Mar 2025 - 21 Mar 2025'
  const dateRange = `${startDate} - ${endDate}`;

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Attendance</h2>
        <button className="flex items-center text-sm text-gray-600">
          This Month
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <div className="border-b border-gray-200 -mx-6 mb-4"></div>

      {/* Last 7 Days Calendar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Last 7 Days</span>
          <span className="text-sm text-gray-500">{dateRange}</span>
        </div>
        <div className="flex gap-1.5">
          {last7Days.map((date, index) => {
            const dayName = new Date(date.split("-").reverse().join("-")).toLocaleString("en", { weekday: "short" });
            const isPresent = attendanceRecords.some((record) => record.date === date && record.present);
            const isAbsent = attendanceRecords.some((record) => record.date === date && record.absent);
            const isHoliday = governmentHolidays.includes(date);
            const isFriday = new Date(date.split("-").reverse().join("-")).getDay() === 5; // Check if it's a Friday

            // Determine the background color for the day
            let dayColor = "";
            if (isFriday || isHoliday) {
              dayColor = "bg-black"; // Black for Fridays and holidays
            } else if (isPresent) {
              dayColor = "bg-green-500"; // Green for present
            } else if (isAbsent) {
              dayColor = "bg-red-500"; // Red for absent
            } else {
              dayColor = "bg-gray-400"; // Default
            }

            return (
              <div
                key={index}
                className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium text-white ${dayColor}`}
              >
                {dayName.charAt(0)} {/* Display first letter of the day (e.g., "M" for Monday) */}
              </div>
            );
          })}
        </div>
      </div>

      {/* Working Days Counter */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          No of total working days{" "}
          <span className="text-gray-900 font-medium">{totalDays} Days</span>
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center border border-gray-300 rounded-lg p-3">
          <div className="text-sm text-gray-500 mb-1">Present</div>
          <div className="text-2xl font-semibold text-gray-900">{present}</div>
        </div>
        <div className="text-center border border-gray-300 rounded-lg p-3">
          <div className="text-sm text-gray-500 mb-1">Absent</div>
          <div className="text-2xl font-semibold text-gray-900">{absent}</div>
        </div>
        <div className="text-center border border-gray-300 rounded-lg p-3">
          <div className="text-sm text-gray-500 mb-1">Late</div>
          <div className="text-2xl font-semibold text-gray-900">{late}</div>
        </div>
        <div className="text-center border border-gray-300 rounded-lg p-3">
          <div className="text-sm text-gray-500 mb-1">Holiday</div>
          <div className="text-2xl font-semibold text-gray-900">{fridayCount + holidayCount}</div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle cx="50" cy="50" r="40" stroke="#f0f0f0" strokeWidth="12" fill="none" />
          {/* Present (green) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#22c55e"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(present / totalDays) * 251.2} 251.2`}
          />
          {/* Late (blue) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#3b82f6"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(late / totalDays) * 251.2} 251.2`}
            strokeDashoffset={-((present / totalDays) * 251.2)}
          />
          {/* Absent (red) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#ef4444"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(absent / totalDays) * 251.2} 251.2`}
            strokeDashoffset={-(((present + late) / totalDays) * 251.2)}
          />
        </svg>
      </div>
    </div>
  );
};

export default AttendanceCard;

