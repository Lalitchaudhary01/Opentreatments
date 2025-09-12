import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getConsultationsByUser } from "@/features/consultations/actions/getConsultationsByUser";
import ConsultationCard from "@/features/consultations/components/ConsultationCard";

import { getServerSession } from "next-auth";

export default async function MyConsultationsPage() {
  // ✅ Get logged in user
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">
          Please log in to view consultations.
        </h2>
      </div>
    );
  }

  // ✅ Fetch user consultations
  const consultations = await getConsultationsByUser(userId);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Consultations</h1>

      {consultations.length === 0 ? (
        <p className="text-gray-600">You don’t have any consultations yet.</p>
      ) : (
        <div className="space-y-4">
          {consultations.map((consultation) => (
            <ConsultationCard
              key={consultation.id}
              consultation={consultation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
