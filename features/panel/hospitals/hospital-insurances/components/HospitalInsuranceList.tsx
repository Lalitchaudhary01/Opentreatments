"use client";

import { useEffect, useState } from "react";
import { getInsurances } from "../actions/hospitalInsuranceActions";
import { HospitalInsurance } from "../types/hospitalInsurance";
import HospitalInsuranceCard from "./HospitalInsuranceCard";
import HospitalInsuranceForm from "./HospitalInsuranceForm";
import { Button } from "@/components/ui/button";

export default function HospitalInsuranceList() {
  const [insurances, setInsurances] = useState<HospitalInsurance[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<HospitalInsurance | null>(null);

  async function load() {
    const data = await getInsurances();
    setInsurances(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <Button
        onClick={() => {
          setShowForm(!showForm);
          setEditing(null);
        }}
      >
        {showForm ? "Cancel" : "Add Insurance"}
      </Button>

      {showForm && (
        <HospitalInsuranceForm
          insurance={editing || undefined}
          onSuccess={() => {
            load();
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      <div className="grid gap-3">
        {insurances.map((insurance) => (
          <HospitalInsuranceCard
            key={insurance.id}
            insurance={insurance}
            onDeleted={load}
            onEdit={() => {
              setEditing(insurance);
              setShowForm(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}
