"use client";
import { useCompare } from "../hooks/useCompare";
import Link from "next/link";

export default function CompareDrawer() {
  const { compareList, removeFromCompare, resetCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between items-center shadow-lg">
      <div>Comparing {compareList.length} hospitals</div>
      <div className="space-x-2">
        <button
          onClick={resetCompare}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear
        </button>
        <Link
          href={`/compare?ids=${compareList.join(",")}`}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          View Comparison
        </Link>
      </div>
    </div>
  );
}
