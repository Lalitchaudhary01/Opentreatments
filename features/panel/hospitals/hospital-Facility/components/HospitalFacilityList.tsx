"use client";

import { useEffect, useState } from "react";
import { HospitalFacility } from "../types/hospitalFacility";
import {
  getFacilities,
  addFacility,
  updateFacility,
  deleteFacility,
} from "../actions/hospitalFacilityActions";
import HospitalFacilityCard from "./HospitalFacilityCard";
import HospitalFacilityForm from "./HospitalFacilityForm";
import { Button } from "@/components/ui/button";

export default function HospitalFacilityList() {
  const [facilities, setFacilities] = useState<HospitalFacility[]>([]);
  const [editing, setEditing] = useState<HospitalFacility | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadFacilities();
  }, []);

  async function loadFacilities() {
    const res = await getFacilities();
    setFacilities(res);
  }

  async function handleAdd(
    values: Omit<HospitalFacility, "id" | "hospitalId">
  ) {
    await addFacility(values);
    setShowForm(false);
    loadFacilities();
  }

  async function handleUpdate(values: Omit<HospitalFacility, "hospitalId">) {
    if (!editing) return;
    await updateFacility({ ...values, id: editing.id });
    setEditing(null);
    loadFacilities();
  }

  async function handleDelete(id: string) {
    await deleteFacility(id);
    loadFacilities();
  }

  return (
    <div className="space-y-4">
      {!showForm && !editing && (
        <Button onClick={() => setShowForm(true)}>+ Add Facility</Button>
      )}

      {(showForm || editing) && (
        <HospitalFacilityForm
          defaultValues={editing || undefined}
          onSubmit={editing ? handleUpdate : handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      <div className="space-y-3">
        {facilities.map((facility) => (
          <HospitalFacilityCard
            key={facility.id}
            facility={facility}
            onEdit={(f) => setEditing(f)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
