"use client";

import { useEffect, useState } from "react";
import {
  addHospitalDoctor,
  getHospitalDoctors,
  removeHospitalDoctor,
  updateHospitalDoctor,
} from "../actions";
import { HospitalDoctor } from "../types";
import HospitalDoctorCard from "./HospitalDoctorCard";
import HospitalDoctorForm from "./HospitalDoctorForm";
import { Button } from "@/components/ui/button";

export default function HospitalDoctorList() {
  const [doctors, setDoctors] = useState<HospitalDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<HospitalDoctor | null>(null);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getHospitalDoctors();
    setDoctors(data as HospitalDoctor[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (data: any) => {
    await addHospitalDoctor(data);
    setAdding(false);
    load();
  };

  const handleUpdate = async (data: any) => {
    if (!editing) return;
    await updateHospitalDoctor(editing.id, data);
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    await removeHospitalDoctor(id);
    load();
  };

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Doctors</h2>
        <Button onClick={() => setAdding(true)}>Add Doctor</Button>
      </div>

      {adding && (
        <HospitalDoctorForm
          onSubmit={handleAdd}
          onCancel={() => setAdding(false)}
        />
      )}

      {editing && (
        <HospitalDoctorForm
          initial={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((d) => (
          <HospitalDoctorCard
            key={d.id}
            doctor={d}
            onEdit={() => setEditing(d)}
            onDelete={() => handleDelete(d.id)}
          />
        ))}
      </div>
    </div>
  );
}
