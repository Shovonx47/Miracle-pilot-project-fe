"use client";
import { useForm } from "react-hook-form";
import PersonalInfo from "./_components/PersonalInfo";
import ParentsAndGuardianInformation from "./_components/Parents&GuardianInformation";
import Siblings from "./_components/Siblings";
import Address from "./_components/Address";
import TransportInformation from "./_components/TransportInformation";
import PreviousSchoolDetails from "./_components/PreviousSchoolDetails";
import { Button } from "../../ui/button";
import HostelInformation from "./_components/HostelInformation";
import Documents from "./_components/Documents";
import uploadFile from "@/Helper/uploadFile";
import { useCreateStudentMutation } from "@/redux/api/Student/studentApi";
import { toast } from "sonner";



const formSections = [
    PersonalInfo,
    ParentsAndGuardianInformation,
    Siblings,
    Address,
    TransportInformation,
    HostelInformation,
    PreviousSchoolDetails,
    Documents
];

const AddStudentForm = () => {
    const { control, handleSubmit, setValue, watch, trigger, reset } = useForm({});
    const [createStudent, { isLoading }] = useCreateStudentMutation()

    const onSubmit = async (data: any) => {

        // Upload files and update data
        const profileImage = await uploadFile(data.profileImage);
        const birthCertificate = await uploadFile(data.birthCertificate);
        const transferCertificate = await uploadFile(data.transferCertificate);

        data.profileImage = profileImage?.secure_url;
        data.birthCertificate = birthCertificate?.secure_url;
        data.transferCertificate = transferCertificate?.secure_url;

        try {
            const response = await createStudent(data).unwrap();

            if (response.success) {
                toast.success(response.message);
                reset()
            } else if (response.success === false && response.errorSources) {
                // Extract error messages from errorSources array
                const errorMessage = response.errorSources.map((err: any) => err.message).join(", ");
                toast.error(errorMessage);
            }
        } catch (error: any) {
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






    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            {formSections.map((Component, index) => (
                <Component key={index} control={control} setValue={setValue} watch={watch} trigger={trigger} />
            ))}

            <div className="flex justify-end m-10">
                <Button disabled={isLoading} variant="default" type="submit"> {isLoading ? " Submitting" : "Submit"} </Button>
            </div>
        </form>

    );
}

export default AddStudentForm