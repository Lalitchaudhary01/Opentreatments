// app/user/doctor/[id]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookConsultationForm from "@/features/user-doctors/components/BookConsultationForm";

interface DoctorPageProps {
  params: { id: string };
}

export default async function UserDoctorPage({ params }: DoctorPageProps) {
  const doctor = await prisma.independentDoctor.findUnique({
    where: { id: params.id, status: "APPROVED" }, // ✅ only approved doctors
  });

  if (!doctor) return notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{doctor.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {doctor.specialization}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Specialties:</strong>{" "}
            {doctor.specialties?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Experience:</strong> {doctor.experience ?? 0} yrs
          </p>
          <p>
            <strong>City:</strong> {doctor.city ?? "N/A"}
          </p>
          <p>
            <strong>Fees:</strong> ₹{doctor.fees ?? "N/A"}
          </p>
          <p>
            <strong>Languages:</strong> {doctor.languages?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {doctor.rating} ({doctor.totalReviews}{" "}
            reviews)
          </p>

          {/* ✅ Booking Form Added Here */}
          <div className="pt-4">
            <BookConsultationForm doctorId={doctor.id} fee={doctor.fees ?? 0} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
