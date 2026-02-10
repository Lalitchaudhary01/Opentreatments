"use client";

import HospitalDoctorList from "./components/HospitalDoctorList";

export default function DoctorsSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Doctors</h1>
          <p className="text-sm text-muted-foreground">
            Manage doctors associated with your hospital
          </p>
        </div>
      </div>

      <HospitalDoctorList />
    </section>
  );
}
