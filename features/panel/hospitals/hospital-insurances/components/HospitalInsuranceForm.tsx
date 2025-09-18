"use client";

import { useState } from "react";
import {
  addInsurance,
  updateInsurance,
} from "../actions/hospitalInsuranceActions";
import { HospitalInsurance } from "../types/hospitalInsurance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  insurance?: HospitalInsurance;
  onSuccess?: () => void;
}

export default function HospitalInsuranceForm({ insurance, onSuccess }: Props) {
  const [name, setName] = useState(insurance?.name || "");
  const [provider, setProvider] = useState(insurance?.provider || "");
  const [cashless, setCashless] = useState(insurance?.cashless || false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (insurance) {
      await updateInsurance({ id: insurance.id, name, provider, cashless });
    } else {
      await addInsurance({ name, provider, cashless });
    }
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Insurance Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Provider"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Checkbox
          checked={cashless}
          onCheckedChange={(c) => setCashless(!!c)}
        />
        <span>Cashless Available</span>
      </div>
      <Button type="submit">
        {insurance ? "Update Insurance" : "Add Insurance"}
      </Button>
    </form>
  );
}
