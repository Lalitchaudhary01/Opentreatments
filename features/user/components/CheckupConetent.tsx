"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Patient } from "../types/patient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Calendar,
  TrendingUp,
  Edit3,
  Save,
  X,
  Heart,
} from "lucide-react";

interface CheckupContentProps {
  patient: Patient;
  onUpdate: (data: any) => Promise<boolean>;
}

export default function CheckupContent({
  patient,
  onUpdate,
}: CheckupContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    healthScore: patient.healthScore?.toString() || "",
    lastVisit: patient.lastVisit
      ? new Date(patient.lastVisit).toISOString().split("T")[0]
      : "",
    nextAppointment: patient.nextAppointment
      ? new Date(patient.nextAppointment).toISOString().split("T")[0]
      : "",
    primaryDoctor: patient.primaryDoctor || "",
  });

  const handleSave = async () => {
    setLoading(true);
    const dataToUpdate = {
      ...formData,
      healthScore: formData.healthScore
        ? parseInt(formData.healthScore)
        : undefined,
      lastVisit: formData.lastVisit ? new Date(formData.lastVisit) : undefined,
      nextAppointment: formData.nextAppointment
        ? new Date(formData.nextAppointment)
        : undefined,
    };

    const success = await onUpdate(dataToUpdate);
    setLoading(false);

    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      healthScore: patient.healthScore?.toString() || "",
      lastVisit: patient.lastVisit
        ? new Date(patient.lastVisit).toISOString().split("T")[0]
        : "",
      nextAppointment: patient.nextAppointment
        ? new Date(patient.nextAppointment).toISOString().split("T")[0]
        : "",
      primaryDoctor: patient.primaryDoctor || "",
    });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Not recorded";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getHealthStatus = (score: number | null | undefined) => {
    if (score == null)
      return {
        text: "Not assessed",
        color:
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      };
    if (score >= 80)
      return {
        text: "Excellent",
        color:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      };
    if (score >= 60)
      return {
        text: "Good",
        color:
          "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
      };
    if (score >= 40)
      return {
        text: "Fair",
        color:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      };
    return {
      text: "Needs Improvement",
      color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    };
  };

  const healthStatus = getHealthStatus(patient.healthScore);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h3
          className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Health Checkup & Monitoring
        </motion.h3>
        <div className="flex gap-2">
          {isEditing ? (
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={loading}
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:border-cyan-300 dark:hover:border-cyan-700"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Update Checkup Info
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="edit-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="healthScore"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Health Score (0-100)
                    </Label>
                    <Input
                      id="healthScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.healthScore}
                      onChange={(e) =>
                        handleChange("healthScore", e.target.value)
                      }
                      placeholder="Enter health score"
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="primaryDoctor"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Primary Doctor
                    </Label>
                    <Input
                      id="primaryDoctor"
                      value={formData.primaryDoctor}
                      onChange={(e) =>
                        handleChange("primaryDoctor", e.target.value)
                      }
                      placeholder="Doctor's name"
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastVisit"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Last Visit
                    </Label>
                    <Input
                      id="lastVisit"
                      type="date"
                      value={formData.lastVisit}
                      onChange={(e) =>
                        handleChange("lastVisit", e.target.value)
                      }
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="nextAppointment"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Next Appointment
                    </Label>
                    <Input
                      id="nextAppointment"
                      type="date"
                      value={formData.nextAppointment}
                      onChange={(e) =>
                        handleChange("nextAppointment", e.target.value)
                      }
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="view-mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Health Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    {patient.healthScore ? (
                      <>
                        <div className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {patient.healthScore}%
                        </div>
                        <Badge
                          className={`${healthStatus.color} border-0 font-medium`}
                        >
                          {healthStatus.text}
                        </Badge>
                      </>
                    ) : (
                      <div className="text-slate-500 dark:text-slate-400">
                        Not assessed yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Primary Doctor Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    Primary Doctor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {patient.primaryDoctor || "Not assigned"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Last Visit Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    Last Visit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {formatDate(patient.lastVisit)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Next Appointment Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    Next Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {formatDate(patient.nextAppointment)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Health Tips based on score */}
      {patient.healthScore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Heart className="w-5 h-5 text-cyan-500" />
                Health Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {patient.healthScore >= 80 && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    🎉 Excellent! You're maintaining great health habits. Keep
                    up the good work with regular exercise and balanced
                    nutrition.
                  </p>
                )}
                {patient.healthScore >= 60 && patient.healthScore < 80 && (
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                    👍 Good progress! Consider increasing your water intake and
                    adding more physical activity to your routine.
                  </p>
                )}
                {patient.healthScore >= 40 && patient.healthScore < 60 && (
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                    💪 Let's focus on improving sleep quality and stress
                    management. Consider scheduling a checkup with your doctor.
                  </p>
                )}
                {patient.healthScore < 40 && (
                  <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">
                    🩺 It's important to consult with your healthcare provider.
                    Focus on establishing consistent healthy habits.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
