"use client";

import React, { useState, useEffect } from "react";
import { HospitalDoctor } from "../types/hospitalDoctor";

interface HospitalDoctorFormProps {
  doctor?: HospitalDoctor;
  onSubmit: (data: Omit<HospitalDoctor, "id">) => void;
  onCancel?: () => void;
}

const HospitalDoctorForm: React.FC<HospitalDoctorFormProps> = ({
  doctor,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState<number | undefined>(undefined);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    if (doctor) {
      setName(doctor.name);
      setSpecialization(doctor.specialization);
      setExperience(doctor.experience);
      setProfilePic(doctor.profilePic || "");
    }
  }, [doctor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      specialization,
      experience,
      profilePic,
      hospitalId: doctor?.hospitalId || "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="text"
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="number"
        placeholder="Experience (years)"
        value={experience ?? ""}
        onChange={(e) => setExperience(Number(e.target.value))}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {doctor ? "Update" : "Add"} Doctor
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default HospitalDoctorForm;
