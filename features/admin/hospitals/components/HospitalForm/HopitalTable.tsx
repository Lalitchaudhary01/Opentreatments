"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getHospitals } from "../../actions/getHospitals";
import { deleteHospital } from "../../actions/deleteHospital";
import type { Hospital } from "../../types/hospital";

export default function HospitalTable() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  async function loadHospitals() {
    const data = await getHospitals();
    setHospitals(data);
  }

  useEffect(() => {
    loadHospitals();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this hospital?")) return;
    await deleteHospital(id);
    loadHospitals();
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Hospitals</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2">City</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((h) => (
            <tr key={h.id} className="border-t hover:bg-gray-50 cursor-pointer">
              <td className="p-2">
                <Link
                  href={`/admin/hospitals/${h.id}/edit`}
                  className="text-blue-600"
                >
                  {h.name}
                </Link>
              </td>
              <td className="p-2">{h.city}</td>
              <td className="p-2">{h.phone}</td>
              <td className="p-2 space-x-2">
                {/* Edit button removed */}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(h.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
