"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getHospitalById } from "@/features/user-hospitals/actions/getHospitalById";
import { UserHospital } from "@/features/user-hospitals/types/userHospital";

export default function UserHospitalPage() {
  const params = useParams();
  const router = useRouter();
  const [hospital, setHospital] = useState<UserHospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospital = async () => {
      if (!params.id) return;
      const data = await getHospitalById(params.id);
      if (!data) {
        alert("Hospital not found or not approved");
        router.push("/user/hospitals");
        return;
      }
      setHospital(data);
      setLoading(false);
    };
    fetchHospital();
  }, [params.id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!hospital) return <p className="p-6 text-red-500">Hospital not found.</p>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        {hospital.logo && (
          <img
            src={hospital.logo}
            alt={hospital.name}
            className="w-24 h-24 rounded object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{hospital.name}</h1>
          <p className="text-gray-500">
            {hospital.address}, {hospital.city}, {hospital.state}
          </p>
        </div>
      </div>

      {/* Doctors */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Doctors</h2>
        {hospital.doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          <ul className="list-disc list-inside">
            {hospital.doctors.map((d) => (
              <li key={d.id}>
                {d.name} - {d.specialization}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Procedures */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Procedures</h2>
        {hospital.procedures.length === 0 ? (
          <p>No procedures available.</p>
        ) : (
          <ul className="list-disc list-inside">
            {hospital.procedures.map((p) => (
              <li key={p.id}>
                {p.name} {p.cost ? `- ₹${p.cost}` : ""}{" "}
                {p.duration ? `(${p.duration})` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Request / Book Button */}
      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Request Estimate / Book Procedure
        </button>
      </div>
    </div>
  );
}
