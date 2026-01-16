"use client";

import DoctorsSection from "@/features/panel/hospital/sections/DoctorsSection";
import FacilitiesSection from "@/features/panel/hospital/sections/FacilitiesSection";
import ServicesSection from "@/features/panel/hospital/sections/ServicesSection";
import ProceduresSection from "@/features/panel/hospital/sections/ProceduresSection";
import InsuranceSection from "@/features/panel/hospital/sections/InsuranceSection";
import EstimatesSection from "@/features/panel/hospital/sections/EstimatesSection";
import { OverviewSection } from "../../sections/OverviewSection";

export default function HospitalProfileView({ hospital }: { hospital: any }) {
  return (
    <div className="space-y-10">
      <OverviewSection hospital={hospital} />

      <div className="space-y-12">
        <DoctorsSection />
        <FacilitiesSection />
        <ServicesSection />
        <ProceduresSection />
        <InsuranceSection />
        <EstimatesSection />
      </div>
    </div>
  );
}
