"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreatePendingRequestMutation } from "@/redux/api/PendingRequest/pendingRequestApi";
import { RequestType } from "@/types/pendingRequest";

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
    const { control, handleSubmit, setValue, watch, trigger, reset } = useForm<any>({
        defaultValues: {
            status: "Active",
            academicYear: new Date().getFullYear().toString(),
            admissionDate: new Date().toISOString().split('T')[0]
        }
    });
    const [createPendingRequest, { isLoading }] = useCreatePendingRequestMutation();
    const router = useRouter();

    // Load user data from localStorage when component mounts
    useEffect(() => {
        try {
            const userData = localStorage.getItem('user_data');
            if (userData) {
                const parsedData = JSON.parse(userData);
                
                // Pre-fill the form with the user data
                if (parsedData.firstName) setValue('firstName', parsedData.firstName);
                if (parsedData.lastName) setValue('lastName', parsedData.lastName);
                if (parsedData.email) setValue('email', parsedData.email);
                
                // Store userId to link with the student record
                setValue('userId', parsedData.userId);
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }, [setValue]);

    const onSubmit = async (data: any) => {
        try {
            // Get the auth token
            const token = localStorage.getItem('auth_token');
            console.log("Submitting data with fields:", Object.keys(data));
            
            // Set default empty strings instead of null for file fields to avoid validation issues
            let formData = { ...data };
            
            // Upload files if they exist
            if (data.profileImage) {
                try {
                    console.log("Uploading profile image...");
                    const profileImage = await uploadFile(data.profileImage);
                    if (profileImage && profileImage.secure_url) {
                        formData.profileImage = profileImage.secure_url;
                        console.log("Profile image uploaded successfully:", profileImage.secure_url);
                    } else {
                        console.warn("Profile image upload failed, using empty string");
                        formData.profileImage = ""; // Use empty string instead of null
                    }
                } catch (error) {
                    console.error("Profile image upload error:", error);
                    formData.profileImage = ""; // Use empty string instead of null
                }
            } else {
                formData.profileImage = ""; // Use empty string instead of null
            }
            
            if (data.birthCertificate) {
                try {
                    console.log("Uploading birth certificate...");
                    const birthCertificate = await uploadFile(data.birthCertificate);
                    if (birthCertificate && birthCertificate.secure_url) {
                        formData.birthCertificate = birthCertificate.secure_url;
                        console.log("Birth certificate uploaded successfully:", birthCertificate.secure_url);
                    } else {
                        console.warn("Birth certificate upload failed, using empty string");
                        formData.birthCertificate = ""; // Use empty string instead of null
                    }
                } catch (error) {
                    console.error("Birth certificate upload error:", error);
                    formData.birthCertificate = ""; // Use empty string instead of null
                }
            } else {
                formData.birthCertificate = ""; // Use empty string instead of null
            }
            
            if (data.transferCertificate) {
                try {
                    console.log("Uploading transfer certificate...");
                    const transferCertificate = await uploadFile(data.transferCertificate);
                    if (transferCertificate && transferCertificate.secure_url) {
                        formData.transferCertificate = transferCertificate.secure_url;
                        console.log("Transfer certificate uploaded successfully:", transferCertificate.secure_url);
                    } else {
                        console.warn("Transfer certificate upload failed, using empty string");
                        formData.transferCertificate = ""; // Use empty string instead of null
                    }
                } catch (error) {
                    console.error("Transfer certificate upload error:", error);
                    formData.transferCertificate = ""; // Use empty string instead of null
                }
            } else {
                formData.transferCertificate = ""; // Use empty string instead of null
            }

            // Ensure all required fields are present
            const requiredFields = [
                'userId', 'academicYear', 'admissionDate', 'status', 'category',
                'firstName', 'lastName', 'class', 'section', 'gender',
                'dateOfBirth', 'bloodGroup', 'religion', 'contactNumber',
                'email', 'board', 'motherTongue', 'presentAddress', 
                'permanentAddress', 'fatherName', 'fatherEmail',
                'fatherContactNumber', 'fatherOccupation', 'fatherNidNumber',
                'motherName', 'motherEmail', 'motherContactNumber',
                'motherOccupation', 'motherNidNumber'
            ];
            
            for (const field of requiredFields) {
                if (!formData[field]) {
                    console.warn(`Missing required field: ${field}`);
                    if (field === 'userId') {
                        formData.userId = 'temp-user-id'; // Provide a default if missing
                    }
                }
            }

            console.log("Sending data to server:", formData);

            // Create a pending request instead of directly creating a student
            const pendingRequestPayload = {
                requestType: RequestType.STUDENT,
                requestData: formData,
                createdBy: formData.userId || 'unknown'
            };

            // Make the API call to create a pending request
            const response = await createPendingRequest(pendingRequestPayload).unwrap();

            if (response.success) {
                toast.success("Your request has been submitted for approval!");
                reset();
                
                // Clear the localStorage data
                localStorage.removeItem('user_data');
                
                // Navigate to home page after successful submission
                router.push("/");
            } else if (response.success === false && response.errorSources) {
                const errorMessage = response.errorSources.map((err: any) => err.message).join(", ");
                toast.error(errorMessage);
            }
        } catch (error: any) {
            console.error("Student creation error:", error);
            
            // Log the full error for debugging
            console.error("Full error details:", JSON.stringify(error, null, 2));
            
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

export default AddStudentForm