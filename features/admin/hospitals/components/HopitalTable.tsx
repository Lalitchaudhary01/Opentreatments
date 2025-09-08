"use client";

import { useEffect, useState } from "react";
import { getHospitals } from "../actions/getHospitals";
import { deleteHospital } from "../actions/deleteHospital";
import { Hospital } from "../types/hospital";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HospitalTable() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadHospitals() {
    setLoading(true);
    try {
      const data = await getHospitals();
      setHospitals(data);
    } catch (err) {
      console.error("❌ Error loading hospitals:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this hospital?")) return;
    try {
      await deleteHospital(id);
      loadHospitals();
    } catch (err) {
      console.error("❌ Error deleting hospital:", err);
    }
  }

  useEffect(() => {
    loadHospitals();
  }, []);

  if (loading) return <p>Loading hospitals...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">City</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id} className="border-t">
              <td className="px-4 py-2">{hospital.name}</td>
              <td className="px-4 py-2">{hospital.city}</td>
              <td className="px-4 py-2">{hospital.phone}</td>
              <td className="px-4 py-2">{hospital.email}</td>
              <td className="px-4 py-2 space-x-2">
                <Link href={`/admin/hospitals/${hospital.id}/edit`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(hospital.id)}
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
