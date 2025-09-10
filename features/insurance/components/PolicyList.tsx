"use client";

import PolicyCard from "./PolicyCard";
import { useInsurance } from "../hooks/useInsurance";

export default function PolicyList() {
  const { policies, fetchPolicy } = useInsurance();

  if (policies.length === 0) {
    return (
      <p className="text-center text-muted-foreground">No policies found.</p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {policies.map((policy) => (
        <PolicyCard
          key={policy.id}
          policy={policy}
          onView={(id) => fetchPolicy(id)}
        />
      ))}
    </div>
  );
}
