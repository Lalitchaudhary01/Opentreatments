"use client";

import { useState } from "react";
import type { AddDoctorInput } from "../actions/addDoctor";
import { useAddDoctor } from "../hooks/useAddDoctor";

export default function AddDoctorForm() {
  const { submitDoctor, loading, error } = useAddDoctor();

  const [form, setForm] = useState<AddDoctorInput>({
    name: "",
    specialization: "",
    specialties: [],
    languages: [],
    experience: undefined,
    gender: "",
    profilePic: "",
    fees: undefined,
    city: "",
    badges: [],
    availability: [], // <-- initial empty
  });

  const handleChange = (field: keyof AddDoctorInput, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddAvailability = () => {
    setForm({
      ...form,
      availability: [...(form.availability || []), { day: "", slots: [""] }],
    });
  };

  const handleAvailabilityChange = (
    index: number,
    field: "day" | "slots",
    value: string | string[]
  ) => {
    const updated = [...(form.availability || [])];
    if (field === "day") updated[index].day = value as string;
    else updated[index].slots = value as string[];
    setForm({ ...form, availability: updated });
  };

  const handleAddSlot = (index: number) => {
    const updated = [...(form.availability || [])];
    updated[index].slots.push("");
    setForm({ ...form, availability: updated });
  };

  const handleSlotChange = (
    availIndex: number,
    slotIndex: number,
    value: string
  ) => {
    const updated = [...(form.availability || [])];
    updated[availIndex].slots[slotIndex] = value;
    setForm({ ...form, availability: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = await submitDoctor(form);
    if (doctor) {
      alert(`Doctor ${doctor.name} added successfully!`);
      setForm({
        name: "",
        specialization: "",
        specialties: [],
        languages: [],
        experience: undefined,
        gender: "",
        profilePic: "",
        fees: undefined,
        city: "",
        badges: [],
        availability: [],
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-md shadow-md max-w-lg mx-auto"
    >
      {error && <p className="text-red-500">{error}</p>}

      {/* Existing Inputs */}
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Specialization"
        value={form.specialization}
        onChange={(e) => handleChange("specialization", e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Specialties (comma separated)"
        value={form.specialties?.join(", ") || ""}
        onChange={(e) =>
          handleChange(
            "specialties",
            e.target.value.split(",").map((s) => s.trim())
          )
        }
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Languages (comma separated)"
        value={form.languages?.join(", ") || ""}
        onChange={(e) =>
          handleChange(
            "languages",
            e.target.value.split(",").map((l) => l.trim())
          )
        }
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Experience (years)"
        value={form.experience || ""}
        onChange={(e) => handleChange("experience", parseInt(e.target.value))}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Gender"
        value={form.gender || ""}
        onChange={(e) => handleChange("gender", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={form.profilePic || ""}
        onChange={(e) => handleChange("profilePic", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Fees"
        value={form.fees || ""}
        onChange={(e) => handleChange("fees", parseFloat(e.target.value))}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="City"
        value={form.city || ""}
        onChange={(e) => handleChange("city", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Badges (comma separated)"
        value={form.badges?.join(", ") || ""}
        onChange={(e) =>
          handleChange(
            "badges",
            e.target.value.split(",").map((b) => b.trim())
          )
        }
        className="w-full p-2 border rounded"
      />

      {/* Availability Section */}
      <div className="border p-2 rounded space-y-2">
        <h3 className="font-semibold">Availability</h3>
        {(form.availability || []).map((a, i) => (
          <div key={i} className="space-y-1 border-b pb-2">
            <input
              type="text"
              placeholder="Day (e.g., Monday)"
              value={a.day}
              onChange={(e) =>
                handleAvailabilityChange(i, "day", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            {a.slots.map((slot, j) => (
              <input
                key={j}
                type="text"
                placeholder="Time slot (e.g., 10:00-12:00)"
                value={slot}
                onChange={(e) => handleSlotChange(i, j, e.target.value)}
                className="w-full p-2 border rounded"
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddSlot(i)}
              className="text-blue-500 text-sm"
            >
              + Add Slot
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddAvailability}
          className="text-blue-500 text-sm mt-2"
        >
          + Add Day
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Doctor"}
      </button>
    </form>
  );
}
