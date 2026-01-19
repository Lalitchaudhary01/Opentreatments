"use client";

import { useState } from "react";
import { Procedure, UpsertProcedureInput } from "../types";
import { upsertProcedure } from "../actions";

export default function ProcedureForm({
  initial,
  onDone,
}: {
  initial?: Procedure | null;
  onDone?: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [cost, setCost] = useState<number | undefined>(initial?.cost);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const payload: UpsertProcedureInput = { name, description, cost };
      await upsertProcedure(initial?.id ?? null, payload);
      onDone?.();
      setName("");
      setDescription("");
      setCost(undefined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        value={cost ?? ""}
        onChange={(e) =>
          setCost(e.target.value ? Number(e.target.value) : undefined)
        }
      />
      <button onClick={submit}>{initial ? "Update" : "Add"} Procedure</button>
    </div>
  );
}
