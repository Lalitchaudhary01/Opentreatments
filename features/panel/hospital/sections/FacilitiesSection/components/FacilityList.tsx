"use client";

import { useEffect, useState } from "react";
import { Facility } from "../types";
import FacilityCard from "./FacilityCard";
import FacilityForm from "./FacilityForm";
import { getFacilities } from "../actions";

export default function FacilityList() {
  const [items, setItems] = useState<Facility[]>([]);
  const [editing, setEditing] = useState<Facility | null>(null);

  useEffect(() => {
    getFacilities().then(setItems);
  }, []);

  return (
    <div className="space-y-6">
      <FacilityForm
        initial={editing}
        onDone={() => {
          setEditing(null);
          getFacilities().then(setItems);
        }}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((f) => (
          <FacilityCard key={f.id} facility={f} onEdit={setEditing} />
        ))}
      </div>
    </div>
  );
}
