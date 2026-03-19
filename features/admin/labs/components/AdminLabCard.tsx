"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLab, LabStatus } from "../types/adminLab";
import { updateLabStatus } from "../actions/updateLabStatus";

type Props = {
  lab: AdminLab;
  refresh: () => Promise<void>;
};

export default function AdminLabCard({ lab, refresh }: Props) {
  const handleAction = async (status: LabStatus | "DELETE") => {
    try {
      await updateLabStatus(lab.id, status);
      await refresh();
      alert(`Laboratory ${status} successfully ✅`);
    } catch (err: any) {
      alert(err.message || "Action failed");
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{lab.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><strong>Owner:</strong> {lab.ownerName || "-"}</p>
        <p><strong>Email:</strong> {lab.email}</p>
        <p><strong>Phone:</strong> {lab.phone || "-"}</p>
        <p><strong>Registration:</strong> {lab.registrationNumber || "-"}</p>
        <p><strong>Status:</strong> {lab.status}</p>
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        {lab.status !== "APPROVED" && (
          <Button onClick={() => handleAction("APPROVED")}>Approve</Button>
        )}
        {lab.status !== "REJECTED" && (
          <Button variant="destructive" onClick={() => handleAction("REJECTED")}>
            Reject
          </Button>
        )}
        {lab.status !== "SUSPENDED" && (
          <Button variant="secondary" onClick={() => handleAction("SUSPENDED")}>
            Suspend
          </Button>
        )}
        <Button variant="outline" onClick={() => handleAction("DELETE")}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
