"use client";

import { useState } from "react";

interface Item {
  name: string;
  quantity: number;
}

interface Props {
  items: Item[];
  onChange: (items: Item[]) => void;
}

export function StepInventory({ items, onChange }: Props) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);

  const add = () => {
    if (!name) return;
    onChange([...items, { name, quantity: qty }]);
    setName("");
    setQty(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input placeholder="Medicine name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" value={qty} onChange={(e) => setQty(+e.target.value)} />
        <button onClick={add} className="px-3 py-2 border rounded">Add</button>
      </div>

      <ul className="text-sm space-y-1">
        {items.map((i, idx) => (
          <li key={idx}>{i.name} – {i.quantity}</li>
        ))}
      </ul>
    </div>
  );
}
