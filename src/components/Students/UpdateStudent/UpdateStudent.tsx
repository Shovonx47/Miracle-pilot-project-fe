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
import { useCreateStudentMutation, useGetSingleStudentQuery, useUpdateStudentMutation } from "@/redux/api/Student/studentApi";
import { toast } from "sonner";
import LoadingSpinner from "@/components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/redux/features/Auth/authSlice";



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

const UpdateStudentForm = () => {
    const id = "67cb18df53cc89c6e95d7307"


    const userToken = useSelector((state: RootState) => state?.auth?.token);
    
        // Get user role if token exists
        let email = "";
        if (userToken) {
            const userId = (verifyToken(userToken) as TUser);
            email = userId?.email ?? ""; // Fallback to empty string if no id found
        }


    const { control, handleSubmit, setValue, watch, trigger } = useForm({});

    const { data: singleStudent, isLoading, refetch } = useGetSingleStudentQuery(email)

    const [updateStudent, { isLoading: updateLoading }] = useUpdateStudentMutation()

    const onSubmit = async (data: any) => {
       
        // Upload files and update data
        const profileImage = await uploadFile(data.profileImage);
        const birthCertificate = await uploadFile(data.birthCertificate);
        const transferCertificate = await uploadFile(data.transferCertificate);

        data.profileImage = profileImage?.secure_url;
        data.birthCertificate = birthCertificate?.secure_url;
        data.transferCertificate = transferCertificate?.secure_url;


        try {

            const values = {
                id,
                data
            }

            const response = await updateStudent(values).unwrap();

            if (response.success) {
                toast.success(response.message);
                refetch()
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



    if (isLoading) {
        return <LoadingSpinner />
    }

    return (


        <form onSubmit={handleSubmit(onSubmit)}>
            {formSections.map((Component, index) => (
                <Component key={index} control={control} setValue={setValue} watch={watch} trigger={trigger} singleStudent={singleStudent} />
            ))}

            <div className="flex justify-end m-10">
                <Button
                    disabled={updateLoading}
                    variant="default" type="submit"> {updateLoading ? "Submitting..." : "Submit"} </Button>
            </div>
        </form>

    );
}

export default UpdateStudentForm