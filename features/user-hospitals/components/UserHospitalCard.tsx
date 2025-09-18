"use client"
import { UserHospital } from "../types/userHospital";

type Props = {
  hospital: UserHospital;
};

export default function UserHospitalCard({ hospital }: Props) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        {hospital.logo && (
          <img
            src={hospital.logo}
            alt={hospital.name}
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <div>
          <h2 className="text-xl font-bold">{hospital.name}</h2>
          <p className="text-sm text-gray-500">
            {hospital.city}, {hospital.state}
          </p>
        </div>
      </div>

      {/* Doctors */}
      {hospital.doctors.length > 0 && (
        <div className="mt-2">
          <strong>Doctors:</strong>{" "}
          {hospital.doctors.map((d) => d.name).join(", ")}
        </div>
      )}

      {/* Procedures */}
      {hospital.procedures.length > 0 && (
        <div className="mt-1">
          <strong>Procedures:</strong>{" "}
          {hospital.procedures.map((p) => p.name).join(", ")}
        </div>
      )}
    </div>
  );
}
