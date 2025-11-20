"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Header from "@/components/layout/Header";
// import { usePatientData } from "../../hooks/usePatientData";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import MedicalContent from "./MedicalContent";
import LifestyleContent from "./LifeStyleContent";
import AppointmentsContent from "./AppointmentsContent";
import { usePatientData } from "../hooks/usePatientData";
import CheckupContent from "./CheckupConetent";

export default function PatientProfileDashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");

  const patientId = (session?.user as any)?.id;
  const {
    patient,
    appointments,
    loading,
    updatePersonalInfo,
    updateMedical,
    updateLifestyle,
    updateCheckup,
    addAppointment,
    editAppointment,
    removeAppointment,
  } = usePatientData(patientId);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session || !patient) {
    return null;
  }

  const user = session.user as any;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar user={user} patient={patient} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <WelcomeCard user={user} patient={patient} />

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {[
                  "profile",
                  "medical",
                  "lifestyle",
                  "checkup",
                  "appointments",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[120px] px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "profile" && (
                  <ProfileContent
                    patient={patient}
                    onUpdate={updatePersonalInfo}
                  />
                )}
                {activeTab === "medical" && (
                  <MedicalContent patient={patient} onUpdate={updateMedical} />
                )}
                {activeTab === "lifestyle" && (
                  <LifestyleContent
                    patient={patient}
                    onUpdate={updateLifestyle}
                  />
                )}
                {activeTab === "checkup" && (
                  <CheckupContent patient={patient} onUpdate={updateCheckup} />
                )}
                {activeTab === "appointments" && (
                  <AppointmentsContent
                    appointments={appointments}
                    patientId={patientId}
                    onAdd={addAppointment}
                    onEdit={editAppointment}
                    onDelete={removeAppointment}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeCard({ user, patient }: { user: any; patient: any }) {
  const getWelcomeMessage = () => {
    if (!patient.healthScore) {
      return "Welcome! Let's start tracking your health journey.";
    }

    if (patient.healthScore >= 80) {
      return "Your health journey is looking great. Keep up the good work!";
    } else if (patient.healthScore >= 60) {
      return "You're making good progress. Let's work on improving your health score!";
    } else {
      return "Let's focus on improving your health habits together!";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user.name?.split(" ")[0]}!
          </h2>
          <p className="text-blue-100 opacity-90">{getWelcomeMessage()}</p>
          {patient.healthScore && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg font-semibold">Health Score:</span>
              <span className="text-2xl font-bold text-yellow-300">
                {patient.healthScore}%
              </span>
            </div>
          )}
        </div>
        <div className="w-8 h-8">
          <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-300">
            <path
              fill="currentColor"
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
