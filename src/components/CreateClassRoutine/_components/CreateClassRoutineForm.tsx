"use client";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import CreateClassRoutine from "./CreateClassRoutine";
import { useCreateClassRoutineMutation } from "@/redux/api/Class-routine/classRoutineApi";

interface CreateClassRoutineFormProps {
    teacherNames: string[];
}

const CreateClassRoutineForm = ({ teacherNames }: CreateClassRoutineFormProps) => {
    const { control, handleSubmit, setValue, watch, trigger, reset } = useForm({});
    const [createClassRoutine, { isLoading }] = useCreateClassRoutineMutation();

    const onSubmit = async (data: any) => {
        try {
            const response = await createClassRoutine(data).unwrap();
            if (response.success) {
                toast.success(response.message);
                reset();
            } else if (response.success === false && response.errorSources) {
                const errorMessage = response.errorSources.map((err: any) => err.message).join(", ");
                toast.error(errorMessage);
            }
        } catch (error: any) {
            let errorMessage = "Network error, please try again!";
            if (error?.data?.errorSources) {
                errorMessage = error.data.errorSources.map((err: any) => err.message).join(", ");
            } else if (error?.data?.message) {
                errorMessage = error.data.message;
            }
            toast.error(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CreateClassRoutine
                control={control}
                setValue={setValue}
                watch={watch}
                trigger={trigger}
                teacherNames={teacherNames}
            />
            <div className="flex justify-end">
                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Creating..." : "Create Class Routine"}
                </Button>
            </div>
        </form>
    );
};

export default CreateClassRoutineForm; 