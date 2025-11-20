"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Patient } from "../types/patient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  GlassWater,
  Moon,
  Utensils,
  Wine,
  Ban,
  Edit3,
  Save,
  X,
  Zap,
} from "lucide-react";

interface LifestyleContentProps {
  patient: Patient;
  onUpdate: (data: any) => Promise<boolean>;
}

export default function LifestyleContent({
  patient,
  onUpdate,
}: LifestyleContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    smokingStatus: patient.smokingStatus || "",
    alcoholConsumption: patient.alcoholConsumption || "",
    dietType: patient.dietType || "",
    sleepHours: patient.sleepHours?.toString() || "",
    activityLevel: patient.activityLevel || "",
    waterIntake: patient.waterIntake?.toString() || "",
    stressLevel: patient.stressLevel || "",
  });

  const handleSave = async () => {
    setLoading(true);
    const dataToUpdate = {
      ...formData,
      sleepHours: formData.sleepHours
        ? parseInt(formData.sleepHours)
        : undefined,
      waterIntake: formData.waterIntake
        ? parseInt(formData.waterIntake)
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
      smokingStatus: patient.smokingStatus || "",
      alcoholConsumption: patient.alcoholConsumption || "",
      dietType: patient.dietType || "",
      sleepHours: patient.sleepHours?.toString() || "",
      activityLevel: patient.activityLevel || "",
      waterIntake: patient.waterIntake?.toString() || "",
      stressLevel: patient.stressLevel || "",
    });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const lifestyleData = [
    {
      icon: Ban,
      label: "Smoking Status",
      value: patient.smokingStatus || "Not set",
      key: "smokingStatus",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Wine,
      label: "Alcohol Consumption",
      value: patient.alcoholConsumption || "Not set",
      key: "alcoholConsumption",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Utensils,
      label: "Diet Type",
      value: patient.dietType || "Not set",
      key: "dietType",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Moon,
      label: "Sleep Hours",
      value: patient.sleepHours ? `${patient.sleepHours} hours` : "Not set",
      key: "sleepHours",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Activity,
      label: "Activity Level",
      value: patient.activityLevel || "Not set",
      key: "activityLevel",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: GlassWater,
      label: "Water Intake",
      value: patient.waterIntake
        ? `${patient.waterIntake} glasses/day`
        : "Not set",
      key: "waterIntake",
      color: "from-sky-500 to-cyan-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h3
          className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Lifestyle Information
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
                Edit Lifestyle
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
                      htmlFor="smokingStatus"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Smoking Status
                    </Label>
                    <Select
                      value={formData.smokingStatus}
                      onValueChange={(value) =>
                        handleChange("smokingStatus", value)
                      }
                    >
                      <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400">
                        <SelectValue placeholder="Select smoking status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="non-smoker">Non-smoker</SelectItem>
                        <SelectItem value="smoker">Smoker</SelectItem>
                        <SelectItem value="past-smoker">Past Smoker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="alcoholConsumption"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Alcohol Consumption
                    </Label>
                    <Select
                      value={formData.alcoholConsumption}
                      onValueChange={(value) =>
                        handleChange("alcoholConsumption", value)
                      }
                    >
                      <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400">
                        <SelectValue placeholder="Select alcohol consumption" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="occasional">Occasional</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="dietType"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Diet Type
                    </Label>
                    <Select
                      value={formData.dietType}
                      onValueChange={(value) => handleChange("dietType", value)}
                    >
                      <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400">
                        <SelectValue placeholder="Select diet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="non-veg">Non-vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="activityLevel"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Activity Level
                    </Label>
                    <Select
                      value={formData.activityLevel}
                      onValueChange={(value) =>
                        handleChange("activityLevel", value)
                      }
                    >
                      <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="sleepHours"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Sleep Hours (per day)
                    </Label>
                    <Input
                      id="sleepHours"
                      type="number"
                      min="0"
                      max="24"
                      value={formData.sleepHours}
                      onChange={(e) =>
                        handleChange("sleepHours", e.target.value)
                      }
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="waterIntake"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Water Intake (glasses/day)
                    </Label>
                    <Input
                      id="waterIntake"
                      type="number"
                      min="0"
                      max="20"
                      value={formData.waterIntake}
                      onChange={(e) =>
                        handleChange("waterIntake", e.target.value)
                      }
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label
                      htmlFor="stressLevel"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Stress Level
                    </Label>
                    <Select
                      value={formData.stressLevel}
                      onValueChange={(value) =>
                        handleChange("stressLevel", value)
                      }
                    >
                      <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400">
                        <SelectValue placeholder="Select stress level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {lifestyleData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      {item.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {item.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Stress Level Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    Stress Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {patient.stressLevel || "Not set"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
