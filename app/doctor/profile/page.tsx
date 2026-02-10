import { DoctorProfileView } from "@/features/panel/doctor/screens/dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export default async function DoctorProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!doctor) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Profile not found</h2>
        <p className="text-muted-foreground">
          Please complete your onboarding first.
        </p>
      </div>
    );
  }

  return <DoctorProfileView profile={doctor as any} />;
}
