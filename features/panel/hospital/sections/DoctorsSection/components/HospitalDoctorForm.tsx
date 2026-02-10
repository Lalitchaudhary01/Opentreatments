"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateHospitalDoctorInput, HospitalDoctor } from "../types";

export default function HospitalDoctorForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: HospitalDoctor;
  onSubmit: (data: CreateHospitalDoctorInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [specialization, setSpecialization] = useState(
    initial?.specialization || ""
  );
  const [experience, setExperience] = useState(
    initial?.experience?.toString() || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit({
      name,
      specialization,
      experience: experience ? Number(experience) : undefined,
    });
    setLoading(false);
  };

  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="grid gap-2">
        <input
          className="border rounded px-2 py-1"
          placeholder="Doctor name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border rounded px-2 py-1"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <input
          className="border rounded px-2 py-1"
          placeholder="Experience (years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
