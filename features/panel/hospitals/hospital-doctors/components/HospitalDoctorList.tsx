"use client";

import React from "react";
import HospitalDoctorCard from "./HospitalDoctorCard";
import { HospitalDoctor } from "../types/hospitalDoctor";

interface HospitalDoctorListProps {
  doctors: HospitalDoctor[];
  onEdit: (doctor: HospitalDoctor) => void;
  onDelete: (id: string) => void;
}

const HospitalDoctorList: React.FC<HospitalDoctorListProps> = ({
  doctors,
  onEdit,
  onDelete,
}) => {
  if (doctors.length === 0)
    return <p className="text-gray-500">No doctors found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doctor) => (
        <HospitalDoctorCard
          key={doctor.id}
          doctor={doctor}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HospitalDoctorList;
