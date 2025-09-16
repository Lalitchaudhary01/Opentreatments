import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  deleteDoctor,
  updateDoctorStatus,
} from "../actions/updateDoctorStatus";

interface AdminDoctorCardProps {
  doctor: {
    id: string;
    name: string;
    email: string;
    status: string;
  };
}

export default function AdminDoctorCard({ doctor }: AdminDoctorCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        {/* Doctor name clickable */}
        <CardTitle>
          <Link
            href={`/admin/doctor/${doctor.id}`}
            className="text-blue-600 hover:underline"
          >
            {doctor.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{doctor.email}</p>
      </CardHeader>

      <CardContent className="flex gap-2">
        {doctor.status === "PENDING" && (
          <>
            <Button
              variant="success"
              onClick={() =>
                updateDoctorStatus({ doctorId: doctor.id, status: "APPROVED" })
              }
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                updateDoctorStatus({ doctorId: doctor.id, status: "REJECTED" })
              }
            >
              Reject
            </Button>
          </>
        )}
        <Button
          variant="outline"
          onClick={() => deleteDoctor({ doctorId: doctor.id })}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
