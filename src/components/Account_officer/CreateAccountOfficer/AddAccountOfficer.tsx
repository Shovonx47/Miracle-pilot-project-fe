"use client";
import { useForm } from "react-hook-form";
import PersonalInfo from "./_components/PersonalInfo";
import ParentsAndGuardianInformation from "./_components/Parents&GuardianInformation";
import Address from "./_components/Address";
import TransportInformation from "./_components/TransportInformation";
import { Button } from "../../ui/button";
import HostelInformation from "./_components/HostelInformation";
import Documents from "./_components/Documents";
import uploadFile from "@/Helper/uploadFile";
import { toast } from "sonner";
import PayrollInformation from "./_components/Payroll";
import BankAccountDetail from "./_components/BankAccountDetail";
import { useCreatePendingRequestMutation } from "@/redux/api/PendingRequest/pendingRequestApi";
import { RequestType } from "@/types/pendingRequest";
import { useRouter } from "next/navigation";
import Experiences from "./_components/Experiences";

const formSections = [
    PersonalInfo,
    PayrollInformation,
    ParentsAndGuardianInformation,
    Address,
    BankAccountDetail,
    TransportInformation,
    HostelInformation,
    Experiences,
    Documents
];

const AddAccountantForm = () => {
    const { control, handleSubmit, setValue, watch, trigger, reset, getValues } = useForm({});
    const [createPendingRequest, { isLoading }] = useCreatePendingRequestMutation();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            // Upload files and update data
            const profileImage = await uploadFile(data.profileImage);
            const resume = await uploadFile(data.resume);
            const joiningLetter = await uploadFile(data.joiningLetter);

            data.profileImage = profileImage?.secure_url;
            data.resume = resume?.secure_url;
            data.joiningLetter = joiningLetter?.secure_url;

            // Create a pending request instead of directly creating an account officer
            const pendingRequestPayload = {
                requestType: RequestType.ACCOUNTANT,
                requestData: data,
                createdBy: data.userId || 'unknown'
            };

            const response = await createPendingRequest(pendingRequestPayload).unwrap();
     
            if (response.success) {
                toast.success("Your request has been submitted for approval!");
                reset();
                
                // Clear the localStorage data
                localStorage.removeItem('user_data');
                
                // Navigate to home page after successful submission
                router.push("/");
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
                <Component key={index} control={control} setValue={setValue} watch={watch} trigger={trigger} getValues={getValues}/>
            ))}

            <div className="flex justify-end m-10">
                <Button disabled={isLoading} variant="default" type="submit"> {isLoading ? " Submitting" : "Submit"} </Button>
            </div>
        </form>
    );
}

export default AddAccountantForm