// /app/doctors/compare/page.tsx
import CompareDrawer from "@/features/IndependentDoctors/compoents/CompareDrawer";
import { useCompare } from "@/features/IndependentDoctors/hooks/useCompare";
import React from "react";

const ComparePage = () => {
  const { compareList, removeDoctor, clearCompare } = useCompare();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Compare Doctors</h1>
      <CompareDrawer
        compareList={compareList}
        removeDoctor={removeDoctor}
        onClose={clearCompare}
      />
    </div>
  );
};

export default ComparePage;
