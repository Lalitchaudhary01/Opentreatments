import { InsuranceStatus } from "../types/insuranceProfile";

interface InsuranceStatusBadgeProps {
  status: InsuranceStatus;
}

export default function InsuranceStatusBadge({
  status,
}: InsuranceStatusBadgeProps) {
  let colorClass = "";

  switch (status) {
    case InsuranceStatus.PENDING:
      colorClass = "bg-yellow-200 text-yellow-800";
      break;
    case InsuranceStatus.APPROVED:
      colorClass = "bg-green-200 text-green-800";
      break;
    case InsuranceStatus.REJECTED:
      colorClass = "bg-red-200 text-red-800";
      break;
    default:
      colorClass = "bg-gray-200 text-gray-800";
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-semibold ${colorClass}`}
    >
      {status}
    </span>
  );
}
