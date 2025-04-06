import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { NotebookTabs } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DynamicSelect from "@/components/Reusable/DynamicSelect";

// Updated class options with Roman numerals
const classOptions = [
    "Class I",
    "Class II",
    "Class III",
    "Class IV",
    "Class V",
    "Class VI",
    "Class VII",
    "Class VIII",
    "Class IX",
    "Class X"
];
const sectionOptions = ["A", "B", "C"];
const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    , 'Saturday', 'Sunday'];


interface ClassRoutineProps {
    control: any;
    watch: any;
    setValue: (name: string, value: any) => void;
    trigger: (name?: string | string[]) => void;
    teacherNames: string[]
}

const CreateClassRoutine = ({ control, setValue, trigger, watch, teacherNames }: ClassRoutineProps) => {
    const hasRoutine = watch("hasRoutine", true);
    const selectedDays = watch("days", []);

    // Function to handle multiple day selection
    const handleDaySelection = (day: string) => {
        let updatedDays = [...selectedDays];
        
        if (updatedDays.includes(day)) {
            // Remove day if already selected
            updatedDays = updatedDays.filter(d => d !== day);
        } else {
            // Add day if not already selected
            updatedDays.push(day);
        }
        
        setValue("days", updatedDays);
        trigger("days");
    };

    return (
        <div className="p-6 bg-white">
            <div className="border rounded-md">
                <div className="p-4 bg-[#E9EDF4] rounded-md flex justify-between items-center gap-2 mb-5">
                    <div className="flex items-center gap-2">
                        <NotebookTabs className="h-5 w-5" /> Class Routine
                    </div>
                     
                </div>

                {hasRoutine && (
                    <div className="m-4">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {/* // teacher name  */}
                            <Controller
                                name="teacherName"
                                control={control}
                                rules={{ required: "Teacher Name is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <DynamicSelect
                                            label="Teacher Name"
                                            placeholder="Select Teacher Name"
                                            options={teacherNames}
                                            value={field.value}
                                            onChange={(val) => {
                                                setValue("teacherName", val);
                                                trigger("teacherName");
                                            }}
                                        />
                                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                    </div>
                                )}
                            />
                            {/* Subject Name as text input instead of dropdown */}
                            <Controller
                                name="subjectName"
                                control={control}
                                rules={{ required: "Subject Name is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <label className="text-sm text-gray-600">Subject Name</label>
                                        <Input type="text" {...field} placeholder="Enter Subject Name" />
                                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name={`subjectCode`}
                                control={control}
                                rules={{ required: "Subject Code is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <label className="text-sm text-gray-600">Subject Code</label>
                                        <Input type="text" {...field} placeholder="Enter Subject Code" />
                                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                    </div>
                                )}
                            />
                            {/* Class */}
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

                            {/* Section */}
                            <Controller
                                name="section"
                                control={control}
                                rules={{ required: "Section is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <DynamicSelect
                                            label="Section"
                                            placeholder="Select Section"
                                            options={sectionOptions}
                                            value={field.value}
                                            onChange={(val) => {
                                                setValue("section", val);
                                                trigger("section");
                                            }}
                                        />
                                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                    </div>
                                )}
                            />

                            {/* Days - Custom multi-select implementation */}
                            <Controller
                                name="days"
                                control={control}
                                rules={{ required: "At least one day must be selected" }}
                                render={({ fieldState: { error } }) => (
                                    <div>
                                        <label className="text-sm text-gray-600">Days</label>
                                        <div className="mt-1 space-y-2">
                                            <div className="flex flex-wrap gap-2">
                                                {dayOptions.map((day) => (
                                                    <div 
                                                        key={day}
                                                        onClick={() => handleDaySelection(day)}
                                                        className={`cursor-pointer px-3 py-1 rounded-md text-sm ${
                                                            selectedDays.includes(day) 
                                                                ? 'bg-blue-500 text-white' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                    </div>
                                )}
                            />

                            <Controller
                                name={`startTime`}
                                control={control}
                                rules={{ required: "Start Time is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <label className="text-sm text-gray-600">Start Time</label>
                                        <Input type="time" {...field} />
                                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name={`endTime`}
                                control={control}
                                rules={{ required: "End Time is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <label className="text-sm text-gray-600">End Time</label>
                                        <Input type="time" {...field} />
                                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name={`roomNumber`}
                                control={control}
                                rules={{ required: "Room Number is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <label className="text-sm text-gray-600">Room Number</label>
                                        <Input type="text" {...field} placeholder="Enter Room Number" />
                                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name={`buildingName`}
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="text-sm text-gray-600">Building Name (Optional) </label>
                                        <Input type="text" {...field} placeholder="Enter Building Name" />
                                    </div>
                                )}
                            />
                            <Controller
                                name={`createdBy`}
                                control={control}
                                rules={{ required: "Created by is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <label className="text-sm text-gray-600">Created By </label>
                                        <Input type="text" {...field} placeholder="Enter Created By" />
                                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name={`isOptional`}
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-gray-600">Is Optional ?</label>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateClassRoutine;