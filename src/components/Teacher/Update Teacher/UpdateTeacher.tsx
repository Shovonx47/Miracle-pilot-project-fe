"use client";
import { useForm } from "react-hook-form";
import PersonalInfo from "./_components/PersonalInfo";
import ParentsAndGuardianInformation from "./_components/Parents&GuardianInformation";
import Address from "./_components/Address";
import TransportInformation from "./_components/TransportInformation";
import PreviousSchoolDetails from "./_components/PreviousSchoolDetails";
import { Button } from "../../ui/button";
import HostelInformation from "./_components/HostelInformation";
import Documents from "./_components/Documents";
import uploadFile from "@/Helper/uploadFile";
import { toast } from "sonner";
import LoadingSpinner from "@/components/Loader";
import { useGetSingleTeacherQuery, useUpdateTeacherMutation } from "@/redux/api/Teacher/teacherApi";
import PayrollInformation from "./_components/Payroll";
import BankAccountDetail from "./_components/BankAccountDetail";



const formSections = [
    PersonalInfo,
    PayrollInformation,
    ParentsAndGuardianInformation,
    Address,
    BankAccountDetail,
    TransportInformation,
    HostelInformation,
    PreviousSchoolDetails,
    Documents
];


interface UpdateTeacherFormProps {
    id: string;
}

const UpdateTeacherForm: React.FC<UpdateTeacherFormProps> = ({ id }) => {
    // const id = "67a6fd840b1e4a0655e440cb"

    const { control, handleSubmit, setValue, watch, trigger } = useForm({});

    const { data: singleTeacher, isLoading, refetch } = useGetSingleTeacherQuery(id)

    const [updateTeacher, { isLoading: updateLoading }] = useUpdateTeacherMutation()

    const onSubmit = async (data: any) => {

        // Upload files and update data
        const profileImage = await uploadFile(data.profileImage);
        const resume = await uploadFile(data.resume);
        const joiningLetter = await uploadFile(data.joiningLetter);

        data.profileImage = profileImage?.secure_url;
        data.resume = resume?.secure_url;
        data.joiningLetter = joiningLetter?.secure_url;


        try {

            const values = {
                id,
                data
            }

            const response = await updateTeacher(values).unwrap();

            console.log(response)

            if (response.success) {
                toast.success(response.message);
                refetch()
            } else if (response.success === false && response.errorSources) {
                // Extract error messages from errorSources array
                const errorMessage = response.errorSources.map((err: any) => err.message).join(", ");
                toast.error(errorMessage);
            }
        } catch (error: any) {
            console.log(error)
            let errorMessage = "Network error, please try again!";

            // Check if error contains data with specific error messages
            if (error?.data?.errorSources) {
                errorMessage = error.data.errorSources.map((err: any) => err.message).join(", ");
            } else if (error?.data?.message) {
                errorMessage = error.data.message;
            }

            toast.error(errorMessage);
        }
    };



    if (isLoading) {
        return <LoadingSpinner />
    }

    return (


        <form onSubmit={handleSubmit(onSubmit)}>
            {formSections.map((Component, index) => (
                <Component key={index} control={control} setValue={setValue} watch={watch} trigger={trigger} singleTeacher={singleTeacher} />
            ))}

            <div className="flex justify-end m-10">
                <Button
                    disabled={updateLoading}
                    variant="default" type="submit">
                    {
                        updateLoading ? "Submitting..." :
                            "Submit"
                    } </Button>
            </div>
        </form>

    );
}

export default UpdateTeacherForm