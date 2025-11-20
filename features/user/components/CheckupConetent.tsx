"use client";

import { useState } from "react";
import { Patient } from "../types/patient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Calendar, TrendingUp } from "lucide-react";

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

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Not recorded";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getHealthStatus = (score: number | undefined) => {
    if (!score) return { text: "Not assessed", color: "gray" };
    if (score >= 80) return { text: "Excellent", color: "green" };
    if (score >= 60) return { text: "Good", color: "blue" };
    if (score >= 40) return { text: "Fair", color: "yellow" };
    return { text: "Needs Improvement", color: "red" };
  };

  const healthStatus = getHealthStatus(patient.healthScore);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Health Checkup & Monitoring
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
              Update Checkup Info
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="healthScore">Health Score (0-100)</Label>
                <Input
                  id="healthScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.healthScore}
                  onChange={(e) => handleChange("healthScore", e.target.value)}
                  placeholder="Enter health score"
                />
              </div>

              <div>
                <Label htmlFor="primaryDoctor">Primary Doctor</Label>
                <Input
                  id="primaryDoctor"
                  value={formData.primaryDoctor}
                  onChange={(e) =>
                    handleChange("primaryDoctor", e.target.value)
                  }
                  placeholder="Doctor's name"
                />
              </div>

              <div>
                <Label htmlFor="lastVisit">Last Visit</Label>
                <Input
                  id="lastVisit"
                  type="date"
                  value={formData.lastVisit}
                  onChange={(e) => handleChange("lastVisit", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="nextAppointment">Next Appointment</Label>
                <Input
                  id="nextAppointment"
                  type="date"
                  value={formData.nextAppointment}
                  onChange={(e) =>
                    handleChange("nextAppointment", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Score Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                {patient.healthScore ? (
                  <>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {patient.healthScore}%
                    </div>
                    <Badge
                      variant={
                        healthStatus.color === "green"
                          ? "default"
                          : healthStatus.color === "blue"
                          ? "secondary"
                          : healthStatus.color === "yellow"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {healthStatus.text}
                    </Badge>
                  </>
                ) : (
                  <div className="text-gray-500">Not assessed yet</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Primary Doctor Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-blue-600" />
                Primary Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {patient.primaryDoctor || "Not assigned"}
              </p>
            </CardContent>
          </Card>

          {/* Last Visit Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Last Visit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {formatDate(patient.lastVisit)}
              </p>
            </CardContent>
          </Card>

          {/* Next Appointment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Next Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {formatDate(patient.nextAppointment)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Health Tips based on score */}
      {patient.healthScore && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">
              Health Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {patient.healthScore >= 80 && (
                <p className="text-sm text-green-600">
                  🎉 Excellent! You're maintaining great health habits. Keep up
                  the good work with regular exercise and balanced nutrition.
                </p>
              )}
              {patient.healthScore >= 60 && patient.healthScore < 80 && (
                <p className="text-sm text-blue-600">
                  👍 Good progress! Consider increasing your water intake and
                  adding more physical activity to your routine.
                </p>
              )}
              {patient.healthScore >= 40 && patient.healthScore < 60 && (
                <p className="text-sm text-yellow-600">
                  💪 Let's focus on improving sleep quality and stress
                  management. Consider scheduling a checkup with your doctor.
                </p>
              )}
              {patient.healthScore < 40 && (
                <p className="text-sm text-red-600">
                  🩺 It's important to consult with your healthcare provider.
                  Focus on establishing consistent healthy habits.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
