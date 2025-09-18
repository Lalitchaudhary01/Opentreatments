"use client";

import { useEffect, useState } from "react";

import HospitalServiceCard from "./HospitalServiceCard";
import HospitalServiceForm from "./HospitalServiceForm";
import {
  addService,
  getServices,
  updateService,
  deleteService,
} from "../actions/hospitalServiceActions";
import { HospitalService } from "../types/hospitalServices";

export default function HospitalServiceList() {
  const [services, setServices] = useState<HospitalService[]>([]);
  const [editing, setEditing] = useState<HospitalService | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getServices();
      setServices(data);
    }
    fetchData();
  }, []);

  const handleAdd = async (data: any) => {
    const newService = await addService(data);
    setServices([...services, newService]);
    setShowForm(false);
  };

  const handleUpdate = async (data: any) => {
    if (!editing) return;
    const updated = await updateService(editing.id, data);
    setServices(services.map((s) => (s.id === editing.id ? updated : s)));
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteService(id);
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Hospital Services</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Service
        </button>
      </div>

      {showForm && (
        <HospitalServiceForm
          initialData={editing}
          onSubmit={editing ? handleUpdate : handleAdd}
          onCancel={() => {
            setEditing(null);
            setShowForm(false);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <HospitalServiceCard
            key={service.id}
            service={service}
            onEdit={(s) => {
              setEditing(s);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
