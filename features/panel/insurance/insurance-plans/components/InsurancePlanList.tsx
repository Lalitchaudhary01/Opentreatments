"use client";
import { useState } from "react";

import InsurancePlanCard from "./InsurancePlanCard";
import InsurancePlanForm from "./InsurancePlanForm";
import { InsurancePlan } from "../types/insurancePlan"; // 👈 yaha se import karein

interface InsurancePlanListProps {
  plans: InsurancePlan[];
  onAdd: (
    data: Omit<InsurancePlan, "id" | "createdAt" | "updatedAt" | "claims">
  ) => void;
  onUpdate: (id: string, data: Partial<InsurancePlan>) => void;
  onDelete: (id: string) => void;
}

export default function InsurancePlanList({
  plans,
  onAdd,
  onUpdate,
  onDelete,
}: InsurancePlanListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editPlan, setEditPlan] = useState<InsurancePlan | null>(null); // ✅ correct type

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Insurance Plans</h2>
        <button
          onClick={() => {
            setEditPlan(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Plan
        </button>
      </div>

      {showForm && (
        <InsurancePlanForm
          initialData={editPlan || undefined}
          onSubmit={(data) => {
            if (editPlan) {
              onUpdate(editPlan.id, data);
            } else {
              onAdd(data);
            }
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <InsurancePlanCard
            key={plan.id}
            plan={plan}
            onEdit={(p) => {
              setEditPlan(p);
              setShowForm(true);
            }}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
