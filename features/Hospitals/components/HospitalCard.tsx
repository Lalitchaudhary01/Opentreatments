"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Hospital } from "../types/hospital";
import { Button } from "@/components/ui/button";

interface Props {
  hospital: Hospital;
}

export default function HospitalCard({ hospital }: Props) {
  const [selectedForCompare, setSelectedForCompare] = useState(false);

  // Check if hospital is already in compare list
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("compareHospitals") || "[]");
    setSelectedForCompare(stored.includes(hospital.id));
  }, [hospital.id]);

  const toggleCompare = () => {
    const stored: string[] = JSON.parse(
      localStorage.getItem("compareHospitals") || "[]"
    );
    let updated: string[];

    if (stored.includes(hospital.id)) {
      updated = stored.filter((id) => id !== hospital.id);
      setSelectedForCompare(false);
    } else {
      if (stored.length >= 3) {
        alert("You can compare up to 3 hospitals only!");
        return;
      }
      updated = [...stored, hospital.id];
      setSelectedForCompare(true);
    }

    localStorage.setItem("compareHospitals", JSON.stringify(updated));
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md space-y-2">
      <Link
        href={`/Hospitals/${hospital.slug}`}
        className="text-xl font-semibold text-blue-600"
      >
        {hospital.name}
      </Link>
      <p>
        {hospital.city}, {hospital.state}
      </p>
      <p>{hospital.description}</p>

      <div className="flex space-x-2">
        <Button
          variant={selectedForCompare ? "secondary" : "default"}
          onClick={toggleCompare}
        >
          {selectedForCompare ? "Remove from Compare" : "Add to Compare"}
        </Button>
        <Link href={`/Hospitals/${hospital.slug}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </div>
  );
}
