"use client";

import ServiceList from "./components/ServiceList";

export default function ServicesSection() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Services</h1>
        <p className="text-sm text-muted-foreground">
          Manage all services provided by your hospital
        </p>
      </div>

      <ServiceList />
    </section>
  );
}
