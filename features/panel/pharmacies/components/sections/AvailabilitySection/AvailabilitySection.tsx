import { BaseCard } from "../../cards";

interface Props {
  isOpen: boolean;
  onToggle?: () => void;
}

export function AvailabilitySection({ isOpen, onToggle }: Props) {
  return (
    <div className="p-6">
      <BaseCard title="Availability">
        <div className="flex items-center justify-between">
          <span className="text-sm">
            Current Status:{" "}
            <strong className={isOpen ? "text-green-600" : "text-red-600"}>
              {isOpen ? "Open" : "Closed"}
            </strong>
          </span>

          <button
            onClick={onToggle}
            className="px-3 py-2 text-sm rounded-lg border hover:bg-muted"
          >
            Toggle
          </button>
        </div>
      </BaseCard>
    </div>
  );
}
