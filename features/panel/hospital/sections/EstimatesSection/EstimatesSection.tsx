"use client";

import EstimateList from "./components/EstimateList";

export default function EstimatesSection() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Estimates</h1>
        <p className="text-sm text-muted-foreground">
          Manage procedure-wise insurance estimates
        </p>
      </div>

      <EstimateList />
    </section>
  );
}
