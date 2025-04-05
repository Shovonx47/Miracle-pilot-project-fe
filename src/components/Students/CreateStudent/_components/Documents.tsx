"use client";
import { Controller } from "react-hook-form";
import { FilePlus2 } from "lucide-react";
import { useState } from "react";

interface PersonalInfoProps {
    control: any;
    setValue: (name: string, value: any) => void;
    trigger?: (name?: string) => void;
}

const Documents = ({ control, setValue, trigger }: PersonalInfoProps) => {

    // Local states to store the file URL for rendering PDFs
    const [birthCertificateUrl, setBirthCertificateUrl] = useState<string | null>(null);
    const [transferCertificateUrl, setTransferCertificateUrl] = useState<string | null>(null);

    // Truncate file name for display
    const truncateFileName = (name: string, maxLength: number = 20) => {
        return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
    };

    // Handle file change for both certificates
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, setFileUrl: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            // Create a URL for the uploaded file
            const fileUrl = URL.createObjectURL(file);
            setFileUrl(fileUrl); // Update the state with the file URL
            setValue(fieldName, file);
            if (trigger) trigger(fieldName);
        }
    };

    return (
        <div className="p-6">
            <div className=" bg-white border rounded-md">
                <div className="p-4 bg-[#E9EDF4] rounded-t-md flex items-center gap-2 mb-5">
                    <FilePlus2 className="h-5 w-5" />
                    <span className="font-semibold">Documents</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    {/* Birth Certificate Upload */}
                    <div>
                        <h3 className="font-semibold">Upload Birth Certificate</h3>
                        <p className="text-sm text-gray-500">Upload file size of 4MB, Accepted formats: PDF, JPG, PNG</p>
                        <Controller
                            name="birthCertificate"
                            control={control}
                            render={({ field }) => (
                                <div className="mt-3 flex items-center gap-3">
                                    <label htmlFor="birth-certificate" className="bg-black text-white w-[90px] text-center py-2 rounded-md cursor-pointer">
                                        {field.value ? "Change" : "Upload"}
                                    </label>
                                    <input
                                        type="file"
                                        id="birth-certificate"
                                        className="hidden"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => {
                                            handleFileChange(e, "birthCertificate", setBirthCertificateUrl);
                                        }}
                                    />
                                    {field.value && (
                                        <>
                                            <span className="text-gray-700">
                                                {field.value.name ? truncateFileName(field.value.name) : "File uploaded"}
                                            </span>
                                            <button 
                                                type="button"
                                                className="text-red-500 ml-2"
                                                onClick={() => {
                                                    setValue("birthCertificate", null);
                                                    setBirthCertificateUrl(null);
                                                    if (trigger) trigger("birthCertificate");
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        />
                        {/* Display the PDF/Image preview */}
                        {birthCertificateUrl && (
                            <div className="mt-5 border rounded-md p-2">
                                {birthCertificateUrl.endsWith('.pdf') ? (
                                    <iframe
                                        src={birthCertificateUrl}
                                        width="100%"
                                        height="200"
                                        frameBorder="0"
                                        title="Birth Certificate PDF"
                                    />
                                ) : (
                                    <img 
                                        src={birthCertificateUrl} 
                                        alt="Birth Certificate" 
                                        style={{ maxHeight: '200px', maxWidth: '100%' }}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Transfer Certificate Upload */}
                    <div>
                        <h3 className="font-semibold">Upload Transfer Certificate</h3>
                        <p className="text-sm text-gray-500">Upload file size of 4MB, Accepted formats: PDF, JPG, PNG</p>
                        <Controller
                            name="transferCertificate"
                            control={control}
                            render={({ field }) => (
                                <div className="mt-3 flex items-center gap-3">
                                    <label htmlFor="transfer-certificate" className="bg-black text-white px-4 py-2 rounded-md cursor-pointer">
                                        {field.value ? "Change" : "Upload"}
                                    </label>
                                    <input
                                        type="file"
                                        id="transfer-certificate"
                                        className="hidden"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => {
                                            handleFileChange(e, "transferCertificate", setTransferCertificateUrl);
                                        }}
                                    />
                                    {field.value && (
                                        <>
                                            <span className="text-gray-700">
                                                {field.value.name ? truncateFileName(field.value.name) : "File uploaded"}
                                            </span>
                                            <button 
                                                type="button"
                                                className="text-red-500 ml-2"
                                                onClick={() => {
                                                    setValue("transferCertificate", null);
                                                    setTransferCertificateUrl(null);
                                                    if (trigger) trigger("transferCertificate");
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        />
                        {/* Display the PDF/Image preview */}
                        {transferCertificateUrl && (
                            <div className="mt-5 border rounded-md p-2">
                                {transferCertificateUrl.endsWith('.pdf') ? (
                                    <iframe
                                        src={transferCertificateUrl}
                                        width="100%"
                                        height="200"
                                        frameBorder="0"
                                        title="Transfer Certificate PDF"
                                    />
                                ) : (
                                    <img 
                                        src={transferCertificateUrl} 
                                        alt="Transfer Certificate" 
                                        style={{ maxHeight: '200px', maxWidth: '100%' }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;
