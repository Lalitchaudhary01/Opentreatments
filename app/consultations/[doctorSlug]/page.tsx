import { getServerSession } from "next-auth";
// apna next-auth config
import ConsultationBookingForm from "@/features/consultations/components/ConsultationBookingForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ConsultationPageProps {
  params: { doctorSlug: string };
}

export default async function ConsultationPage({
  params,
}: ConsultationPageProps) {
  const { doctorSlug } = params;

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return <div className="p-6">Please log in to book a consultation.</div>;
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        Book Consultation with Dr. {doctorSlug}
      </h1>

      <ConsultationBookingForm doctorId={doctorSlug} userId={userId} />
    </div>
  );
}
