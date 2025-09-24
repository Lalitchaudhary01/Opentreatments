"use client";
import { useState } from "react";
import { InsurancePlan, CoverageDetails } from "../types/insurancePlan";

interface InsurancePlanFormProps {
  initialData?: InsurancePlan;
  onSubmit: (
    data: Omit<InsurancePlan, "id" | "createdAt" | "updatedAt" | "claims">
  ) => void;
  onCancel?: () => void;
}

export default function InsurancePlanForm({
  initialData,
  onSubmit,
  onCancel,
}: InsurancePlanFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [premium, setPremium] = useState(initialData?.premium || 0);
  const [coverageDetails, setCoverageDetails] = useState<CoverageDetails>(
    initialData?.coverageDetails || {
      diseasesCovered: [],
      exclusions: [],
      hospitalNetwork: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      companyId: initialData?.companyId || "",
      name,
      description,
      premium,
      coverageAmount: initialData?.coverageAmount || 0, // You can add a field in the form for this
      tenure: initialData?.tenure || 12, // Optional default
      status: initialData?.status || "ACTIVE",
      coverageDetails,
    });
  };

  const updateCoverageField = (field: keyof CoverageDetails, value: string) => {
    setCoverageDetails({
      ...coverageDetails,
      [field]: value.split(",").map((s) => s.trim()),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow rounded-lg"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Plan Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Premium</label>
        <input
          type="number"
          value={premium}
          onChange={(e) => setPremium(parseFloat(e.target.value))}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Diseases Covered (comma separated)
        </label>
        <input
          type="text"
          value={coverageDetails.diseasesCovered.join(", ")}
          onChange={(e) =>
            updateCoverageField("diseasesCovered", e.target.value)
          }
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Cancer, Diabetes, Accidents"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Exclusions (comma separated)
        </label>
        <input
          type="text"
          value={coverageDetails.exclusions.join(", ")}
          onChange={(e) => updateCoverageField("exclusions", e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Pre-existing for 2 years"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Hospital Network (comma separated)
        </label>
        <input
          type="text"
          value={coverageDetails.hospitalNetwork.join(", ")}
          onChange={(e) =>
            updateCoverageField("hospitalNetwork", e.target.value)
          }
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Hospital A, Hospital B"
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {initialData ? "Update Plan" : "Add Plan"}
        </button>
      </div>
    </form>
  );
}
