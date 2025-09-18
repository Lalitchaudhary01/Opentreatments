"use client";

import { useEffect, useState } from "react";
import { getProcedures } from "../actions/hospitalProcedureActions";
import { HospitalProcedure } from "../types/hospitalProcedure";
import HospitalProcedureCard from "./HospitalProcedureCard";
import HospitalProcedureForm from "./HospitalProcedureForm";
import { Button } from "@/components/ui/button";

interface Props {
  hospitalId: string;
}

export default function HospitalProcedureList({ hospitalId }: Props) {
  const [procedures, setProcedures] = useState<HospitalProcedure[]>([]);
  const [editing, setEditing] = useState<HospitalProcedure | null>(null);
  const [adding, setAdding] = useState(false);

  const loadData = async () => {
    const data = await getProcedures(hospitalId);
    setProcedures(data);
    setEditing(null);
    setAdding(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Hospital Procedures</h2>
        {!adding && <Button onClick={() => setAdding(true)}>+ Add Procedure</Button>}
      </div>

      {adding && <HospitalProcedureForm hospitalId={hospitalId} onSuccess={loadData} />}

      {editing && (
        <HospitalProcedureForm
          hospitalId={hospitalId}
          procedure={editing}
          onSuccess={loadData}
        />
      )}

      <div className="space-y-3">
        {procedures.map((proc) => (
          <HospitalProcedureCard
            key={proc.id}
            procedure={proc}
            onEdit={() => setEditing(proc)}
            onDelete={loadData}
          />
        ))}
      </div>
    </div>
  );
}
