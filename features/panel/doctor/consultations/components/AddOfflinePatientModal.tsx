"use client";

import { useState, useRef } from "react";
import { addOfflinePatient } from "../actions/addOfflinePatient";
import { useRouter } from "next/navigation";

export function AddOfflinePatientModal({ doctorId }: { doctorId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null); // 👈 Add ref
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("doctorId", doctorId);
    
    const result = await addOfflinePatient(formData);
    
    if (result.success) {
      // 👇 Fix: Use ref to reset form
      if (formRef.current) {
        formRef.current.reset();
      }
      setIsOpen(false);
      router.refresh();
      alert("✅ Patient added!");
    } else {
      setError(result.error || "Something went wrong");
    }
    
    setLoading(false);
  }

  // Close on outside click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setError("");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        + Add Walk-in Patient
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Add Walk-in Patient</h2>
              <p className="text-sm text-gray-500 mt-1">Register a new offline patient</p>
            </div>

            {error && (
              <div className="mx-6 mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form 
              ref={formRef} // 👈 Attach ref
              onSubmit={handleSubmit} 
              className="p-6 space-y-4"
            >
              <input type="hidden" name="doctorId" value={doctorId} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="patientName"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter patient name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="patientAge"
                    min="0"
                    max="150"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select name="patientGender" className="w-full p-2 border rounded-lg">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  pattern="[0-9]{10}"
                  className="w-full p-2 border rounded-lg"
                  placeholder="10 digit mobile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complaint/Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="complaint"
                  required
                  rows={3}
                  className="w-full p-2 border rounded-lg"
                  placeholder="What brings the patient today?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                <input
                  type="date"
                  name="followUpDate"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Patient"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setError("");
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}