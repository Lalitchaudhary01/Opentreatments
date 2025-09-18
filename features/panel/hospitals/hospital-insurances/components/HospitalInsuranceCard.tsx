"use client";

import { HospitalInsurance } from "../types/hospitalInsurance";
import { deleteInsurance } from "../actions/hospitalInsuranceActions";
import { Button } from "@/components/ui/button";

interface Props {
  insurance: HospitalInsurance;
  onDeleted: () => void;
  onEdit: () => void;
}

export default function HospitalInsuranceCard({
  insurance,
  onDeleted,
  onEdit,
}: Props) {
  async function handleDelete() {
    await deleteInsurance(insurance.id);
    onDeleted();
  }

  return (
    <div className="p-4 border rounded-md shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{insurance.name}</h3>
        <p className="text-sm text-gray-600">
          {insurance.provider || "No provider"}
        </p>
        <p className="text-xs">
          {insurance.cashless ? "Cashless Available" : "Reimbursement Only"}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
