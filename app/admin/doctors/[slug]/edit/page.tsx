"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import type { IndependentDoctor } from "@/features/admin/IndependentDoctors/types/independentDoctor";
import { getDoctorById } from "@/features/admin/IndependentDoctors/actions/getDoctorById";
import { updateDoctor } from "@/features/admin/IndependentDoctors/actions/updateDoctor";

export default function EditDoctorPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const router = useRouter();
  const [doctor, setDoctor] = useState<IndependentDoctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doc = await getDoctorById(slug);
        setDoctor(doc);
      } catch (err) {
        setError("Failed to fetch doctor");
      }
    };
    fetchDoctor();
  }, [slug]);

  const handleChange = (field: keyof IndependentDoctor, value: any) => {
    if (!doctor) return;
    setDoctor({ ...doctor, [field]: value });
  };

  const handleAddAvailability = () => {
    if (!doctor) return;
    setDoctor({
      ...doctor,
      availability: [...(doctor.availability || []), { day: "", slots: [""] }],
    });
  };

  const handleAvailabilityChange = (
    index: number,
    field: "day" | "slots",
    value: string | string[]
  ) => {
    if (!doctor) return;
    const updated = [...(doctor.availability || [])];
    if (field === "day") updated[index].day = value as string;
    else updated[index].slots = value as string[];
    setDoctor({ ...doctor, availability: updated });
  };

  const handleAddSlot = (index: number) => {
    if (!doctor) return;
    const updated = [...(doctor.availability || [])];
    updated[index].slots.push("");
    setDoctor({ ...doctor, availability: updated });
  };

  const handleSlotChange = (
    availIndex: number,
    slotIndex: number,
    value: string
  ) => {
    if (!doctor) return;
    const updated = [...(doctor.availability || [])];
    updated[availIndex].slots[slotIndex] = value;
    setDoctor({ ...doctor, availability: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) return;

    setLoading(true);
    setError(null);

    try {
      await updateDoctor(doctor);
      router.push("/admin/doctors");
    } catch (err) {
      setError("Failed to update doctor");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-md shadow-md max-w-lg mx-auto"
    >
      {error && <p className="text-red-500">{error}</p>}

      <Input
        type="text"
        value={doctor.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Name"
        className="w-full p-2 border rounded"
        required
      />

      <Input
        type="text"
        value={doctor.specialization}
        onChange={(e) => handleChange("specialization", e.target.value)}
        placeholder="Specialization"
        className="w-full p-2 border rounded"
        required
      />

      <Input
        type="text"
        value={doctor.specialties.join(", ")}
        onChange={(e) =>
          handleChange(
            "specialties",
            e.target.value.split(",").map((s) => s.trim())
          )
        }
        placeholder="Specialties (comma separated)"
        className="w-full p-2 border rounded"
        required
      />

      <Input
        type="text"
        value={doctor.languages.join(", ")}
        onChange={(e) =>
          handleChange(
            "languages",
            e.target.value.split(",").map((l) => l.trim())
          )
        }
        placeholder="Languages (comma separated)"
        className="w-full p-2 border rounded"
        required
      />

      <Input
        type="number"
        value={doctor.experience || ""}
        onChange={(e) => handleChange("experience", parseInt(e.target.value))}
        placeholder="Experience (years)"
        className="w-full p-2 border rounded"
      />

      <Input
        type="text"
        value={doctor.gender || ""}
        onChange={(e) => handleChange("gender", e.target.value)}
        placeholder="Gender"
        className="w-full p-2 border rounded"
      />

      <Input
        type="text"
        value={doctor.profilePic || ""}
        onChange={(e) => handleChange("profilePic", e.target.value)}
        placeholder="Profile Picture URL"
        className="w-full p-2 border rounded"
      />

      <Input
        type="number"
        value={doctor.fees || ""}
        onChange={(e) => handleChange("fees", parseFloat(e.target.value))}
        placeholder="Fees"
        className="w-full p-2 border rounded"
      />

      <Input
        type="text"
        value={doctor.city || ""}
        onChange={(e) => handleChange("city", e.target.value)}
        placeholder="City"
        className="w-full p-2 border rounded"
      />

      {/* Availability Section */}
      <div className="border p-2 rounded space-y-2">
        <h3 className="font-semibold">Availability</h3>
        {(doctor.availability || []).map((a, i) => (
          <div key={i} className="space-y-1 border-b pb-2">
            <Input
              type="text"
              placeholder="Day (e.g., Monday)"
              value={a.day}
              onChange={(e) =>
                handleAvailabilityChange(i, "day", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            {a.slots.map((slot, j) => (
              <Input
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

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Doctor"}
      </button>
    </form>
  );
}
