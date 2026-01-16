"use client";

import ProcedureList from "./components/ProcedureList";

export default function ProceduresSection() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Procedures</h1>
        <p className="text-sm text-muted-foreground">
          Manage all medical procedures offered by your hospital
        </p>
      </div>

      <ProcedureList />
    </section>
  );
}
