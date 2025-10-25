import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import HospitalEstimateList from "@/features/panel/hospitals/hospital-Estimate/components/HospitalEstimateList";

export default async function HospitalEstimatesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL") {
    return <p>Unauthorized</p>;
  }

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });

  if (!hospital) {
    return <p>No hospital linked to this account.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Insurance Estimates</h1>
      <HospitalEstimateList hospitalId={hospital.id} />
    </div>
  );
}
