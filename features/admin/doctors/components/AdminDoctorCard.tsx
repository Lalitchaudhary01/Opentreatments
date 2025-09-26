"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2 } from "lucide-react";
import {
  deleteDoctor,
  updateDoctorStatus,
} from "../actions/updateDoctorStatus";
import { toast } from "sonner";

interface AdminDoctorCardProps {
  doctor: {
    id: string;
    name: string;
    email: string;
    status: string;
  };
}

export default function AdminDoctorCard({ doctor }: AdminDoctorCardProps) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (status: "APPROVED" | "REJECTED") => {
    try {
      setLoading(true);
      await updateDoctorStatus({ doctorId: doctor.id, status });
      toast.success(`Doctor ${status.toLowerCase()} successfully`);
    } catch {
      toast.error("Failed to update doctor status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    try {
      setLoading(true);
      await deleteDoctor({ doctorId: doctor.id });
      toast.success("Doctor deleted successfully");
    } catch {
      toast.error("Failed to delete doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition">
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

        {/* Status badge */}
        <Badge
          variant={
            doctor.status === "APPROVED"
              ? "success"
              : doctor.status === "REJECTED"
              ? "destructive"
              : "secondary"
          }
          className="mt-2"
        >
          {doctor.status}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        {doctor.status === "PENDING" && (
          <>
            <Button
              variant="success"
              disabled={loading}
              onClick={() => handleUpdate("APPROVED")}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Approve"
              )}
            </Button>

            <Button
              variant="destructive"
              disabled={loading}
              onClick={() => handleUpdate("REJECTED")}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Reject"
              )}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          disabled={loading}
          onClick={handleDelete}
          className="flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
