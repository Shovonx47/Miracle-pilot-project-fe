import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { InfoIcon } from "lucide-react";
import DynamicSelect from "@/components/Reusable/DynamicSelect";
import { DatePickerForm } from "@/components/Reusable/DatePickerForm";
import { Textarea } from "@/components/ui/textarea";

// Updated class options with Roman numerals
const classOptions = ["Class I", "Class II", "Class III", "Class IV", "Class V", 
                      "Class VI", "Class VII", "Class VIII", "Class IX", "Class X"];

const subject = ["A", "B", "C", "D", "E"];

interface BasicInfoProps {
    control: any; // control from useForm
    setValue: (name: string, value: any) => void;
    trigger: (name: string) => void; // Add trigger for validation
    getValues: any
}

const BasicInfo = ({ control, setValue, trigger, getValues }: BasicInfoProps) => {
    return (
        <div className="p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 pb-2">
                Exam routine details
            </h2>
            <div className="border rounded-md">
                <div className="p-4 bg-[#E9EDF4] rounded-md rounded-b-none flex items-center gap-2 mb-5">
                    <InfoIcon className="h-5 w-5" /> Basic Information
                </div>

                <div className="m-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* class Select - Updated with Roman numeral class options */}
                    <Controller
                        name="class"
                        control={control}
                        rules={{ required: "Class is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DynamicSelect
                                    label="Class"
                                    placeholder="Select Class"
                                    options={classOptions}
                                    value={field.value}
                                    onChange={(val) => {
                                        setValue("class", val);
                                        trigger("class");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                    
                    {/* exam name */}
                    <Controller
                        name="examName"
                        control={control}
                        rules={{ required: "Exam Name is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="text-sm text-gray-600">Exam Name</label>
                                <Input
                                    {...field}
                                    placeholder="Enter Exam Name"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />

                    {/* exam year */}
                    <Controller
                        name="examYear"
                        control={control}
                        rules={{ required: "Exam Year is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="text-sm text-gray-600">Exam Year</label>
                                <Input
                                    {...field}
                                    placeholder="Enter exam year"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                    
                    {/* Single Date Field */}
                    <Controller
                        name="examDate"
                        control={control}
                        rules={{ required: "Exam Date is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <DatePickerForm
                                    value={field.value}
                                    onChange={(formattedDate) => {
                                        setValue("examDate", formattedDate);
                                        trigger("examDate");
                                    }}
                                    label="Exam Date"
                                />
                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </div>
                        )}
                    />
                </div>
                
                <div className="m-4">
                    {/*description */}
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: "Description is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <label className="text-sm text-gray-600">Description</label>
                                <Textarea
                                    {...field}
                                    placeholder="Enter short description"
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

export default BasicInfo;