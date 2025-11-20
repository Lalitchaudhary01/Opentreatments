"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Patient } from "../types/patient";

interface ProfileSidebarProps {
  user: any;
  patient: Patient;
}

export default function ProfileSidebar({ user, patient }: ProfileSidebarProps) {
  const stats = [
    {
      label: "Health Score",
      value: patient.healthScore ? `${patient.healthScore}%` : "N/A",
      trend: patient.healthScore ? "+2.5%" : "",
    },
    { label: "Medication Adherence", value: "92%", trend: "+1.2%" },
    { label: "Appointment Attendance", value: "95%", trend: "+0.8%" },
  ];

  const userInitials = user.name?.charAt(0).toUpperCase() || "U";

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Not scheduled";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={user.image || "/api/placeholder/96/96"}
                alt={user.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <div className="mt-4">
              <h2 className="text-xl font-bold text-gray-900">
                {patient.fullName || user.name}
              </h2>
              <p className="text-gray-500 mt-1">
                {patient.age ? `${patient.age} years` : "Age not set"} •{" "}
                {patient.bloodGroup || "Blood group not set"}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {patient.healthScore ? "Active Member" : "New Member"}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                {patient.healthScore && patient.healthScore >= 60
                  ? "Good Health"
                  : "Setup Required"}
              </Badge>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Last Visit</span>
              <span className="font-semibold text-gray-900">
                {formatDate(patient.lastVisit)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Next Appointment</span>
              <span className="font-semibold text-blue-600">
                {formatDate(patient.nextAppointment)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Primary Doctor</span>
              <span className="font-semibold text-gray-900">
                {patient.primaryDoctor || "Not assigned"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              {stat.trend && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  {stat.trend}
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Lifestyle Summary */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Lifestyle Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Activity Level</span>
            <Badge
              variant={
                patient.activityLevel === "high" ? "default" : "secondary"
              }
            >
              {patient.activityLevel || "Not set"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Sleep</span>
            <span className="text-sm font-medium text-gray-900">
              {patient.sleepHours ? `${patient.sleepHours} hrs` : "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Water Intake</span>
            <span className="text-sm font-medium text-gray-900">
              {patient.waterIntake
                ? `${patient.waterIntake} glasses`
                : "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Stress Level</span>
            <Badge
              variant={
                patient.stressLevel === "low"
                  ? "default"
                  : patient.stressLevel === "high"
                  ? "destructive"
                  : "secondary"
              }
            >
              {patient.stressLevel || "Not set"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
