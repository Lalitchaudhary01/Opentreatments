"use client";
import Link from "next/link";
import type { Hospital } from "../types/hospital";

interface Props {
  hospital: Hospital;
}

export default function HospitalCard({ hospital }: Props) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <Link
        href={`/Hospitals/${hospital.slug}`}
        className="text-xl font-bold text-blue-600"
      >
        {hospital.name}
      </Link>
      <p>
        {hospital.city}, {hospital.state}
      </p>
      <p>{hospital.phone}</p>
      <p className="text-sm text-gray-600">
        {hospital.description?.slice(0, 100)}...
      </p>
    </div>
  );
}
