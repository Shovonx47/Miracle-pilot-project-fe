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
import PayrollInformation from "./_components/Payroll";
import BankAccountDetail from "./_components/BankAccountDetail";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCreatePendingRequestMutation } from "@/redux/api/PendingRequest/pendingRequestApi";
import { RequestType } from "@/types/pendingRequest";

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

const AddTeacherForm = () => {
    const { control, handleSubmit, setValue, watch, trigger, reset } = useForm({});
    const [createPendingRequest, { isLoading }] = useCreatePendingRequestMutation();
    const router = useRouter();

    // Get user data from localStorage if available
    useEffect(() => {
        const userData = localStorage.getItem('user_data');
        if (userData) {
            const parsedData = JSON.parse(userData);
            // Pre-fill form with user data if available
            setValue('firstName', parsedData.firstName);
            setValue('lastName', parsedData.lastName);
            setValue('email', parsedData.email);
            if (parsedData.userId) {
                setValue('userId', parsedData.userId);
            }
        }
    }, [setValue]);

    const onSubmit = async (data: any) => {
        console.log("Submitting teacher data:", data);

        // Ensure auth token is available
        const token = localStorage.getItem('auth_token');
        if (!token) {
            console.warn("No auth token found in localStorage");
            // Could redirect to login here or continue anyway
        }

        // Upload files and update data
        try {
            let profileImageUrl = null;
            let resumeUrl = null;
            let joiningLetterUrl = null;

            if (data.profileImage) {
                const profileImage = await uploadFile(data.profileImage);
                profileImageUrl = profileImage?.secure_url;
            }
            
            if (data.resume) {
                const resume = await uploadFile(data.resume);
                resumeUrl = resume?.secure_url;
            }
            
            if (data.joiningLetter) {
                const joiningLetter = await uploadFile(data.joiningLetter);
                joiningLetterUrl = joiningLetter?.secure_url;
            }

            data.profileImage = profileImageUrl;
            data.resume = resumeUrl;
            data.joiningLetter = joiningLetterUrl;

            console.log("Prepared data for API call:", data);
            
            // Create a pending request instead of directly creating a teacher
            const pendingRequestPayload = {
                requestType: RequestType.TEACHER,
                requestData: data,
                createdBy: data.userId || 'unknown'
            };

            const response = await createPendingRequest(pendingRequestPayload).unwrap();
            console.log("API response:", response);
            
            if (response.success) {
                toast.success("Your request has been submitted for approval!");
                // Clear localStorage data after successful submission
                localStorage.removeItem('user_data');
                // Redirect to home
                router.push('/');
            } else if (response.success === false && response.errorSources) {
                // Extract error messages from errorSources array
                const errorMessage = response.errorSources.map((err: any) => err.message).join(", ");
                toast.error(errorMessage);
                console.error("API error response:", response);
            }
        } catch (error: any) {
            console.error("Error submitting teacher data:", error);
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
                <Button disabled={isLoading} variant="default" type="submit"> {isLoading ? "Submitting..." : "Submit"} </Button>
            </div>
        </form>
    );
}

export default AddTeacherForm