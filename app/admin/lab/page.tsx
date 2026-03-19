"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLabList from "@/features/admin/labs/components/AdminLabList";

export default function AdminLabsPage() {
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Laboratories Management</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminLabList />
        </CardContent>
      </Card>
    </div>
  );
}
