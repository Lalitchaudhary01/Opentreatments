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
import { User, Phone } from "lucide-react";

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
    fullName: patient.fullName || "",
    age: patient.age?.toString() || "",
    gender: patient.gender || "",
    phoneNumber: patient.phoneNumber || "",
    email: patient.email || "",
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
      // Convert empty strings to null for Prisma
      fullName: formData.fullName || null,
      gender: formData.gender || null,
      phoneNumber: formData.phoneNumber || null,
      email: formData.email || null,
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
      fullName: patient.fullName || "",
      age: patient.age?.toString() || "",
      gender: patient.gender || "",
      phoneNumber: patient.phoneNumber || "",
      email: patient.email || "",
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

  // Helper function to display values safely
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
    },
    {
      label: "Age",
      value: patient.age ? `${patient.age} years` : "Not provided",
    },
    {
      label: "Gender",
      value: displayValue(patient.gender),
    },
    {
      label: "Blood Group",
      value: displayValue(patient.bloodGroup),
    },
    {
      label: "Height",
      value: patient.height ? `${patient.height} cm` : "Not provided",
    },
    {
      label: "Weight",
      value: patient.weight ? `${patient.weight} kg` : "Not provided",
    },
  ];

  const contactInfo = [
    {
      label: "Email",
      value: displayValue(patient.email),
    },
    {
      label: "Phone",
      value: displayValue(patient.phoneNumber),
    },
    {
      label: "Address",
      value: displayValue(patient.address),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
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
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) => handleChange("bloodGroup", value)}
                  >
                    <SelectTrigger>
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
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {personalInfo.map((info, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-gray-500">{info.label}</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {info.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-gray-500">{info.label}</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {info.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
