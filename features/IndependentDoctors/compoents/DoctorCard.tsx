// /features/doctors/components/DoctorCard.tsx
import React from "react";
import { IndependentDoctor } from "../types/IndependentDoctor";

interface DoctorCardProps {
  doctor: IndependentDoctor;
  onCompare?: (doctor: IndependentDoctor) => void;
  onViewProfile?: (id: string) => void; // ✅ id use karo
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onCompare,
  onViewProfile,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <img
          src={doctor.profilePic || "/default-avatar.png"}
          alt={doctor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialization}</p>
          <p className="text-sm text-gray-500">
            {doctor.city || "Location not specified"}
          </p>
          <p className="text-sm text-yellow-500">
            ⭐ {doctor.rating} ({doctor.totalReviews} reviews)
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onCompare && onCompare(doctor)}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Compare
        </button>
        <button
          onClick={() => onViewProfile && onViewProfile(doctor.id)} // ✅ id use karo
          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
