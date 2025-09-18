"use client";

import React from "react";
import { HospitalDoctor } from "../types/hospitalDoctor";

interface HospitalDoctorCardProps {
  doctor: HospitalDoctor;
  onEdit: (doctor: HospitalDoctor) => void;
  onDelete: (id: string) => void;
}

const HospitalDoctorCard: React.FC<HospitalDoctorCardProps> = ({
  doctor,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col items-center">
      {doctor.profilePic && (
        <img
          src={doctor.profilePic}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
      )}
      <h3 className="text-lg font-semibold">{doctor.name}</h3>
      <p className="text-gray-500">{doctor.specialization}</p>
      {doctor.experience !== undefined && (
        <p className="text-gray-400">{doctor.experience} years experience</p>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(doctor)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(doctor.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HospitalDoctorCard;
