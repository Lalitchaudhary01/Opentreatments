import { HospitalShell } from "@/features/panel/hospital/components/layout";
import { HospitalProfileView } from "@/features/panel/hospital/screens/dashboard";

export default function HospitalProfilePage() {
  return (
    <HospitalShell>
      <HospitalProfileView />
    </HospitalShell>
  );
}
