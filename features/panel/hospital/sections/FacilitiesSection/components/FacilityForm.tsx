"use client";

import { useState } from "react";
import { CreateFacilityInput, Facility } from "../types";
import { addFacility, updateFacility } from "../actions";

export default function FacilityForm({
  initial,
  onDone,
}: {
  initial?: Facility | null;
  onDone?: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const payload: CreateFacilityInput = { name, description };
    try {
      if (initial) await updateFacility(initial.id, payload);
      else await addFacility(payload);
      onDone?.();
      setName("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        className="w-full border rounded p-2"
        placeholder="Facility name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Description (optional)"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={submit}
        disabled={loading || !name}
        className="px-4 py-2 rounded bg-cyan-600 text-white"
      >
        {initial ? "Update" : "Add"} Facility
      </button>
    </div>
  );
}
