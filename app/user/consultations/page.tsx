// app/user/consultations/page.tsx
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function UserConsultationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="p-6">
        <p>You need to be logged in to view your consultations.</p>
      </div>
    );
  }

  // ✅ yahan session se user ko identify karo
  const userEmail = session.user.email;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return (
      <div className="p-6">
        <p>User not found.</p>
      </div>
    );
  }

  const consultations = await prisma.independentConsultation.findMany({
    where: { userId: user.id },
    include: { doctor: true },
    orderBy: { createdAt: "desc" },
  });

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
              <strong>Doctor:</strong> {c.doctor?.name || "Unknown"}
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
