import { PharmacyStatus } from "@prisma/client";
import { pharmacyStatusConfig } from "../../../utils";
// import { pharmacyStatusConfig } from "@/features/panel/pharmacy/utils";

interface Props {
  status: PharmacyStatus;
}

export function PharmacyStatusBadge({ status }: Props) {
  const cfg = pharmacyStatusConfig[status];

  const colorMap: Record<string, string> = {
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        colorMap[cfg.color]
      }`}
    >
      {cfg.label}
    </span>
  );
}
