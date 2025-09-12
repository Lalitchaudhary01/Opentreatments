export default function ConsultationStatusBadge({
  status,
}: {
  status: string;
}) {
  const colorMap: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    COMPLETED: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded ${
        colorMap[status] || "bg-gray-200"
      }`}
    >
      {status}
    </span>
  );
}
