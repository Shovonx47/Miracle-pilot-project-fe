import { Controller } from "react-hook-form";
import { Hotel } from "lucide-react";
import DynamicSelect from "@/components/Reusable/DynamicSelect";
import { Switch } from "@/components/ui/switch";

const academicYears = ["June 2024/25", "July 2025/26"];

interface PersonalInfoProps {
    control: any;
    setValue: (name: string, value: any) => void;
    watch: (name: string, defaultValue?: any) => any;
    trigger: (name?: string | string[]) => void;
}

const HostelInformation = ({ control, setValue, watch, trigger }: PersonalInfoProps) => {
    const isHostelEnabled = watch("hostelEnabled", true);

    return (
        <div className="p-6 bg-white">
            <div className="border rounded-md">
                <div className="p-4 bg-[#E9EDF4] rounded-md rounded-b-none flex justify-between items-center gap-2 mb-5">
                    <div className="flex items-center gap-2">
                        <Hotel className="h-5 w-5" /> Hostel Information
                    </div>
                    <Controller
                        name="hostelEnabled"
                        control={control}
                        defaultValue={true}
                        render={({ field }) => (
                            <Switch
                                checked={field.value ?? true}
                                onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    setValue("hostelEnabled", checked);
                                    if (checked) {
                                        trigger(["hostelName", "roomNumber"]);
                                    }
                                }}
                            />
                        )}
                    />
                </div>

                {isHostelEnabled && (
                    <div className="m-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Route Select */}
                        <Controller
                            name="hostelName"
                            control={control}
                            rules={{ required: "Hostel name is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <DynamicSelect
                                        label="Hostel Name"
                                        placeholder="Select hostel name"
                                        options={academicYears}
                                        value={field.value}
                                        onChange={(value: string) => {
                                            setValue("hostelName", value);
                                            trigger("hostelName"); // Revalidate field
                                        }}
                                    />
                                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                </div>
                            )}
                        />

                        {/*room numberSelect */}
                        <Controller
                            name="roomNumber"
                            control={control}
                            rules={{ required: "Room number is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <DynamicSelect
                                        label="Room Number"
                                        placeholder="Select room number"
                                        options={academicYears}
                                        value={field.value}
                                        onChange={(value: string) => {
                                            setValue("roomNumber", value);
                                            trigger("roomNumber"); // Revalidate field
                                        }}
                                    />
                                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                </div>
                            )}
                        />
 
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default HostelInformation;
