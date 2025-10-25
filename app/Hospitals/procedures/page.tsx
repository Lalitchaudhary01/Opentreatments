import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import HospitalProcedureList from "@/features/panel/hospitals/hospital-Procedure/components/HospitalProcedureList";

export default async function HospitalProceduresPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL") {
    return (
      <p className="text-red-500">
        You must be logged in as a hospital to manage procedures.
      </p>
    );
  }

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });

  if (!hospital) {
    return (
      <p className="text-red-500">
        No hospital profile linked with this account.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Hospital Procedures</h1>
      <HospitalProcedureList hospitalId={hospital.id} />
    </div>
  );
}
