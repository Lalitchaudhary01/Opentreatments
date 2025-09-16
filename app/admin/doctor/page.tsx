// app/admin/doctors/page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDoctorList from "@/features/admin/doctors/components/AdminDoctorList";


export default function AdminDoctorsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Doctors</h1>
      <p className="text-muted-foreground">
        Approve, reject, or delete doctor profiles.
      </p>

      <Tabs defaultValue="PENDING" className="w-full">
        <TabsList>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="APPROVED">Approved</TabsTrigger>
          <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="PENDING">
          <AdminDoctorList status="PENDING" />
        </TabsContent>
        <TabsContent value="APPROVED">
          <AdminDoctorList status="APPROVED" />
        </TabsContent>
        <TabsContent value="REJECTED">
          <AdminDoctorList status="REJECTED" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
