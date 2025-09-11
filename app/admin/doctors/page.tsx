"use client";

import { useEffect, useState } from "react";
// import type { IndependentDoctor } from "@/features/admin/doctors/types/independentDoctor";
import Link from "next/link";
import { getDoctors } from "@/features/admin/IndependentDoctors/actions/getDoctors";
import type { IndependentDoctor } from "@/features/admin/IndependentDoctors/types/independentDoctor";

export default function DoctorsListPage() {
  const [doctors, setDoctors] = useState<IndependentDoctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const result = await getDoctors();
      setDoctors(result);
    };
    fetchDoctors();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Doctors List</h1>
      <Link
        href="/admin/doctors/add"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add New Doctor
      </Link>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td className="border p-2 text-blue-500 hover:underline">
                <Link href={`/admin/doctors/${doc.id}`}>{doc.name}</Link>
              </td>
              <td className="border p-2">{doc.specialization}</td>
              <td className="border p-2">{doc.city || "-"}</td>
              <td className="border p-2">
                <Link
                  href={`/admin/doctors/${doc.id}/edit`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
