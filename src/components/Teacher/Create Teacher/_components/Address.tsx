import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues } from "react-hook-form";
import { MapPinHouse } from "lucide-react";

interface PersonalInfoProps {
    control: Control<FieldValues>;  // Use react-hook-form's Control type
        
}

const Address = ({ control }: PersonalInfoProps) => {
    return (
        <div className="p-6 bg-white">
            <div className="border rounded-md">
                <div className="p-4 bg-[#E9EDF4] rounded-md rounded-b-none flex items-center gap-2 mb-5">
                    <MapPinHouse className="h-5 w-5" /> Address
                </div>

                <div className="m-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Present Address */}
                    <div>
                        <label className="text-sm text-gray-600">Present Address</label>
                        <Controller
                            name="presentAddress"
                            control={control}
                            rules={{ required: "Present address is required" }} // Validation
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Input {...field} placeholder="Enter present address" />
                                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                </>
                            )}
                        />
                    </div>

                    {/* Permanent Address */}
                    <div>
                        <label className="text-sm text-gray-600">Permanent Address</label>
                        <Controller
                            name="permanentAddress"
                            control={control}
                            rules={{ required: "Permanent address is required" }} // Validation
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Input {...field} placeholder="Enter permanent address" />
                                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;
