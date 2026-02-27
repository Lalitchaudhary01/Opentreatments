// components/SimpleAddPatient.tsx
"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddOfflinePatientModal } from "./AddOfflinePatientModal";

export function SimpleAddPatient() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const result = await AddOfflinePatientModal(formData);
    if (result.success) {
      alert("Patient added successfully!");
      e.currentTarget.reset();
      setShowForm(false);
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  return (
    <div>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Walk-in
        </button>
      ) : (
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="font-bold mb-3">Register Walk-in Patient</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name *"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="patientAge"
              placeholder="Age"
              className="w-full p-2 border rounded"
            />
            <select name="patientGender" className="w-full p-2 border rounded">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="complaint"
              placeholder="Complaint/Reason *"
              required
              rows={2}
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}