"use client";

import { useState } from "react";
import { Insurance, UpsertInsuranceInput } from "../types";
import { upsertInsurance } from "../actions";

export default function InsuranceForm({
  initial,
  onDone,
}: {
  initial?: Insurance | null;
  onDone?: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [provider, setProvider] = useState(initial?.provider || "");
  const [cashless, setCashless] = useState(initial?.cashless || false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const payload: UpsertInsuranceInput = {
      name,
      provider,
      cashless,
    };

    try {
      await upsertInsurance(initial?.id ?? null, payload);
      onDone?.();
      setName("");
      setProvider("");
      setCashless(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        className="w-full border rounded p-2"
        placeholder="Insurance name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border rounded p-2"
        placeholder="Provider (optional)"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={cashless}
          onChange={(e) => setCashless(e.target.checked)}
        />
        Cashless available
      </label>

      <button
        onClick={submit}
        disabled={loading || !name}
        className="px-4 py-2 rounded bg-cyan-600 text-white"
      >
        {initial ? "Update" : "Add"} Insurance
      </button>
    </div>
  );
}
