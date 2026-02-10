"use client";

import { useState } from "react";
import { Procedure, UpsertProcedureInput } from "../types";
import { upsertProcedure } from "../actions";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ProcedureForm({
  initial,
  onDone,
}: {
  initial?: Procedure | null;
  onDone?: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [cost, setCost] = useState<number | undefined>(
    initial?.cost != null ? initial.cost : undefined
  );
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
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
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
