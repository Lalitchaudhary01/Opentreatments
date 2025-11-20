"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Patient } from "../types/patient";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Stethoscope,
  TrendingUp,
  Activity,
  Droplets,
  Zap,
  Shield,
} from "lucide-react";

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
      icon: TrendingUp,
    },
    {
      label: "Medication Adherence",
      value: "92%",
      trend: "+1.2%",
      icon: Shield,
    },
    {
      label: "Appointment Attendance",
      value: "95%",
      trend: "+0.8%",
      icon: Calendar,
    },
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

  const getHealthBadgeVariant = () => {
    if (!patient.healthScore) return "secondary";
    if (patient.healthScore >= 80) return "default";
    return "secondary";
  };

  const getHealthBadgeColor = () => {
    if (!patient.healthScore)
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    if (patient.healthScore >= 80)
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    if (patient.healthScore >= 60)
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-800 shadow-xl">
                  <AvatarImage
                    src={user.image || "/api/placeholder/96/96"}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-teal-500 text-white text-2xl font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="mt-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  {patient.fullName || user.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {patient.age ? `${patient.age} years` : "Age not set"} •{" "}
                  {patient.bloodGroup || "Blood group not set"}
                </p>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap justify-center">
                <Badge
                  className={`${getHealthBadgeColor()} border-0 font-medium`}
                >
                  {patient.healthScore ? "Active Member" : "New Member"}
                </Badge>
                <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border-0 font-medium">
                  {patient.healthScore && patient.healthScore >= 60
                    ? "Good Health"
                    : "Setup Required"}
                </Badge>
              </div>
            </div>

            <Separator className="my-6 bg-slate-200/50 dark:bg-slate-700/50" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Last Visit
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {formatDate(patient.lastVisit)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Next Appointment
                </span>
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  {formatDate(patient.nextAppointment)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  Primary Doctor
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
                  {patient.primaryDoctor || "Not assigned"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-500" />
              Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 dark:bg-slate-700/30 border border-slate-200/30 dark:border-slate-600/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </p>
                  </div>
                </div>
                {stat.trend && (
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                    {stat.trend}
                  </Badge>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Lifestyle Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-500" />
              Lifestyle Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-200/30 dark:border-slate-700/30 last:border-b-0">
              <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Activity Level
              </span>
              <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border-0">
                {patient.activityLevel || "Not set"}
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200/30 dark:border-slate-700/30 last:border-b-0">
              <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Sleep
              </span>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {patient.sleepHours ? `${patient.sleepHours} hrs` : "Not set"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200/30 dark:border-slate-700/30 last:border-b-0">
              <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Water Intake
              </span>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {patient.waterIntake
                  ? `${patient.waterIntake} glasses`
                  : "Not set"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Stress Level
              </span>
              <Badge
                className={
                  patient.stressLevel === "low"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0"
                    : patient.stressLevel === "high"
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-0"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0"
                }
              >
                {patient.stressLevel || "Not set"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
