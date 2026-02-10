import { HospitalShell } from "@/features/panel/hospital/components/layout";
import HospitalDashboard from "@/features/panel/hospital/screens/dashboard/HospitalDashboard";

export default function HospitalProfilePage() {
  return (
    <HospitalShell>
      <HospitalDashboard />
    </HospitalShell>
  );
}
