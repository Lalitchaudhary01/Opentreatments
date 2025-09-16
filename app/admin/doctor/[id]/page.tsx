// app/admin/doctor/[id]/page.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { getDoctorById } from "@/features/admin/doctors/actions/getDoctorById";
import { updateDoctorStatus } from "@/features/admin/doctors/actions/updateDoctorStatus";

interface AdminDoctorDetailPageProps {
  params: {
    id: string;
  };
}

export default async function AdminDoctorDetailPage({
  params,
}: AdminDoctorDetailPageProps) {
  const doctor = await getDoctorById(params.id);

  if (!doctor) {
    return (
      <div className="p-6">
        <p className="text-red-500">Doctor not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>{doctor.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{doctor.email}</p>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-medium">Phone:</span> {doctor.phone}
          </p>
          <p>
            <span className="font-medium">Status:</span> {doctor.status}
          </p>
          <p>
            <span className="font-medium">Created:</span>{" "}
            {doctor.createdAt.toDateString()}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <form
            action={async () => {
              "use server";
              await updateDoctorStatus(doctor.id, "APPROVED");
            }}
          >
            <Button
              type="submit"
              variant="success"
              disabled={doctor.status === "APPROVED"}
            >
              Approve
            </Button>
          </form>
          <form
            action={async () => {
              "use server";
              await updateDoctorStatus(doctor.id, "REJECTED");
            }}
          >
            <Button
              type="submit"
              variant="destructive"
              disabled={doctor.status === "REJECTED"}
            >
              Reject
            </Button>
          </form>
          <form
            action={async () => {
              "use server";
              await updateDoctorStatus(doctor.id, "DELETED");
            }}
          >
            <Button type="submit" variant="outline">
              Delete
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
