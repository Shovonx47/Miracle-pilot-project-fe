import UpdateTeacherForm from '@/components/Teacher/Update Teacher/UpdateTeacher';
import React from 'react';

interface PageProps {
  params: {
    id: string; // Dynamic route parameter
  };
}

const page = ({ params }: PageProps) => {
  const { id } = params;

  console.log(id); // Log the ID to verify


  return (
    <div>
      <UpdateTeacherForm id={id} />
    </div>
  );
};

export default page;