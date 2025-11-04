"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import DoctorLogoutButton from "@/components/layout/DoctorLogoutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Eye,
  Edit,
  Calendar,
  Activity,
  Clock,
  Users,
  FileText,
  TrendingUp,
  Bell,
  CheckCircle,
  AlertCircle,
  Video,
  Stethoscope,
  Pill,
  Heart,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Header from "@/components/layout/Header";

export default function DoctorDashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "DOCTOR") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Card className="max-w-lg mx-4 shadow-xl border border-slate-200">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Access Restricted
                </h2>
                <p className="text-slate-600 text-lg">
                  This area is exclusively for verified medical professionals.
                </p>
              </div>
              <Link href="/login">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-6 text-lg">
                  Return to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <Header showNav={false} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <Card className="bg-white border border-slate-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-cyan-600 rounded-2xl flex items-center justify-center text-4xl font-bold text-white">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-teal-500 rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
                      Dr. {session.user.name}
                    </h1>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                      Verified
                    </span>
                  </div>
                  <p className="text-slate-600 text-xl mb-4">
                    Welcome back! Ready to make a difference today?
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {session.user.email}
                    </span>
                    {session.user.phone && (
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {session.user.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-col gap-3">
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold flex items-center gap-2 px-6 py-6">
                  <Calendar className="w-5 h-5" />
                  Today's Schedule
                </Button>
                <Button className="bg-slate-700 hover:bg-slate-800 text-white font-bold flex items-center gap-2 px-6 py-6">
                  <Video className="w-5 h-5" />
                  Start Video Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border border-slate-200 shadow-md hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-600 text-sm font-semibold mb-1">
                    Total Patients
                  </p>
                  <h3 className="text-5xl font-bold text-cyan-600 mb-2">248</h3>
                  <div className="flex items-center gap-1 text-teal-600 text-xs font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12% from last month</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-md hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-600 text-sm font-semibold mb-1">
                    Today's Appointments
                  </p>
                  <h3 className="text-5xl font-bold text-teal-600 mb-2">12</h3>
                  <div className="flex items-center gap-1 text-teal-600 text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>5 completed, 7 pending</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-md hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-600 text-sm font-semibold mb-1">
                    Pending Reviews
                  </p>
                  <h3 className="text-5xl font-bold text-orange-600 mb-2">7</h3>
                  <div className="flex items-center gap-1 text-orange-600 text-xs font-medium">
                    <Clock className="w-3 h-3" />
                    <span>Requires your attention</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-md hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-600 text-sm font-semibold mb-1">
                    Monthly Consultations
                  </p>
                  <h3 className="text-5xl font-bold text-blue-600 mb-2">89</h3>
                  <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
                    <Heart className="w-3 h-3" />
                    <span>98% satisfaction rate</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-7 h-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-slate-200 shadow-lg">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-cyan-600" />
                  Quick Actions
                </CardTitle>
                <p className="text-sm text-slate-600 mt-2">
                  Manage your profile and patient care efficiently
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Link href="/doctor/profile/submit" className="group">
                    <div className="h-full p-6 rounded-xl border-2 border-slate-200 hover:border-cyan-600 transition-all bg-white hover:shadow-lg">
                      <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors">
                        <UserPlus className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">
                        Submit Profile
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Create and submit your professional medical profile
                      </p>
                      <div className="flex items-center text-cyan-600 text-sm font-semibold">
                        Get Started <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>

                  <Link href="/doctor/profile/view" className="group">
                    <div className="h-full p-6 rounded-xl border-2 border-slate-200 hover:border-teal-600 transition-all bg-white hover:shadow-lg">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                        <Eye className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">
                        View Profile
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Review your complete professional information
                      </p>
                      <div className="flex items-center text-teal-600 text-sm font-semibold">
                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>

                  <Link href="/doctor/profile/edit" className="group">
                    <div className="h-full p-6 rounded-xl border-2 border-slate-200 hover:border-blue-600 transition-all bg-white hover:shadow-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                        <Edit className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">
                        Edit Profile
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Update and modify your professional details
                      </p>
                      <div className="flex items-center text-blue-600 text-sm font-semibold">
                        Edit Now <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>

                  <Link href="/doctor/consultations" className="group">
                    <div className="h-full p-6 rounded-xl border-2 border-slate-200 hover:border-purple-600 transition-all bg-white hover:shadow-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                        <FileText className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">
                        Consultations
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Manage appointments and patient consultations
                      </p>
                      <div className="flex items-center text-purple-600 text-sm font-semibold">
                        Open Console <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <div>
            <Card className="bg-white border border-slate-200 shadow-lg h-full">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-cyan-600" />
                  Today's Schedule
                </CardTitle>
                <p className="text-sm text-slate-600 mt-2">
                  Your upcoming appointments
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    {
                      time: "09:00 AM",
                      patient: "Sarah Johnson",
                      type: "Check-up",
                      color: "cyan",
                    },
                    {
                      time: "10:30 AM",
                      patient: "Mike Davis",
                      type: "Follow-up",
                      color: "teal",
                    },
                    {
                      time: "02:00 PM",
                      patient: "Emma Wilson",
                      type: "Consultation",
                      color: "blue",
                    },
                    {
                      time: "04:00 PM",
                      patient: "James Brown",
                      type: "Emergency",
                      color: "orange",
                    },
                  ].map((appointment, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-all border border-slate-200"
                    >
                      <div
                        className={`w-10 h-10 bg-${appointment.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <Clock
                          className={`w-5 h-5 text-${appointment.color}-600`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 truncate">
                          {appointment.patient}
                        </p>
                        <p className="text-sm text-slate-600">
                          {appointment.type}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full whitespace-nowrap">
                        {appointment.time}
                      </span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold">
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white border border-slate-200 shadow-lg">
          <CardHeader className="border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-cyan-600" />
                  Recent Activity
                </CardTitle>
                <p className="text-sm text-slate-600 mt-2">
                  Your latest patient interactions and updates
                </p>
              </div>
              <Button
                variant="outline"
                className="text-sm font-semibold border-2 hover:bg-slate-50"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                {
                  patient: "John Doe",
                  action: "Consultation completed",
                  detail: "General checkup and prescription issued",
                  time: "2 hours ago",
                  icon: CheckCircle,
                  color: "teal",
                },
                {
                  patient: "Jane Smith",
                  action: "Appointment scheduled",
                  detail: "Follow-up visit for next week",
                  time: "4 hours ago",
                  icon: Calendar,
                  color: "cyan",
                },
                {
                  patient: "Mike Johnson",
                  action: "Prescription issued",
                  detail: "Medication for chronic condition",
                  time: "Yesterday",
                  icon: Pill,
                  color: "blue",
                },
                {
                  patient: "Emily Davis",
                  action: "Lab results reviewed",
                  detail: "All parameters within normal range",
                  time: "2 days ago",
                  icon: FileText,
                  color: "purple",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl hover:bg-slate-50 transition-all border border-slate-200"
                >
                  <div
                    className={`w-10 h-10 bg-${activity.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <activity.icon
                      className={`w-5 h-5 text-${activity.color}-600`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <p className="font-bold text-slate-900">
                        {activity.patient}
                      </p>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-700 text-sm mb-1">
                      {activity.action}
                    </p>
                    <p className="text-sm text-slate-600">{activity.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
