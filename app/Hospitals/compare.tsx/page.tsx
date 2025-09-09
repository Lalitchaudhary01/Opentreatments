"use client";

import { getHospitalById } from "@/features/Hospitals/actions/getHospitalById";
import { Hospital } from "@/features/Hospitals/types/hospital";
import { useEffect, useState } from "react";

export default function ComparePage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompareHospitals() {
      const ids: string[] = JSON.parse(
        localStorage.getItem("compareHospitals") || "[]"
      );
      const data: Hospital[] = [];

      for (const id of ids) {
        try {
          const hospital = await getHospitalById(id);
          if (hospital) data.push(hospital);
        } catch (err) {
          console.error(err);
        }
      }
      setHospitals(data);
      setLoading(false);
    }

    fetchCompareHospitals();
  }, []);

  if (loading) return <p>Loading comparison...</p>;
  if (hospitals.length === 0)
    return <p>No hospitals selected for comparison.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Compare Hospitals</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Attribute</th>
              {hospitals.map((h) => (
                <th key={h.id} className="border p-2">
                  {h.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 font-semibold">Facilities</td>
              {hospitals.map((h) => (
                <td key={h.id} className="border p-2">
                  {h.facilities.map((f) => f.name).join(", ") || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Services</td>
              {hospitals.map((h) => (
                <td key={h.id} className="border p-2">
                  {h.services.map((s) => s.name).join(", ") || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Insurance</td>
              {hospitals.map((h) => (
                <td key={h.id} className="border p-2">
                  {h.insurances.map((i) => i.name).join(", ") || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Doctors</td>
              {hospitals.map((h) => (
                <td key={h.id} className="border p-2">
                  {h.doctors.map((d) => d.name).join(", ") || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Procedures</td>
              {hospitals.map((h) => (
                <td key={h.id} className="border p-2">
                  {h.procedures.map((p) => p.name).join(", ") || "—"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
