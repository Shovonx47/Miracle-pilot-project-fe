"use client";
import CreateClassRoutineForm from '@/components/CreateClassRoutine/_components/CreateClassRoutineForm';
import { useGetAllTeachersQuery } from '@/redux/api/Teacher/teacherApi';
import LoadingSpinner from '@/components/Loader';

const CreateClassRoutinePage = () => {
    const { data: teachersData, isLoading } = useGetAllTeachersQuery({ page: 1, limit: 100, sort: 'asc' });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const teacherNames = teachersData?.data?.map((teacher: any) => teacher.name) || [];

    return (
        <div className="p-6">
            <CreateClassRoutineForm teacherNames={teacherNames} />
        </div>
    );
};

export default CreateClassRoutinePage;