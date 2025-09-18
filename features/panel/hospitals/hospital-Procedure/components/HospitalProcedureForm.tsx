"use client";

import { useState } from "react";
import {
  addProcedure,
  updateProcedure,
} from "../actions/hospitalProcedureActions";
import { HospitalProcedure } from "../types/hospitalProcedure";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  hospitalId: string;
  procedure?: HospitalProcedure;
  onSuccess: () => void;
}

export default function HospitalProcedureForm({
  hospitalId,
  procedure,
  onSuccess,
}: Props) {
  const [name, setName] = useState(procedure?.name || "");
  const [description, setDescription] = useState(procedure?.description || "");
  const [cost, setCost] = useState(procedure?.cost?.toString() || "");
  const [duration, setDuration] = useState(procedure?.duration || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (procedure) {
      await updateProcedure(procedure.id, {
        name,
        description,
        cost: parseFloat(cost),
        duration,
      });
    } else {
      await addProcedure(hospitalId, {
        name,
        description,
        cost: parseFloat(cost),
        duration,
      });
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Procedure Name"
        required
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <Input
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Cost"
        type="number"
      />
      <Input
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (e.g. 2 hours)"
      />

      <Button type="submit">{procedure ? "Update" : "Add"} Procedure</Button>
    </form>
  );
}
