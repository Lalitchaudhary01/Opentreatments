"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLabById } from "@/features/admin/labs/actions/getLabById";
import { updateLabStatus } from "@/features/admin/labs/actions/updateLabStatus";
import { AdminLab, LabStatus } from "@/features/admin/labs/types/adminLab";

export default function AdminLabDetailPage() {
  const { id } = useParams();
  const [lab, setLab] = useState<AdminLab | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLab = async () => {
    setLoading(true);
    try {
      const data = await getLabById(id as string);
      setLab(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch laboratory");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (status: LabStatus | "DELETE") => {
    try {
      await updateLabStatus(id as string, status);
      await fetchLab();
      alert(`Laboratory ${status} successfully ✅`);
    } catch (err: any) {
      alert(err.message || "Action failed");
    }
  };

  useEffect(() => {
    if (id) fetchLab();
  }, [id]);

  if (loading) return <p className="p-6">Loading laboratory...</p>;
  if (!lab) return <p className="p-6">Laboratory not found</p>;

  return (
    <div className="p-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{lab.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Owner:</strong> {lab.ownerName || "-"}</p>
          <p><strong>Email:</strong> {lab.email}</p>
          <p><strong>Phone:</strong> {lab.phone || "-"}</p>
          <p><strong>Registration:</strong> {lab.registrationNumber || "-"}</p>
          <p><strong>Address:</strong> {lab.address || "-"}</p>
          <p><strong>Status:</strong> {lab.status}</p>
        </CardContent>
        <div className="flex flex-wrap gap-2 p-4">
          {lab.status !== "APPROVED" && <Button onClick={() => handleAction("APPROVED")}>Approve</Button>}
          {lab.status !== "REJECTED" && (
            <Button variant="destructive" onClick={() => handleAction("REJECTED")}>Reject</Button>
          )}
          {lab.status !== "SUSPENDED" && (
            <Button variant="secondary" onClick={() => handleAction("SUSPENDED")}>Suspend</Button>
          )}
          <Button variant="outline" onClick={() => handleAction("DELETE")}>Delete</Button>
        </div>
      </Card>
    </div>
  );
}
