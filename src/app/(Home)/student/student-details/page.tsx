import StudentDetails from '@/components/student/StudentDetails'
import { Suspense } from 'react'
import { store } from '@/redux/store'
import { getCurrentStudent } from '@/redux/api/Student/currentStudentApi'

// Server component for student details page with SSR data fetching
export default async function StudentDetailsPage() {
  // Pre-fetch the data on the server side
  // This will populate the Redux store with the data before rendering the client component
  await store.dispatch(getCurrentStudent.initiate())
  
  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <Suspense fallback={<div className="text-center py-10">Loading student details...</div>}>
        <StudentDetails />
      </Suspense>
    </main>
  )
}