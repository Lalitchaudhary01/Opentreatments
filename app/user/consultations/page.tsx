import { getMyConsultations } from "@/features/user-doctors/actions/getMyConsultations";

export default async function UserConsultationsPage() {
  let consultations: Awaited<ReturnType<typeof getMyConsultations>> = [];
  try {
    consultations = await getMyConsultations();
  } catch {
    return (
      <div className="p-6">
        <p>You need to be logged in to view your consultations.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Consultations</h1>
      {consultations.length === 0 ? (
        <p>You have no consultations.</p>
      ) : (
        consultations.map((c) => (
          <div
            key={c.id}
            className={`border p-4 rounded-lg space-y-2 ${
              c.status === "APPROVED"
                ? "border-green-500"
                : c.status === "REJECTED"
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <p>
              <strong>Doctor:</strong> {c.doctorName || "Unknown"}
            </p>
            <p>
              <strong>Slot:</strong> {new Date(c.slot).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  c.status === "APPROVED"
                    ? "text-green-600"
                    : c.status === "REJECTED"
                    ? "text-red-600"
                    : "text-gray-800"
                }
              >
                {c.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
