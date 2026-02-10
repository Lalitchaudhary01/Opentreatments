"use client";

interface Props {
  isOpen: boolean;
  onChange: (v: boolean) => void;
}

export function StepAvailability({ isOpen, onChange }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span>Status:</span>
      <button
        onClick={() => onChange(!isOpen)}
        className={`px-4 py-2 rounded ${isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
      >
        {isOpen ? "Open" : "Closed"}
      </button>
    </div>
  );
}
