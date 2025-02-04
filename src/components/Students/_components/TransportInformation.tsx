import { Controller } from "react-hook-form";
import { Bus, NotebookTabs } from "lucide-react";
import DynamicSelect from "@/components/Reusable/DynamicSelect";
import { Switch } from "@/components/ui/switch";

const academicYears = ["June 2024/25", "July 2025/26"];

interface PersonalInfoProps {
    control: any;
    setValue: (name: string, value: any) => void;
    watch: (name: string, defaultValue?: any) => any;
    trigger: (name?: string | string[]) => void;
}

const TransportInformation = ({ control, setValue, watch, trigger }: PersonalInfoProps) => {
    const isTransportEnabled = watch("transportEnabled", true);

    return (
        <div className="p-6 bg-white">
            <div className="border rounded-md">
                <div className="p-4 bg-[#E9EDF4] rounded-md rounded-b-none flex justify-between items-center gap-2 mb-5">
                    <div className="flex items-center gap-2">
                        <Bus className="h-5 w-5" /> Transport Information
                    </div>
                    <Controller
                        name="transportEnabled"
                        control={control}
                        defaultValue={true}
                        render={({ field }) => (
                            <Switch
                                checked={field.value ?? true}
                                onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    setValue("transportEnabled", checked);
                                    if (checked) {
                                        trigger(["route", "vehicleNumber", "pickupPoint"]);
                                    }
                                }}
                            />
                        )}
                    />
                </div>

                {isTransportEnabled && (
                    <div className="m-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Route Select */}
                        <Controller
                            name="route"
                            control={control}
                            rules={{ required: "Route is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <DynamicSelect
                                        label="Route"
                                        placeholder="Select route"
                                        options={academicYears}
                                        value={field.value}
                                        onChange={(value: string) => {
                                            setValue("route", value);
                                            trigger("route"); // Revalidate field
                                        }}
                                    />
                                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                </div>
                            )}
                        />

                        {/* Vehicle Number Select */}
                        <Controller
                            name="vehicleNumber"
                            control={control}
                            rules={{ required: "Vehicle number is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <DynamicSelect
                                        label="Vehicle Number"
                                        placeholder="Select Vehicle Number"
                                        options={academicYears}
                                        value={field.value}
                                        onChange={(value: string) => {
                                            setValue("vehicleNumber", value);
                                            trigger("vehicleNumber"); // Revalidate field
                                        }}
                                    />
                                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                </div>
                            )}
                        />

                        {/* Pickup Point Select */}
                        <Controller
                            name="pickupPoint"
                            control={control}
                            rules={{ required: "Pickup point is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <DynamicSelect
                                        label="Pickup Point"
                                        placeholder="Select Pickup Point"
                                        options={academicYears}
                                        value={field.value}
                                        onChange={(value: string) => {
                                            setValue("pickupPoint", value);
                                            trigger("pickupPoint"); // Revalidate field
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

export default TransportInformation;
