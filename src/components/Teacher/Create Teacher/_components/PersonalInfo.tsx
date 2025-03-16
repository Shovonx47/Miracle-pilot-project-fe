"use client"
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { ImagePlus, InfoIcon } from "lucide-react";
import DynamicSelect from "@/components/Reusable/DynamicSelect";
import { DatePickerForm } from "@/components/Reusable/DatePickerForm";
import { useGetSingleUserQuery } from "@/redux/api/Auth/getUserApi";
import { useEffect } from "react";




const statuses = ["Active", "Inactive"];

const genders = ["Male", "Female", "Other"];

const subject = [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Economics",
    "Business Studies",
    "Accounting",
    "Arts",
    "Music",
    "Physical Education",
    "Bangla", // If applicable for Bangladesh
    "Islamic Studies", // If applicable
    "Civics",
    "Environmental Science",
    "Statistics",
];


const educationalQualifications = [
    "Primary Education",
    "Secondary School Certificate (SSC)",
    "Higher Secondary Certificate (HSC)",
    "Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate (PhD)",
    "Postdoctoral Research",
    "Technical/Vocational Education",
    "Professional Certifications",
    "Others"
  ];
  
  

const bloodGroups = ["O +ve", "O -ve", "A +ve", "A -ve", "B +ve", "B -ve", "AB +ve", "AB -ve"];


const maritalStatuses = [
    "Married",
    "Unmarried",
    "Divorced",
    "Widowed",
    "Separated",
    "Engaged"
  ];
  
  

const religions = ["Christianity", "Islam", "Hinduism", "Buddhism", "Judaism", "Sikhism", "Zoroastrianism", "Other"];

const categories = ["OBC", "General", "SC", "ST", "EWS", "Other"];

const motherTongues = ["English", "Spanish", "Bengali", "Hindi", "Arabic", "Chinese", "French", "German", "Tamil", "Urdu", "Portuguese"];



interface PersonalInfoProps {
    control: Control<FieldValues>;  // Use react-hook-form's Control type
    watch: (name: string) => any;
    setValue: UseFormSetValue<FieldValues>; // Type-safe function for setting form values
    trigger: UseFormTrigger<FieldValues>;// Add trigger for validation
}

