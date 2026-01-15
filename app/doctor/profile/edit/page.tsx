// app/doctor/profile/edit/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { DoctorProfileForm } from "@/features/panel/doctor/screens/onboarding";

export default async function EditDoctorProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const profile = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    return (
      <div className="p-6 text-red-600">
        No profile found. Please create one first.
      </div>
    );
  }

  if (profile.status !== "APPROVED") {
    return (
      <div className="p-6 text-yellow-600">
        You can edit only after approval.
      </div>
    );
  }

  return (
    <DoctorProfileForm
      mode="edit"
      initialData={{
        name: profile.name,
        gender: profile.gender,
        specialization: profile.specialization,
        specialties: profile.specialties,
        experience: profile.experience,
        city: profile.city,
        fees: profile.fees,
        languages: profile.languages,
        availability: profile.availability,
        profilePic: profile.profilePic,
      }}
    />
  );
}
