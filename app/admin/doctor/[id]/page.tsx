import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminDoctorActions from "@/features/admin/doctors/components/AdminDoctorActions";

// ✅ Don't define a custom PageProps interface — type inline instead
export default async function AdminDoctorPage({
  params,
}: {
  params: { id: string };
}) {
  const doctor = await prisma.independentDoctor.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          email: true,
          phone: true,
        },
      },
    },
  });

  if (!doctor) return notFound();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Doctor Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{doctor.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{doctor.user.email}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <strong>Phone:</strong> {doctor.user.phone}
          </div>
          <div>
            <strong>Specialization:</strong> {doctor.specialization}
          </div>
          <div>
            <strong>Experience:</strong> {doctor.experience} years
          </div>
          <div>
            <strong>Status:</strong> {doctor.status}
          </div>

          {/* ✅ Client Component for actions */}
          <AdminDoctorActions
            doctorId={doctor.id}
            currentStatus={doctor.status as "PENDING" | "APPROVED" | "REJECTED"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
