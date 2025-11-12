"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { MedicalProfile } from "../server/types";
// import { updateMedicalProfile } from "../server/actions";
import { User, ChevronDown, Edit3, Save, X } from "lucide-react";
import { MedicalProfile } from "../types/medical-profile";
import { updateMedicalProfile } from "../actions/actions";

interface PersonalInfoSectionProps {
  profile: MedicalProfile;
  onUpdate: () => void;
}

export default function PersonalInfoSection({
  profile,
  onUpdate,
}: PersonalInfoSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    gender: profile.gender || "",
    dateOfBirth: profile.dateOfBirth?.split("T")[0] || "",
    bloodGroup: profile.bloodGroup || "",
    maritalStatus: profile.maritalStatus || "",
  });

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateMedicalProfile(profile.userId, formData);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating personal info:", error);
    } finally {
      setLoading(false);
    }
  };

  const age = profile.dateOfBirth ? calculateAge(profile.dateOfBirth) : 0;

  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm shadow-primary/5">
      <CardContent className="p-0">
        <div className="flex justify-between items-center px-4 py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-1 cursor-pointer items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <p className="text-dark-blue dark:text-white text-base font-bold">
                Personal Information
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-dark-blue dark:text-white transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="ml-4"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex gap-1 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                disabled={loading}
                className="text-green-600"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    fullName: profile.fullName || "",
                    gender: profile.gender || "",
                    dateOfBirth: profile.dateOfBirth?.split("T")[0] || "",
                    bloodGroup: profile.bloodGroup || "",
                    maritalStatus: profile.maritalStatus || "",
                  });
                }}
                className="text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {isOpen && (
          <div className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-relaxed pb-4 space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4 px-4">
            {isEditing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Group</Label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) =>
                        setFormData({ ...formData, bloodGroup: e.target.value })
                      }
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Marital Status</Label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maritalStatus: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {profile.fullName || "Not provided"}
                </p>
                <p>
                  <strong>Gender:</strong> {profile.gender || "Not provided"}
                </p>
                <p>
                  <strong>Age:</strong>{" "}
                  {age > 0 ? `${age} years` : "Not provided"}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {profile.dateOfBirth
                    ? new Date(profile.dateOfBirth).toLocaleDateString()
                    : "Not provided"}
                </p>
                <p>
                  <strong>Blood Group:</strong>{" "}
                  {profile.bloodGroup || "Not provided"}
                </p>
                <p>
                  <strong>Marital Status:</strong>{" "}
                  {profile.maritalStatus || "Not provided"}
                </p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
