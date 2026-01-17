"use client";

import { useState } from "react";
import { Service, UpsertServiceInput } from "../types";
import { upsertService } from "../actions";

export default function ServiceForm({
  initial,
  onDone,
}: {
  initial?: Service | null;
  onDone?: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [cost, setCost] = useState<number | undefined>(
    initial?.cost ?? undefined
  );
  const [description, setDescription] = useState(
    initial?.description || ""
  );
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const payload: UpsertServiceInput = {
      name,
      cost,
      description,
    };

    try {
      await upsertService(initial?.id ?? null, payload);
      onDone?.();
      setName("");
      setCost(undefined);
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        className="w-full border rounded p-2"
        placeholder="Service name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        className="w-full border rounded p-2"
        placeholder="Cost (optional)"
        value={cost ?? ""}
        onChange={(e) =>
          setCost(e.target.value ? Number(e.target.value) : undefined)
        }
      />

      <textarea
        className="w-full border rounded p-2"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading || !name}
        className="px-4 py-2 rounded bg-cyan-600 text-white"
      >
        {initial ? "Update" : "Add"} Service
      </button>
    </div>
  );
}
