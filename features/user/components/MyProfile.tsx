"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  Crown,
  FileText,
  MoreVertical,
  Settings,
  ArrowLeft,
  Upload,
  User,
  Phone,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/layout/Header";

export default function PatientProfileDashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    signIn();
    return null;
  }

  // ✅ Session se real user data le rahe hain
  const user = {
    id: (session.user as any)?.id,
    name: session.user?.name || "User",
    email: session.user?.email || "",
    phone: (session.user as any)?.phone || "",
    image: session.user?.image || "",
  };

  // ✅ Patient data session se le rahe hain (agar additional fields chahiye toh database se server actions use karein)
  const patientData = {
    name: user.name,
    age: 34, // Isko database se la sakte hain
    bloodGroup: "O+",
    gender: "Female",
    lastVisit: "15 Jan 2024",
    nextAppointment: "20 Feb 2024",
    doctor: "Dr. Michael Rodriguez",
    healthScore: 87,
    memberSince: "2020",
  };

  const stats = [
    { label: "Health Score", value: "87%", trend: "+2.5%" },
    { label: "Medication Adherence", value: "92%", trend: "+1.2%" },
    { label: "Appointment Attendance", value: "95%", trend: "+0.8%" },
  ];

  const userInitials = user.name.charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      {/* Header */}
      <Header/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg">
                    <AvatarImage
                      src={user.image || "/api/placeholder/96/96"}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="mt-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {user.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {patientData.age} years • {patientData.bloodGroup}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    >
                      Premium Member
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    >
                      Active
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Last Visit
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {patientData.lastVisit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Next Appointment
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {patientData.nextAppointment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Primary Doctor
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {patientData.doctor}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    >
                      {stat.trend}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Welcome back, {user.name.split(" ")[0]}!
                    </h2>
                    <p className="text-blue-100 opacity-90">
                      Your health journey is looking great. Keep up the good
                      work!
                    </p>
                  </div>
                  <Crown className="w-8 h-8 text-yellow-300" />
                </div>
              </CardContent>
            </Card>

            {/* Tab Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {["profile", "medical", "appointments", "documents"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </div>

              <div className="p-6">
                {activeTab === "profile" && (
                  <ProfileContent user={user} patientData={patientData} />
                )}
                {activeTab === "medical" && <MedicalContent />}
                {activeTab === "appointments" && <AppointmentsContent />}
                {activeTab === "documents" && <DocumentsContent />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ ProfileContent ko bhi real data pass karein
function ProfileContent({
  user,
  patientData,
}: {
  user: any;
  patientData: any;
}) {
  const personalInfo = [
    { label: "Full Name", value: user.name },
    { label: "Date of Birth", value: "15 March 1990 (34 years)" },
    { label: "Gender", value: patientData.gender },
    { label: "Blood Group", value: patientData.bloodGroup },
    { label: "Height", value: "165 cm" },
    { label: "Weight", value: "62 kg" },
  ];

  const contactInfo = [
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone || "Not provided" },
    { label: "Emergency Contact", value: "James Chen - +1 (555) 987-6543" },
    { label: "Address", value: "123 Health Street, Medville, CA 94301" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Personal Information
        </h3>
        <Button variant="outline" size="sm">
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {personalInfo.map((info, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {info.label}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-right">
                  {info.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {info.label}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-right">
                  {info.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// MedicalContent, AppointmentsContent, DocumentsContent same rahenge
// ... (ye components wahi rahenge jo aapke original code me the)

function MedicalContent() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const medicalData = {
    conditions: ["Asthma (Mild)", "Seasonal Allergies"],
    medications: [
      { name: "Albuterol Inhaler", dosage: "As needed", for: "Asthma" },
      { name: "Loratadine", dosage: "10mg daily", for: "Allergies" },
    ],
    allergies: ["Penicillin", "Peanuts", "Dust Mites"],
    procedures: ["Appendectomy (2015)", "Wisdom Teeth Removal (2018)"],
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Medical History
      </h3>

      {[
        {
          key: "conditions",
          title: "Current Conditions",
          icon: TrendingUp,
          data: medicalData.conditions,
        },
        {
          key: "medications",
          title: "Current Medications",
          icon: FileText,
          data: medicalData.medications,
        },
        {
          key: "allergies",
          title: "Allergies",
          icon: "⚠️",
          data: medicalData.allergies,
        },
        {
          key: "procedures",
          title: "Past Procedures",
          icon: "🏥",
          data: medicalData.procedures,
        },
      ].map(({ key, title, icon: Icon, data }) => (
        <Card key={key}>
          <CardContent className="p-0">
            <button
              onClick={() => toggleSection(key)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                {typeof Icon === "string" ? (
                  <span>{Icon}</span>
                ) : (
                  <Icon className="w-4 h-4 text-blue-600" />
                )}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {title}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  expandedSections.includes(key) ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSections.includes(key) && (
              <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                {Array.isArray(data) &&
                  data.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {typeof item === "string" ? item : item.name}
                      </span>
                      {typeof item !== "string" && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.dosage}
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AppointmentsContent() {
  const appointments = [
    {
      id: 1,
      date: "20 Feb 2024",
      time: "10:00 AM",
      doctor: "Dr. Michael Rodriguez",
      type: "Regular Checkup",
      status: "upcoming",
    },
    {
      id: 2,
      date: "15 Jan 2024",
      time: "2:30 PM",
      doctor: "Dr. Sarah Johnson",
      type: "Dermatology Consultation",
      status: "completed",
    },
    {
      id: 3,
      date: "5 Dec 2023",
      time: "11:15 AM",
      doctor: "Dr. Michael Rodriguez",
      type: "Follow-up Visit",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Appointments
        </h3>
        <Button>Schedule New Appointment</Button>
      </div>

      <div className="space-y-3">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {appointment.date.split(" ")[1]}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {appointment.date.split(" ")[0]}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {appointment.doctor}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {appointment.type} • {appointment.time}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    appointment.status === "upcoming" ? "default" : "secondary"
                  }
                >
                  {appointment.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DocumentsContent() {
  const documents = [
    {
      name: "Blood Test Results - Jan 2024.pdf",
      date: "15 Jan 2024",
      type: "Lab Report",
      size: "2.4 MB",
    },
    {
      name: "X-Ray Chest - Dec 2023.pdf",
      date: "5 Dec 2023",
      type: "Imaging",
      size: "5.7 MB",
    },
    {
      name: "Prescription - Nov 2023.pdf",
      date: "20 Nov 2023",
      type: "Prescription",
      size: "1.2 MB",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Medical Documents
        </h3>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="space-y-3">
        {documents.map((doc, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {doc.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.type} • {doc.date} • {doc.size}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
