"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import { getPharmacyById } from "@/features/panel/admin-pharmacies/actions/getPharmacyById";
// import { updatePharmacyStatus } from "@/features/panel/admin-pharmacies/actions/updatePharmacyStatus";
// import {
//   AdminPharmacy,
//   PharmacyStatus,
// } from "@/features/panel/admin-pharmacies/types/adminPharmacy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPharmacyById } from "@/features/admin/pharmacy/actions/getPharmacyById";
import { updatePharmacyStatus } from "@/features/admin/pharmacy/actions/updatePharmacyStatus";
import { AdminPharmacy, PharmacyStatus } from "@/features/admin/pharmacy/types/adminPharmacy";

export default function AdminPharmacyDetailPage() {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState<AdminPharmacy | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPharmacy = async () => {
    setLoading(true);
    try {
      const data = await getPharmacyById(id as string);
      setPharmacy(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch pharmacy");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (status: PharmacyStatus) => {
    try {
      await updatePharmacyStatus(id as string, status);
      await fetchPharmacy();
      alert(`Pharmacy ${status} successfully ✅`);
    } catch (err: any) {
      alert(err.message || "Action failed");
    }
  };

  useEffect(() => {
    if (id) fetchPharmacy();
  }, [id]);

  if (loading) return <p className="p-6">Loading pharmacy...</p>;
  if (!pharmacy) return <p className="p-6">Pharmacy not found</p>;

  return (
    <div className="p-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{pharmacy.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Owner:</strong> {pharmacy.ownerName}
          </p>
          <p>
            <strong>Email:</strong> {pharmacy.email}
          </p>
          <p>
            <strong>Phone:</strong> {pharmacy.phone}
          </p>
          <p>
            <strong>License:</strong> {pharmacy.licenseNumber}
          </p>
          <p>
            <strong>Address:</strong> {pharmacy.address}
          </p>
          <p>
            <strong>Status:</strong> {pharmacy.status}
          </p>
        </CardContent>
        <div className="flex gap-2 p-4">
          {pharmacy.status !== "APPROVED" && (
            <Button onClick={() => handleAction("APPROVED")}>Approve</Button>
          )}
          {pharmacy.status !== "REJECTED" && (
            <Button
              variant="destructive"
              onClick={() => handleAction("REJECTED")}
            >
              Reject
            </Button>
          )}
          <Button variant="outline" onClick={() => handleAction("DELETED")}>
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}
