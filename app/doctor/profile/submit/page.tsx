// app/doctor/profile/create/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { DoctorProfileForm } from "@/features/panel/doctor/onboarding/onboarding";

export default async function CreateDoctorProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const existing = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });

  // Agar pehle se profile hai, create mat dikhao
  if (existing) {
    return (
      <div className="p-6">
        <p className="text-yellow-600">
          Profile already exists. You can edit it instead.
        </p>
      </div>
    );
  }

  return <DoctorProfileForm mode="create" />;
}
