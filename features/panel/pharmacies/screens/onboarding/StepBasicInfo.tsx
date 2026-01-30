"use client";

import { useState } from "react";
import { PharmacyProfileInput } from "../../types";

interface Props {
  value: Partial<PharmacyProfileInput>;
  onChange: (v: Partial<PharmacyProfileInput>) => void;
}

export function StepBasicInfo({ value, onChange }: Props) {
  const bind =
    (key: keyof PharmacyProfileInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...value, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        placeholder="Pharmacy Name"
        value={value.name || ""}
        onChange={bind("name")}
      />
      <input
        placeholder="Owner Name"
        value={value.ownerName || ""}
        onChange={bind("ownerName")}
      />
      <input
        placeholder="Phone"
        value={value.phone || ""}
        onChange={bind("phone")}
      />
      <input
        placeholder="Email"
        value={value.email || ""}
        onChange={bind("email")}
      />
      <input
        placeholder="Address"
        value={value.address || ""}
        onChange={bind("address")}
      />
      <input
        placeholder="City"
        value={value.city || ""}
        onChange={bind("city")}
      />
      <input
        placeholder="State"
        value={value.state || ""}
        onChange={bind("state")}
      />
    </div>
  );
}
