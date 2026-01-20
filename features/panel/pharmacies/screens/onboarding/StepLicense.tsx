"use client";

import { PharmacyProfileInput } from "@/features/panel/pharmacy/types";

interface Props {
  value: Partial<PharmacyProfileInput>;
  onChange: (v: Partial<PharmacyProfileInput>) => void;
}

export function StepLicense({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        placeholder="License Number"
        value={value.licenseNumber || ""}
        onChange={(e) => onChange({ ...value, licenseNumber: e.target.value })}
      />
      <input
        placeholder="GST Number (optional)"
        value={value.gstNumber || ""}
        onChange={(e) => onChange({ ...value, gstNumber: e.target.value })}
      />
    </div>
  );
}
