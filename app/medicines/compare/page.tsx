"use client";

import { CompareDrawer } from "@/features/medicines/components/CompareDrawer";
import { useCompare } from "@/features/medicines/hooks/useCompare";

export default function ComparePage() {
  const { compareList, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-muted-foreground">
          No medicines selected for comparison.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Compare Medicines</h1>
      <CompareDrawer medicines={compareList} onClear={clearCompare} />
    </div>
  );
}
