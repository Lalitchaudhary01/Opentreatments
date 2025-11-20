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
import { User, Phone, Edit3, Save, X, Mail, MapPin } from "lucide-react";

interface ProfileContentProps {
  patient: Patient;
  onUpdate: (data: Partial<Patient>) => Promise<boolean>;
}

export default function ProfileContent({
  patient,
  onUpdate,
}: ProfileContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: patient.age?.toString() || "",
    gender: patient.gender || "",
    address: patient.address || "",
    height: patient.height || "",
    weight: patient.weight || "",
    bloodGroup: patient.bloodGroup || "",
  });

  const handleSave = async () => {
    setLoading(true);
    const dataToUpdate = {
      ...formData,
      age: formData.age ? parseInt(formData.age) : null,
      gender: formData.gender || null,
      address: formData.address || null,
      height: formData.height || null,
      weight: formData.weight || null,
      bloodGroup: formData.bloodGroup || null,
    };

    const success = await onUpdate(dataToUpdate);
    setLoading(false);

    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      age: patient.age?.toString() || "",
      gender: patient.gender || "",
      address: patient.address || "",
      height: patient.height || "",
      weight: patient.weight || "",
      bloodGroup: patient.bloodGroup || "",
    });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const displayValue = (
    value: string | null | undefined,
    fallback: string = "Not provided"
  ) => {
    return value || fallback;
  };

  const personalInfo = [
    {
      label: "Full Name",
      value: displayValue(patient.fullName),
      icon: User,
    },
    {
      label: "Age",
      value: patient.age ? `${patient.age} years` : "Not provided",
      icon: User,
    },
    {
      label: "Gender",
      value: displayValue(patient.gender),
      icon: User,
    },
    {
      label: "Blood Group",
      value: displayValue(patient.bloodGroup),
      icon: User,
    },
    {
      label: "Height",
      value: patient.height ? `${patient.height} cm` : "Not provided",
      icon: User,
    },
    {
      label: "Weight",
      value: patient.weight ? `${patient.weight} kg` : "Not provided",
      icon: User,
    },
  ];

  const contactInfo = [
    {
      label: "Email",
      value: displayValue(patient.email),
      icon: Mail,
    },
    {
      label: "Phone",
      value: displayValue(patient.phoneNumber),
      icon: Phone,
    },
    {
      label: "Address",
      value: displayValue(patient.address),
      icon: MapPin,
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
          Personal Information
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
                Edit Profile
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
            className="space-y-6"
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name - Read Only */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={patient.fullName || ""}
                      disabled
                      className="bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                    />
                  </div>

                  {/* Age - Editable */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="age"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  {/* Gender - Editable */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="gender"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Gender
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleChange("gender", value)}
                    >
                      <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Blood Group - Editable */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="bloodGroup"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Blood Group
                    </Label>
                    <Select
                      value={formData.bloodGroup}
                      onValueChange={(value) =>
                        handleChange("bloodGroup", value)
                      }
                    >
                      <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Height - Editable */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="height"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      value={formData.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  {/* Weight - Editable */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="weight"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email - Read Only */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={patient.email || ""}
                    disabled
                    className="bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                  />
                </div>

                {/* Phone Number - Read Only */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={patient.phoneNumber || ""}
                    disabled
                    className="bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                  />
                </div>

                {/* Address - Editable */}
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                  />
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
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {personalInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                        <info.icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {info.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-right max-w-[60%]">
                      {info.value}
                    </span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                        <info.icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {info.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-right max-w-[60%] break-words">
                      {info.value}
                    </span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
