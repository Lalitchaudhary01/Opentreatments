"use client";

import { useState } from "react";
import {
  submitInsuranceProfile,
  type SubmitInsuranceProfileInput,
} from "../actions/submitInsuranceProfile";
// import { updateInsuranceProfile } from "../actions/updateInsuranceProfile"; // if you have edit flow
// import { InsuranceStatus } from "@prisma/client";

type Props = {
  // edit ke liye existing profile pass karoge to form prefill ho jayega
  profile?: {
    companyName: string;
    registrationNumber?: string | null;
    address: string;
    contactEmail: string;
    contactPhone: string;
    website?: string | null;
    documents?: string[];
  } | null;
};

export default function InsuranceProfileForm({ profile }: Props) {
  const [formData, setFormData] = useState<SubmitInsuranceProfileInput>({
    companyName: profile?.companyName ?? "",
    registrationNumber: profile?.registrationNumber ?? "",
    address: profile?.address ?? "",
    contactEmail: profile?.contactEmail ?? "",
    contactPhone: profile?.contactPhone ?? "",
    website: profile?.website ?? "",
    documents: profile?.documents ?? [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (profile) {
        // await updateInsuranceProfile(formData)  // enable when edit action is ready
        setMessage("✅ Profile updated successfully!");
      } else {
        await submitInsuranceProfile(formData); // ✅ server will pick userId from session
        setMessage("✅ Profile submitted! Waiting for admin approval.");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(`❌ ${err?.message || "Failed to submit"}`);
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
        value={formData.registrationNumber ?? ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
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
        value={formData.website ?? ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="documents"
        placeholder="Document URLs (comma separated)"
        value={(formData.documents ?? []).join(", ")}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            documents: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }))
        }
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {loading ? "Saving..." : profile ? "Update Profile" : "Submit Profile"}
      </button>

      {message && (
        <p
          className={`text-center mt-2 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