const PersonalInfo = ({ control, setValue, trigger, watch }: PersonalInfoProps) => {

    const userId = watch("userId");


    const { data: singleTeacher, isLoading } = useGetSingleUserQuery(userId)


    useEffect(() => {
        if (singleTeacher?.data) {
            Object.entries(singleTeacher.data).forEach(([key, value]) => {
                if (value) setValue(key, value); // Only update non-empty values
            });
        }
    }, [singleTeacher, setValue]);


    if (isLoading) {
        return
    }


    return (
        <div className="p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">Add Teacher</h2>
            <nav className="text-sm text-gray-500 mb-4">
                Dashboard / Teachers / <span className="text-gray-800">Add Teacher</span>
            </nav>

            <div className="border rounded-md">
                <div className="p-4 bg-[#E9EDF4] rounded-md rounded-b-none flex items-center gap-2 mb-5">
                    <InfoIcon className="h-5 w-5" /> Personal Information
                </div>

                <div className="ml-4">
                    <Controller
                        name="profileImage"
                        control={control}
                        rules={{ required: "Profile image is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div className="mt-1 flex items-center">
                                <div className="w-20 h-20 border border-dashed border-gray-300 rounded-sm flex justify-center items-center">
                                    {field.value ? (
                                        <img
                                            src={URL.createObjectURL(field.value)}
                                            alt="Selected image"
                                            className="w-20 h-20 object-cover border border-dashed border-gray-300"
                                        />
                                    ) : (
                                        <label htmlFor="file-upload" className="text-gray-400 flex justify-center items-center cursor-pointer">
                                            <ImagePlus />
                                        </label>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.svg"
                                        className="hidden"
                                        id="file-upload"
                                        onChange={(e) => {
                                            const file = e.target.files ? e.target.files[0] : null;
                                            setValue("profileImage", file);
                                            trigger("profileImage");
                                        }}
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="bg-white py-2 px-3 border border-dashed border-gray-300 rounded-sm text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        Upload
                                    </label>

                                    <label
                                        className="ml-3 py-2 cursor-pointer px-3 border border-dashed border-gray-300 rounded-sm text-sm font-medium text-white bg-black"
                                        onClick={() => setValue("profileImage", null)}
                                    >
                                        Remove
                                    </label>

                                    <p className="mt-2 text-xs text-gray-500">
                                        Upload image size 4MB, Format JPG, PNG, SVG
                                    </p>
                                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className="m-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* user id Number */}
                    <Controller
                        name="userId"
                        control={control}
                        rules={{ required: "User ID is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="text-sm text-gray-600">User Id</label>
                                <Input
                                    {...field}
                                    placeholder="Enter user id number"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                    {/* First Name */}
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: "First Name is required" }}
                        defaultValue={singleTeacher?.data?.firstName || ""}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="text-sm text-gray-600">First name</label>
                                <Input
                                    {...field}
                                    placeholder="Enter first name"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* Last Name */}
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: "Last Name is required" }}
                        defaultValue={singleTeacher?.data?.lastName || ""}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="text-sm text-gray-600">Last name</label>
                                <Input
                                    {...field}
                                    placeholder="Enter last name"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* Category Select */}
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Category"
                                    placeholder="Select Category"
                                    options={categories}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("category", val);
                                        trigger("category");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* joining Date */}
                    <Controller
                        name="joiningDate"
                        control={control}
                        rules={{ required: "Joining date is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DatePickerForm
                                    value={field.value}
                                    onChange={(formattedDate) => {
                                        setValue("joiningDate", formattedDate);
                                        trigger("joiningDate");
                                    }}
                                    label="Joining Date"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                    {/* subject Select */}
                    <Controller
                        name="subject"
                        control={control}
                        rules={{ required: "Subject is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Subject"
                                    placeholder="Select Subject"
                                    options={subject}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("subject", val);
                                        trigger("subject");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* Gender Select */}
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: "Gender is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Gender"
                                    placeholder="Select Gender"
                                    options={genders}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("gender", val);
                                        trigger("gender");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* Date of Birth */}
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        rules={{ required: "Date of Birth is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DatePickerForm
                                    value={field.value}
                                    onChange={(formattedDate) => {
                                        setValue("dateOfBirth", formattedDate);
                                        trigger("dateOfBirth");
                                    }}
                                    label="Date of Birth"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* Blood Group Select */}
                    <Controller
                        name="bloodGroup"
                        control={control}
                        rules={{ required: "Blood Group is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Blood Group"
                                    placeholder="Select Blood Group"
                                    options={bloodGroups}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("bloodGroup", val);
                                        trigger("bloodGroup");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                    {/*maritalStatus Select */}
                    <Controller
                        name="maritalStatus"
                        control={control}
                        rules={{ required: "Marital Status is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Marital Status"
                                    placeholder="Select Marital Status"
                                    options={maritalStatuses}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("maritalStatus", val);
                                        trigger("maritalStatus");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* Religion Select */}
                    <Controller
                        name="religion"
                        control={control}
                        rules={{ required: "Religion is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Religion"
                                    placeholder="Select Religion"
                                    options={religions}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("religion", val);
                                        trigger("religion");
                                    }}

                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* Contact Number */}
                    <Controller
                        name="contactNumber"
                        control={control}
                        rules={{ required: "Contact Number is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="text-sm text-gray-600">Personal contact number</label>
                                <Input
                                    {...field}
                                    placeholder="Enter contact number"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                    {/* Contact Number */}
                    <Controller
                        name="alternativeContactNumber"
                        control={control}

                        render={({ field }) => (
                            <div>
                                <label className="text-sm text-gray-600">Alternative Contact Number</label>
                                <Input
                                    {...field}
                                    placeholder="Enter contact number"
                                />
                            </div>
                        )}
                    />

                    {/* Email Address */}
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: "Email is required" }}
                        defaultValue={singleTeacher?.data?.email || ""}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="text-sm text-gray-600">Email address</label>
                                <Input
                                    {...field}
                                    placeholder="Enter email address"
                                    readOnly={singleTeacher?.data?.email ? true : false}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                    {/* NID Address */}
                    <Controller
                        name="nidNumber"
                        control={control}
                        rules={{ required: "NID Number is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="text-sm text-gray-600">NID Number</label>
                                <Input
                                    {...field}
                                    placeholder="Enter NID number"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* educationalQualification Select */}
                    <Controller
                        name="educationalQualification"
                        control={control}
                        rules={{ required: "Qualification is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Educational Qualification"
                                    placeholder="Select Qualification"
                                    options={educationalQualifications}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("educationalQualification", val);
                                        trigger("educationalQualification");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* Mother Tongue Select */}
                    <Controller
                        name="motherTongue"
                        control={control}
                        rules={{ required: "Mother Tongue is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Mother Tongue"
                                    placeholder="Select Mother Tongue"
                                    options={motherTongues}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("motherTongue", val);
                                        trigger("motherTongue");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                    {/* Status Select */}
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: "Status is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Status"
                                    placeholder="Select Status"
                                    options={statuses}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("status", val);
                                        trigger("status");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;