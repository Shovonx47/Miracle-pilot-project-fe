import { Input } from "@/components/ui/input";
 
import { Controller } from "react-hook-form";
import { NotebookTabs } from "lucide-react";

interface PersonalInfoProps {
    control: any; // control from useForm
    setValue: (name: string, value: any) => void;
}

const PreviousSchoolDetails = ({ control, setValue }: PersonalInfoProps) => {
    return (
        <div className="p-6 bg-white">
             
            <div className="border rounded-md">
                <div className="p-4 bg-[#E9EDF4] rounded-md rounded-b-none flex items-center gap-2 mb-5">
                    <NotebookTabs className="h-5 w-5"/> Previous School Details
                </div>
                <div className="m-4 grid grid-cols-2 gap-4">
                    {/* Academic Year Select */}
                     
                    {/* Admission Number */}
                    <div>
                        <label className="text-sm text-gray-600">School Name </label>
                        <Controller
                            name="previousSchoolName" // Field name
                            control={control} // Pass control from useForm
                            render={({ field }) => (
                                <Input
                                    {...field} // Spread the field props to connect the input
                                    placeholder="Previous school name"
                                />
                            )}
                        />

                    </div>

                    {/* Admission Date */}
                    

                    {/* Roll Number */}
                    <div>
                        <label className="text-sm text-gray-600">Address</label>
                        <Controller
                            name="previousSchoolAddress" // Field name
                            control={control} // Pass control from useForm
                            render={({ field }) => (
                                <Input
                                    {...field} // Spread the field props to connect the input
                                    placeholder="Enter school address"
                                />
                            )}
                        />

                    </div>
  
                </div>
            </div>
        </div>
    );
};

export default PreviousSchoolDetails;
