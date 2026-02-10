"use client";

import { useEffect, useState } from "react";
import { getServices } from "../actions";
import { Service } from "../types";
import ServiceCard from "./ServiceCard";
import ServiceForm from "./ServiceForm";

export default function ServiceList() {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);

  const load = () => getServices().then(setItems);

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <ServiceForm
        initial={editing}
        onDone={() => {
          setEditing(null);
          load();
        }}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((s) => (
          <ServiceCard key={s.id} service={s} onEdit={setEditing} />
        ))}
      </div>
    </div>
  );
}
