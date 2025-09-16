// app/user/doctors/page.tsx
import UserDoctorList from "@/features/user-doctors/components/UserDoctorList";

export default function UserDoctorsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Find a Doctor</h1>
      <p className="text-muted-foreground">
        Browse approved doctors and book consultations.
      </p>

      <UserDoctorList />
    </div>
  );
}
