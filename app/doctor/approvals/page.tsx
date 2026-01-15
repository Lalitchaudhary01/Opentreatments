// app/doctor/approvals/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ApprovalsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!doctor) {
    return (
      <div className="p-6">
        <p className="text-yellow-600">You haven’t created a profile yet.</p>
        <Link href="/doctor/profile/create" className="text-blue-600 underline">
          Create your profile
        </Link>
      </div>
    );
  }

  if (doctor.status === "PENDING") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">Under Review</h2>
        <p className="text-muted-foreground">
          Your profile is being reviewed by our admin team.
        </p>
      </div>
    );
  }

  if (doctor.status === "REJECTED") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Profile Rejected
        </h2>
        <p className="mb-4">Please update your details and resubmit.</p>
        <Link href="/doctor/profile/edit" className="text-blue-600 underline">
          Edit Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-green-600 mb-2">
        Profile Approved
      </h2>
      <p>Your profile is live and visible to patients.</p>
    </div>
  );
}
