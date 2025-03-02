import UpdateStudentForm from '@/components/Students/UpdateStudent/UpdateStudent';
import React from 'react';

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
            <UpdateStudentForm />
        </div>
    );
};

export default page;