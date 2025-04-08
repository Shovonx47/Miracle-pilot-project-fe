"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

// Define the Notice type to match the structure in NoticeBoardSection
interface Notice {
  title: string;
  date: string;
  color: string;
}

const AddNoticesPage = () => {
  const router = useRouter();
  const [notice, setNotice] = useState<Notice>({
    title: "",
    date: format(new Date(), "dd MMM yyyy"),
    color: "bg-blue-200",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", message: "" });

  // Color options for the notice
  const colorOptions = [
    { value: "bg-blue-200", label: "Blue" },
    { value: "bg-red-200", label: "Red" },
    { value: "bg-green-200", label: "Green" },
    { value: "bg-yellow-200", label: "Yellow" },
    { value: "bg-purple-200", label: "Purple" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNotice((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format the date from input (YYYY-MM-DD) to display format (DD MMM YYYY)
    const inputDate = new Date(e.target.value);
    if (!isNaN(inputDate.getTime())) {
      const formattedDate = format(inputDate, "dd MMM yyyy");
      setNotice((prev) => ({ ...prev, date: formattedDate }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!notice.title.trim()) {
        throw new Error("Notice title is required");
      }

      // Send the notice data to the API
      const response = await fetch('http://localhost:5000/api/v1/notice/create-notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notice),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create notice');
      }

      const data = await response.json();

      // Show success message
      setSubmitMessage({
        type: "success",
        message: data.message || "Notice created successfully!",
      });

      // Reset form after success
      setNotice({
        title: "",
        date: format(new Date(), "dd MMM yyyy"),
        color: "bg-blue-200",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to create notice",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add New Notice</h1>
        <p className="text-gray-600">Create a new notice to display on the notice board</p>
      </div>

      {submitMessage.message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            submitMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {submitMessage.message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Notice Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Notice Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={notice.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter notice title"
              required
            />
          </div>

          {/* Notice Date */}
          <div className="space-y-2">
            <label htmlFor="dateInput" className="block text-sm font-medium text-gray-700">
              Notice Date
            </label>
            <input
              type="date"
              id="dateInput"
              name="dateInput"
              onChange={handleDateChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500">
              Formatted date: {notice.date}
            </p>
          </div>

          {/* Notice Color */}
          <div className="space-y-2">
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              Notice Color
            </label>
            <div className="flex items-center space-x-4">
              <select
                id="color"
                name="color"
                value={notice.color}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {colorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className={`w-8 h-8 rounded-full ${notice.color}`}></div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isSubmitting ? "Creating Notice..." : "Create Notice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoticesPage;