import { HospitalShell } from "@/features/panel/hospital/components/layout";
import DoctorsSection from "@/features/panel/hospital/sections/DoctorsSection";

export default function DoctorsPage() {
  return (
    <HospitalShell>
      <DoctorsSection />
    </HospitalShell>
  );
}
