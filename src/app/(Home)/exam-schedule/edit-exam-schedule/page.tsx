import React from 'react';
import UpdateExamScheduleForm from '@/components/ExamSchedule/Update Exam Schedule/UpdateExamSchedule';

// interface PageProps {
//     params: {
//       id: string; // Dynamic route parameter
//     };
//   }
  
  const page = ( ) => {
    // const { id } = params;
  
    // console.log(id); // Log the ID to verify
  

    return (
        <div>
            <UpdateExamScheduleForm />
        </div>
    );
};

export default page;