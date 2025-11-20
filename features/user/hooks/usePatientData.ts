"use client";

import { useState, useEffect } from "react";
import { Patient, Appointment } from "../types/patient";
import {
  getPatientData,
  updatePatientPersonalInfo,
  updateMedicalHistory,
  updateLifestyleData,
  updateCheckupData,
  getPatientAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../actions/patient";

export function usePatientData(userId: string) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchPatientData();
    }
  }, [userId]);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [patientData, appointmentsData] = await Promise.all([
        getPatientData(userId),
        getPatientAppointments(userId),
      ]);

      if (patientData) {
        setPatient(patientData);
      }
      setAppointments(appointmentsData);
    } catch (err) {
      setError("Failed to fetch patient data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update personal information
  const updatePersonalInfo = async (data: any) => {
    try {
      setError(null);
      const result = await updatePatientPersonalInfo(userId, data);

      if (result.success) {
        setPatient((prev) =>
          prev ? { ...prev, ...data, updatedAt: new Date() } : null
        );
        return true;
      } else {
        setError(result.error || "Failed to update personal information");
        return false;
      }
    } catch (err) {
      setError("Failed to update personal information");
      return false;
    }
  };

  // Update medical history
  const updateMedical = async (medicalData: any) => {
    try {
      setError(null);
      const result = await updateMedicalHistory(userId, medicalData);

      if (result.success) {
        setPatient((prev) =>
          prev ? { ...prev, ...medicalData, updatedAt: new Date() } : null
        );
        return true;
      } else {
        setError(result.error || "Failed to update medical history");
        return false;
      }
    } catch (err) {
      setError("Failed to update medical history");
      return false;
    }
  };

  // Update lifestyle data
  const updateLifestyle = async (lifestyleData: any) => {
    try {
      setError(null);
      const result = await updateLifestyleData(userId, lifestyleData);

      if (result.success) {
        setPatient((prev) =>
          prev ? { ...prev, ...lifestyleData, updatedAt: new Date() } : null
        );
        return true;
      } else {
        setError(result.error || "Failed to update lifestyle data");
        return false;
      }
    } catch (err) {
      setError("Failed to update lifestyle data");
      return false;
    }
  };

  // Update checkup data
  const updateCheckup = async (checkupData: any) => {
    try {
      setError(null);
      const result = await updateCheckupData(userId, checkupData);

      if (result.success) {
        setPatient((prev) =>
          prev ? { ...prev, ...checkupData, updatedAt: new Date() } : null
        );
        return true;
      } else {
        setError(result.error || "Failed to update checkup data");
        return false;
      }
    } catch (err) {
      setError("Failed to update checkup data");
      return false;
    }
  };

  // Appointments
  const addAppointment = async (
    appointmentData: Omit<Appointment, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setError(null);
      const result = await createAppointment(appointmentData);

      if (result.success) {
        await fetchPatientData();
        return true;
      } else {
        setError(result.error || "Failed to create appointment");
        return false;
      }
    } catch (err) {
      setError("Failed to create appointment");
      return false;
    }
  };

  const editAppointment = async (
    id: string,
    appointmentData: Partial<Appointment>
  ) => {
    try {
      setError(null);
      const result = await updateAppointment(userId, id, appointmentData);

      if (result.success) {
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === id ? { ...apt, ...appointmentData } : apt
          )
        );
        return true;
      } else {
        setError(result.error || "Failed to update appointment");
        return false;
      }
    } catch (err) {
      setError("Failed to update appointment");
      return false;
    }
  };

  const removeAppointment = async (id: string) => {
    try {
      setError(null);
      const result = await deleteAppointment(userId, id);

      if (result.success) {
        setAppointments((prev) => prev.filter((apt) => apt.id !== id));
        return true;
      } else {
        setError(result.error || "Failed to delete appointment");
        return false;
      }
    } catch (err) {
      setError("Failed to delete appointment");
      return false;
    }
  };

  return {
    patient,
    appointments,
    loading,
    error,
    updatePersonalInfo,
    updateMedical,
    updateLifestyle,
    updateCheckup,
    addAppointment,
    editAppointment,
    removeAppointment,
    refetch: fetchPatientData,
  };
}
