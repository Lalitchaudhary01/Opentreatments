"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminDoctorList from "@/features/admin/doctors/components/AdminDoctorList";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [tab, setTab] = useState("PENDING");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-10 px-2 md:px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mx-auto mb-8">
            <TabsTrigger value="PENDING">Pending Doctors</TabsTrigger>
            <TabsTrigger value="APPROVED">Approved Doctors</TabsTrigger>
            <TabsTrigger value="REJECTED">Rejected Doctors</TabsTrigger>
          </TabsList>
          <TabsContent value="PENDING">
            <Card>
              <CardHeader>
                <CardTitle>
                  Pending Doctors{" "}
                  <Badge variant="destructive" className="ml-2">
                    Control
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminDoctorList status="PENDING" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="APPROVED">
            <Card>
              <CardHeader>
                <CardTitle>
                  Approved Doctors{" "}
                  <Badge variant="secondary" className="ml-2">
                    View
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminDoctorList status="APPROVED" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="REJECTED">
            <Card>
              <CardHeader>
                <CardTitle>
                  Rejected Doctors{" "}
                  <Badge variant="outline" className="ml-2">
                    Review
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminDoctorList status="REJECTED" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex justify-center mt-10 gap-4">
          <Button variant="default">Add New Doctor</Button>
          <Button variant="outline">Manage Hospitals</Button>
          <Button variant="outline">Manage Users</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
