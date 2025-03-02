import UpdateStaffForm from '@/components/Staff/Update Staff/UpdateStaff';
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
            <UpdateStaffForm />
        </div>
    );
};

export default page;