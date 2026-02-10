"use client";

import InsuranceList from "./components/InsuranceList";

export default function InsuranceSection() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Insurance</h1>
        <p className="text-sm text-muted-foreground">
          Manage insurance providers accepted by your hospital
        </p>
      </div>

      <InsuranceList />
    </section>
  );
}
