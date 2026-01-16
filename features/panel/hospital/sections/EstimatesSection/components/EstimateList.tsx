"use client";

import { useEffect, useState } from "react";
import { getEstimates } from "../actions";
import EstimateCard from "./EstimateCard";
import EstimateForm from "./EstimateForm";

export default function EstimateList() {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  const load = () => getEstimates().then(setItems);

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      {editing && (
        <EstimateForm
          initial={editing}
          onDone={() => {
            setEditing(null);
            load();
          }}
        />
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((e) => (
          <EstimateCard key={e.id} estimate={e} onEdit={setEditing} />
        ))}
      </div>
    </div>
  );
}
