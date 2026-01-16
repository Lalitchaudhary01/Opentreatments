"use client";

import { useEffect, useState } from "react";
import { getProcedures } from "../actions";
import { Procedure } from "../types";
import ProcedureCard from "./ProcedureCard";
import ProcedureForm from "./ProcedureForm";

export default function ProcedureList() {
  const [items, setItems] = useState<Procedure[]>([]);
  const [editing, setEditing] = useState<Procedure | null>(null);

  const load = () => getProcedures().then(setItems);

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <ProcedureForm
        initial={editing}
        onDone={() => {
          setEditing(null);
          load();
        }}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((p) => (
          <ProcedureCard key={p.id} procedure={p} onEdit={setEditing} />
        ))}
      </div>
    </div>
  );
}
