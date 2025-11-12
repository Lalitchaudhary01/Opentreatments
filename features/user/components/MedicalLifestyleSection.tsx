"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { MedicalProfile } from "../server/types";
// import { updateMedicalProfile } from "../server/actions";
import { Activity, ChevronDown, Edit3, Save, X } from "lucide-react";
import { MedicalProfile } from "../types/medical-profile";
import { updateMedicalProfile } from "../actions/actions";

interface MedicalLifestyleSectionProps {
  profile: MedicalProfile;
  onUpdate: () => void;
}

export default function MedicalLifestyleSection({
  profile,
  onUpdate,
}: MedicalLifestyleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    height: profile.height || 0,
    weight: profile.weight || 0,
    bmi: profile.bmi || 0,
    sleepDuration: profile.sleepDuration || 0,
    foodPreference: profile.foodPreference || "",
    exerciseFrequency: profile.exerciseFrequency || "",
    alcoholConsumption: profile.alcoholConsumption || "",
    smokingHabit: profile.smokingHabit || false,
    allergies: profile.allergies || [],
    chronicDiseases: profile.chronicDiseases || [],
    medications: profile.medications || [],
    surgeries: profile.surgeries || [],
    familyHistory: profile.familyHistory || [],
  });

  const calculateBMI = (height: number, weight: number) => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      return parseFloat(
        (weight / (heightInMeters * heightInMeters)).toFixed(1)
      );
    }
    return 0;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const bmi = calculateBMI(formData.height, formData.weight);
      await updateMedicalProfile(profile.userId, {
        ...formData,
        bmi,
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating medical info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleArrayInput = (field: keyof typeof formData, value: string) => {
    const currentArray = formData[field] as string[];
    setFormData({
      ...formData,
      [field]: value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
    });
  };

  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm shadow-primary/5">
      <CardContent className="p-0">
        <div className="flex justify-between items-center px-4 py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-1 cursor-pointer items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-primary" />
              <p className="text-dark-blue dark:text-white text-base font-bold">
                Medical & Lifestyle Information
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
                    height: profile.height || 0,
                    weight: profile.weight || 0,
                    bmi: profile.bmi || 0,
                    sleepDuration: profile.sleepDuration || 0,
                    foodPreference: profile.foodPreference || "",
                    exerciseFrequency: profile.exerciseFrequency || "",
                    alcoholConsumption: profile.alcoholConsumption || "",
                    smokingHabit: profile.smokingHabit || false,
                    allergies: profile.allergies || [],
                    chronicDiseases: profile.chronicDiseases || [],
                    medications: profile.medications || [],
                    surgeries: profile.surgeries || [],
                    familyHistory: profile.familyHistory || [],
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
          <div className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-relaxed pb-4 space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4 px-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>Height (cm)</Label>
                    <Input
                      type="number"
                      value={formData.height || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          height: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input
                      type="number"
                      value={formData.weight || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          weight: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>BMI</Label>
                    <Input
                      value={
                        calculateBMI(formData.height, formData.weight) || 0
                      }
                      readOnly
                      className="bg-gray-100 dark:bg-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sleep Duration (hours)</Label>
                    <Input
                      type="number"
                      value={formData.sleepDuration || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sleepDuration: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Food Preference</Label>
                    <select
                      value={formData.foodPreference}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          foodPreference: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="">Select Preference</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Gluten-Free">Gluten-Free</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Exercise Frequency</Label>
                    <select
                      value={formData.exerciseFrequency}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exerciseFrequency: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="">Select Frequency</option>
                      <option value="Never">Never</option>
                      <option value="1-2 times a week">1-2 times a week</option>
                      <option value="3 times a week">3 times a week</option>
                      <option value="4-5 times a week">4-5 times a week</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Alcohol Consumption</Label>
                    <select
                      value={formData.alcoholConsumption}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          alcoholConsumption: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="">Select Frequency</option>
                      <option value="Never">Never</option>
                      <option value="Occasionally">Occasionally</option>
                      <option value="Regularly">Regularly</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.smokingHabit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        smokingHabit: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <Label>Smoking Habit</Label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Allergies (comma separated)</Label>
                    <Input
                      value={formData.allergies.join(", ")}
                      onChange={(e) =>
                        handleArrayInput("allergies", e.target.value)
                      }
                      placeholder="Penicillin, Peanuts, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Chronic Diseases (comma separated)</Label>
                    <Input
                      value={formData.chronicDiseases.join(", ")}
                      onChange={(e) =>
                        handleArrayInput("chronicDiseases", e.target.value)
                      }
                      placeholder="Asthma, Diabetes, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Medications (comma separated)</Label>
                    <Input
                      value={formData.medications.join(", ")}
                      onChange={(e) =>
                        handleArrayInput("medications", e.target.value)
                      }
                      placeholder="Albuterol, Metformin, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Surgeries (comma separated)</Label>
                    <Input
                      value={formData.surgeries.join(", ")}
                      onChange={(e) =>
                        handleArrayInput("surgeries", e.target.value)
                      }
                      placeholder="Appendectomy, etc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Family History (comma separated)</Label>
                  <Input
                    value={formData.familyHistory.join(", ")}
                    onChange={(e) =>
                      handleArrayInput("familyHistory", e.target.value)
                    }
                    placeholder="Diabetes, Hypertension, etc."
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p>
                      <strong>Height:</strong>{" "}
                      {profile.height ? `${profile.height} cm` : "Not provided"}
                    </p>
                    <p>
                      <strong>Weight:</strong>{" "}
                      {profile.weight ? `${profile.weight} kg` : "Not provided"}
                    </p>
                    <p>
                      <strong>BMI:</strong> {profile.bmi || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Sleep:</strong>{" "}
                      {profile.sleepDuration
                        ? `${profile.sleepDuration} hrs/night`
                        : "Not provided"}
                    </p>
                    <p>
                      <strong>Diet:</strong>{" "}
                      {profile.foodPreference || "Not provided"}
                    </p>
                    <p>
                      <strong>Exercise:</strong>{" "}
                      {profile.exerciseFrequency || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Smoking:</strong>{" "}
                      {profile.smokingHabit ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Alcohol:</strong>{" "}
                      {profile.alcoholConsumption || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Allergies:</strong>{" "}
                      {profile.allergies.length > 0
                        ? profile.allergies.join(", ")
                        : "None"}
                    </p>
                    <p>
                      <strong>Chronic Diseases:</strong>{" "}
                      {profile.chronicDiseases.length > 0
                        ? profile.chronicDiseases.join(", ")
                        : "None"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Medications:</strong>{" "}
                      {profile.medications.length > 0
                        ? profile.medications.join(", ")
                        : "None"}
                    </p>
                    <p>
                      <strong>Surgeries:</strong>{" "}
                      {profile.surgeries.length > 0
                        ? profile.surgeries.join(", ")
                        : "None"}
                    </p>
                  </div>
                </div>

                <div>
                  <p>
                    <strong>Family History:</strong>{" "}
                    {profile.familyHistory.length > 0
                      ? profile.familyHistory.join(", ")
                      : "None"}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
