"use client";

import { Input } from "@/components/ui/input";
import { Controller, useFieldArray } from "react-hook-form";
import { Trash2, SquarePlus, NotebookTabs } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";


interface ExamsInfoProps {
    control: any;
    watch: any;
}

const Exams = ({ control }: ExamsInfoProps) => {


    // UseFieldArray to handle dynamic exam fields
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "exams",
    });

    // Ensure at least one exam field is initialized
    useEffect(() => {
        if (fields.length === 0) {
            replace([{ courseName: "", courseCode: "", maxMark: "", startTime: "", endTime: "" }]);
        }
    }, [replace, fields.length]);

    return (
        <div className="p-6 bg-white">
            <div className="border rounded-md">
                <div className="p-4 bg-[#E9EDF4] rounded-md rounded-b-none flex justify-between items-center gap-2 mb-5">
                    <div className="flex items-center gap-2">
                        <NotebookTabs className="h-5 w-5" /> Exams Details
                    </div>
                </div>


                <div className="m-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="lg:flex justify-between gap-x-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                                {/* Course Name */}
                                <div>
                                    <label className="text-sm text-gray-600">Subject Name</label>
                                    <Controller
                                        name={`exams.${index}.courseName`}
                                        control={control}
                                        rules={{ required: "Course Name is required" }}
                                        render={({ field, fieldState: { error } }) => (
                                            <div>
                                                <Input {...field} placeholder="Enter course name" />
                                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                            </div>
                                        )}
                                    />
                                </div>

                                {/* Course Code */}
                                <div>
                                    <label className="text-sm text-gray-600">Subject Code</label>
                                    <Controller
                                        name={`exams.${index}.courseCode`}
                                        control={control}
                                        rules={{ required: "Course Code is required" }}
                                        render={({ field, fieldState: { error } }) => (
                                            <div>
                                                <Input {...field} placeholder="Enter course code" />
                                                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                                            </div>
                                        )}
                                    />
                                </div>

                                {/* Max Mark */}
                                <div>
                                    <label className="text-sm text-gray-600">Max Mark</label>
                                    <Controller
                                        name={`exams.${index}.maxMark`}
                                        control={control}
                                        rules={{ required: "Max Mark is required" }}
                                        render={({ field, fieldState: { error } }) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter max mark"
                                                    className={`border ${error ? "border-red-500" : "border-gray-300"}`} // Style for error
                                                    onKeyDown={(e) => {
                                                        // Allow only numbers, backspace, and delete keys
                                                        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                                            e.preventDefault();
                                                        }
                                                    }}

                                                    pattern="\d+" // This regex accepts only digits
                                                    title="Only numbers are allowed"
                                                />
                                                {error && (
                                                    <p className="text-red-500 text-sm">{error.message}</p> // Error message display
                                                )}
                                            </div>
                                        )}
                                    />

                                </div>

                                <Controller
                                    name={`exams.${index}.startTime`}
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
                                    name={`exams.${index}.endTime`}
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
                            </div>

                            {/* Delete Button */}
                            <div className="flex items-end mt-4 lg:mt-0">
                                <Button
                                    type="button"
                                    onClick={() => remove(index)}
                                    variant="destructive"
                                    className="flex items-center gap-2"
                                    disabled={fields.length === 1} // Prevent removing the last exam
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Add Exam Button */}
                    <Button
                        type="button"
                        onClick={() => append({ courseName: "", courseCode: "", maxMark: "", startTime: "", endTime: "" })}
                        className="mb-4"
                    >
                        <SquarePlus /> Add Exam
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Exams;
