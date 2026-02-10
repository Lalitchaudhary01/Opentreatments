"use client";

import FacilityList from "./components/FacilityList";

export default function FacilitiesSection() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Facilities</h1>
        <p className="text-sm text-muted-foreground">
          Manage facilities available in your hospital
        </p>
      </div>

      <FacilityList />
    </section>
  );
}
