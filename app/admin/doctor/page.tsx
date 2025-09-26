"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminDoctorList from "@/features/admin/doctors/components/AdminDoctorList";

export default function AdminDoctorsPage() {
  const [counts, setCounts] = useState({
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
  });

  // 🔗 Replace with API call later
  useEffect(() => {
    setCounts({
      PENDING: 5,
      APPROVED: 12,
      REJECTED: 3,
    });
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Doctors</h1>
          <p className="text-muted-foreground">
            Approve, reject, or delete doctor profiles from the system.
          </p>
        </div>
      </div>

      {/* Tabs with Counts */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="PENDING" className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="PENDING">
                Pending <Badge variant="destructive">{counts.PENDING}</Badge>
              </TabsTrigger>
              <TabsTrigger value="APPROVED">
                Approved <Badge variant="secondary">{counts.APPROVED}</Badge>
              </TabsTrigger>
              <TabsTrigger value="REJECTED">
                Rejected <Badge variant="outline">{counts.REJECTED}</Badge>
              </TabsTrigger>
            </TabsList>

            {/* Pending */}
            <TabsContent value="PENDING">
              <AdminDoctorList status="PENDING" />
            </TabsContent>

            {/* Approved */}
            <TabsContent value="APPROVED">
              <AdminDoctorList status="APPROVED" />
            </TabsContent>

            {/* Rejected */}
            <TabsContent value="REJECTED">
              <AdminDoctorList status="REJECTED" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
