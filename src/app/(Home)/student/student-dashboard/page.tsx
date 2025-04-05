import React from 'react';
import { getDashboardStudent } from "@/redux/api/Student/dashboardStudentApi";
import { store } from "@/redux/store";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import the client component dynamically with SSR disabled to prevent hydration issues
const StudentDashboardContent = dynamic(
  () => import("@/components/Students/StudentsDashboard/StudentDashboardContent"),
  { ssr: false } // Disable SSR for this component to avoid hydration mismatches
);

// Fallback loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h2 className="text-xl font-semibold">Loading dashboard...</h2>
    </div>
  </div>
);

// This function runs on the server for SSR
async function fetchStudentData() {
  try {
    // Dispatch the action to the store and unwrap the result
    const result = await store.dispatch(getDashboardStudent.initiate(undefined));
    // Access the data from the fulfilled result
    return result.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
}

// This is a Server Component (by default in app directory)
export default async function StudentDashboard() {
  // Pre-fetch data on the server
  const studentData = await fetchStudentData();
  
  // Extract student data or default to null
  const student = studentData?.data?.data?.[0] || null;
  
  // Serialize the data to prevent hydration issues
  const serializedStudent = student ? JSON.parse(JSON.stringify(student)) : null;
  
  // Render the client component with the pre-fetched data wrapped in Suspense
  return (
    <Suspense fallback={<LoadingFallback />}>
      <StudentDashboardContent initialStudent={serializedStudent} />
    </Suspense>
  );
}