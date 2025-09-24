"use client";

import { useState } from "react";
import {
  InsuranceProfileInput,
  InsuranceProfile,
} from "../types/insuranceProfile";
import { InsuranceStatus } from "../types/insuranceProfile";
import { updateInsuranceProfile } from "../actions/updateInsuranceProfile";
import { submitInsuranceProfile } from "../actions/submitInsuranceProfile";


interface InsuranceProfileFormProps {
  profile?: InsuranceProfile | null; // null = new submission, else edit
}

export default function InsuranceProfileForm({
  profile,
}: InsuranceProfileFormProps) {
  const [formData, setFormData] = useState<InsuranceProfileInput>({
    companyName: profile?.companyName || "",
    registrationNumber: profile?.registrationNumber || "",
    address: profile?.address || "",
    contactEmail: profile?.contactEmail || "",
    contactPhone: profile?.contactPhone || "",
    website: profile?.website || "",
    documents: profile?.documents || [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (profile) {
        // Edit profile
        await updateInsuranceProfile(profile.id, formData);
        setMessage("✅ Profile updated successfully!");
      } else {
        // New submission → status = PENDING
        await submitInsuranceProfile(formData);
        setMessage("✅ Profile submitted! Waiting for admin approval.");
      }
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow rounded-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {profile ? "Edit Insurance Profile" : "Submit Insurance Profile"}
      </h2>

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="registrationNumber"
        placeholder="Registration Number"
        value={formData.registrationNumber}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="email"
        name="contactEmail"
        placeholder="Contact Email"
        value={formData.contactEmail}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="contactPhone"
        placeholder="Contact Phone"
        value={formData.contactPhone}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="website"
        placeholder="Website (optional)"
        value={formData.website}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* For documents upload (can be expanded later with real file upload logic) */}
      <input
        type="text"
        name="documents"
        placeholder="Document URLs (comma separated)"
        value={formData.documents.join(", ")}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            documents: e.target.value.split(",").map((doc) => doc.trim()),
          }))
        }
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : profile ? "Update Profile" : "Submit Profile"}
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
