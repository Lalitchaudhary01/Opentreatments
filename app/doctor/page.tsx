// app/doctor/page.tsx

import { DoctorShell } from "@/features/panel/doctor";
import { DoctorDashboard } from "@/features/panel/doctor/screens/dashboard";

export default function DoctorPage() {
  return (
    <DoctorShell>
      <DoctorDashboard />
    </DoctorShell>
  );
}
