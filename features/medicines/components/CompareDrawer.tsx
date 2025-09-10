import { useCompare } from "../hooks/useCompare";

export default function CompareDrawer() {
  const { items, removeItem, clear } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Compare List</h2>
        <button onClick={clear} className="text-sm text-red-500">
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((med) => (
          <div key={med.id} className="border rounded p-2">
            <p className="font-semibold">{med.name}</p>
            <p className="text-sm">{med.strength}</p>
            <p className="text-sm">₹{med.price}</p>
            <button
              onClick={() => removeItem(med.id)}
              className="mt-1 text-xs text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
