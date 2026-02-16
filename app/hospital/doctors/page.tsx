"use client";

import React, { useEffect, useState } from "react";
import HospitalDoctorList from "@/features/panel/hospitals/hospital-doctors/components/HospitalDoctorList";
import HospitalDoctorForm from "@/features/panel/hospitals/hospital-doctors/components/HospitalDoctorForm";
import { HospitalDoctor } from "@/features/panel/hospitals/hospital-doctors/types/hospitalDoctor";
import { addHospitalDoctor, deleteHospitalDoctor, getHospitalDoctors, updateHospitalDoctor } from "@/features/panel/hospitals/hospital-doctors/actions/hospitalDoctorActions";

const HospitalDoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<HospitalDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<HospitalDoctor | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch doctors
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await getHospitalDoctors();
      setDoctors(data);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Add / Update handler
  const handleFormSubmit = async (doctorData: Omit<HospitalDoctor, "id">) => {
    try {
      if (selectedDoctor) {
        // Update
        await updateHospitalDoctor(selectedDoctor.id, doctorData);
      } else {
        // Add
        await addHospitalDoctor(doctorData);
      }
      setShowForm(false);
      setSelectedDoctor(null);
      fetchDoctors(); // Refresh list
    } catch (err) {
      console.error("Failed to save doctor:", err);
    }
  };

  // Edit handler
  const handleEdit = (doctor: HospitalDoctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteHospitalDoctor(id);
        fetchDoctors(); // Refresh list
      } catch (err) {
        console.error("Failed to delete doctor:", err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Doctors</h1>
        <button
          onClick={() => {
            setSelectedDoctor(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Doctor
        </button>
      </div>

      {showForm && (
        <div className="mb-6 border p-4 rounded shadow">
          <HospitalDoctorForm
            doctor={selectedDoctor || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedDoctor(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <HospitalDoctorList
          doctors={doctors}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default HospitalDoctorsPage;
