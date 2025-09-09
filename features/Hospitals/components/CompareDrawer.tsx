"use client";

import { useCompare } from "../hooks/useCompare";
import Link from "next/link";

export default function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border shadow p-4 w-80 rounded space-y-2">
      <h4 className="font-semibold">Compare Hospitals</h4>
      {compareList.map((h) => (
        <div
          key={h.id}
          className="flex justify-between items-center border-b py-1"
        >
          <span>{h.name}</span>
          <button
            onClick={() => removeFromCompare(h.id)}
            className="text-red-600"
          >
            x
          </button>
        </div>
      ))}
      <div className="flex justify-between mt-2">
        <button
          onClick={clearCompare}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          Clear
        </button>
        <Link
          href="/compare"
          className="bg-blue-600 text-white px-2 py-1 rounded"
        >
          Go to Compare
        </Link>
      </div>
    </div>
  );
}
