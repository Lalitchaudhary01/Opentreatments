"use client";

import { useState } from "react";
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
  Ban, // Replaced Smoking with Ban (alternative icon)
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
      icon: Ban, // Changed from Smoking to Ban
      label: "Smoking Status",
      value: patient.smokingStatus || "Not set",
      key: "smokingStatus",
    },
    {
      icon: Wine,
      label: "Alcohol Consumption",
      value: patient.alcoholConsumption || "Not set",
      key: "alcoholConsumption",
    },
    {
      icon: Utensils,
      label: "Diet Type",
      value: patient.dietType || "Not set",
      key: "dietType",
    },
    {
      icon: Moon,
      label: "Sleep Hours",
      value: patient.sleepHours ? `${patient.sleepHours} hours` : "Not set",
      key: "sleepHours",
    },
    {
      icon: Activity,
      label: "Activity Level",
      value: patient.activityLevel || "Not set",
      key: "activityLevel",
    },
    {
      icon: GlassWater,
      label: "Water Intake",
      value: patient.waterIntake
        ? `${patient.waterIntake} glasses/day`
        : "Not set",
      key: "waterIntake",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Lifestyle Information
        </h3>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit Lifestyle
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="smokingStatus">Smoking Status</Label>
                <Select
                  value={formData.smokingStatus}
                  onValueChange={(value) =>
                    handleChange("smokingStatus", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="non-smoker">Non-smoker</SelectItem>
                    <SelectItem value="smoker">Smoker</SelectItem>
                    <SelectItem value="past-smoker">Past Smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="alcoholConsumption">Alcohol Consumption</Label>
                <Select
                  value={formData.alcoholConsumption}
                  onValueChange={(value) =>
                    handleChange("alcoholConsumption", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select alcohol consumption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="occasional">Occasional</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dietType">Diet Type</Label>
                <Select
                  value={formData.dietType}
                  onValueChange={(value) => handleChange("dietType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg">Vegetarian</SelectItem>
                    <SelectItem value="non-veg">Non-vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="activityLevel">Activity Level</Label>
                <Select
                  value={formData.activityLevel}
                  onValueChange={(value) =>
                    handleChange("activityLevel", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sleepHours">Sleep Hours (per day)</Label>
                <Input
                  id="sleepHours"
                  type="number"
                  min="0"
                  max="24"
                  value={formData.sleepHours}
                  onChange={(e) => handleChange("sleepHours", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="waterIntake">Water Intake (glasses/day)</Label>
                <Input
                  id="waterIntake"
                  type="number"
                  min="0"
                  max="20"
                  value={formData.waterIntake}
                  onChange={(e) => handleChange("waterIntake", e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="stressLevel">Stress Level</Label>
                <Select
                  value={formData.stressLevel}
                  onValueChange={(value) => handleChange("stressLevel", value)}
                >
                  <SelectTrigger>
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lifestyleData.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-blue-600" />
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
