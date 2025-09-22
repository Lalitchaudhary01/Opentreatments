"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminPharmacyList from "@/features/admin/pharmacy/components/AdminPharmacyList";

export default function AdminPharmaciesPage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pharmacies Management</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminPharmacyList />
        </CardContent>
      </Card>
    </div>
  );
}
