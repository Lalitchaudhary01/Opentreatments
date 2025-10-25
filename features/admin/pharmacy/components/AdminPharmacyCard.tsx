"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminPharmacy, PharmacyStatus } from "../types/adminPharmacy";
import { updatePharmacyStatus } from "../actions/updatePharmacyStatus";

type Props = {
  pharmacy: AdminPharmacy;
  refresh: () => Promise<void>;
};

export default function AdminPharmacyCard({ pharmacy, refresh }: Props) {
  const handleAction = async (status: PharmacyStatus | "DELETE") => {
    try {
      await updatePharmacyStatus(pharmacy.id, status);
      await refresh();
      alert(`Pharmacy ${status} successfully ✅`);
    } catch (err: any) {
      alert(err.message || "Action failed");
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{pharmacy.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><strong>Owner:</strong> {pharmacy.ownerName}</p>
        <p><strong>Email:</strong> {pharmacy.email}</p>
        <p><strong>Phone:</strong> {pharmacy.phone}</p>
        <p><strong>License:</strong> {pharmacy.licenseNumber}</p>
        <p><strong>Status:</strong> {pharmacy.status}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {pharmacy.status !== "APPROVED" && (
          <Button onClick={() => handleAction("APPROVED")}>Approve</Button>
        )}
        {pharmacy.status !== "REJECTED" && (
          <Button variant="destructive" onClick={() => handleAction("REJECTED")}>
            Reject
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => handleAction("DELETE")}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
