"use client";

import { useState } from "react";
import {
  Plus,
  X,
  Clock,
  User,
  Stethoscope,
  MapPin,
  DollarSign,
  Star,
  Languages,
  Calendar,
} from "lucide-react";
import type { AddDoctorInput } from "../actions/addDoctor";
import { useAddDoctor } from "../hooks/useAddDoctor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function AddDoctorForm() {
  const { submitDoctor, loading, error } = useAddDoctor();

  const [form, setForm] = useState<AddDoctorInput>({
    name: "",
    specialization: "",
    specialties: [],
    languages: [],
    experience: undefined,
    gender: "",
    profilePic: "",
    fees: undefined,
    city: "",
    badges: [],
    availability: [],
  });

  const handleChange = (field: keyof AddDoctorInput, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleArrayInput = (field: keyof AddDoctorInput, value: string) => {
    const array = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setForm({ ...form, [field]: array });
  };

  const handleAddAvailability = () => {
    setForm({
      ...form,
      availability: [...(form.availability || []), { day: "", slots: [""] }],
    });
  };

  const handleRemoveAvailability = (index: number) => {
    const updated = [...(form.availability || [])];
    updated.splice(index, 1);
    setForm({ ...form, availability: updated });
  };

  const handleAvailabilityChange = (
    index: number,
    field: "day" | "slots",
    value: string | string[]
  ) => {
    const updated = [...(form.availability || [])];
    if (field === "day") updated[index].day = value as string;
    else updated[index].slots = value as string[];
    setForm({ ...form, availability: updated });
  };

  const handleAddSlot = (index: number) => {
    const updated = [...(form.availability || [])];
    updated[index].slots.push("");
    setForm({ ...form, availability: updated });
  };

  const handleRemoveSlot = (availIndex: number, slotIndex: number) => {
    const updated = [...(form.availability || [])];
    updated[availIndex].slots.splice(slotIndex, 1);
    setForm({ ...form, availability: updated });
  };

  const handleSlotChange = (
    availIndex: number,
    slotIndex: number,
    value: string
  ) => {
    const updated = [...(form.availability || [])];
    updated[availIndex].slots[slotIndex] = value;
    setForm({ ...form, availability: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = await submitDoctor(form);
    if (doctor) {
      alert(`Doctor ${doctor.name} added successfully!`);
      setForm({
        name: "",
        specialization: "",
        specialties: [],
        languages: [],
        experience: undefined,
        gender: "",
        profilePic: "",
        fees: undefined,
        city: "",
        badges: [],
        availability: [],
      });
    }
  };

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "Neurology",
    "Gynecology",
    "General Medicine",
    "Psychiatry",
    "Oncology",
    "Endocrinology",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Add New Doctor
                </h1>
                <p className="text-gray-600">
                  Fill in the doctor's information to add them to the system
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Enter the doctor's personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Dr. John Smith"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={form.gender || ""}
                    onValueChange={(value) => handleChange("gender", value)}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profilePic">Profile Picture URL</Label>
                  <Input
                    id="profilePic"
                    placeholder="https://example.com/profile.jpg"
                    value={form.profilePic || ""}
                    onChange={(e) => handleChange("profilePic", e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="5"
                    value={form.experience || ""}
                    onChange={(e) =>
                      handleChange(
                        "experience",
                        parseInt(e.target.value) || undefined
                      )
                    }
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blue-600" />
                Professional Details
              </CardTitle>
              <CardDescription>
                Medical specialization and expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="specialization">
                    Primary Specialization *
                  </Label>
                  <Select
                    value={form.specialization}
                    onValueChange={(value) =>
                      handleChange("specialization", value)
                    }
                    required
                  >
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fees">Consultation Fees (₹)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="fees"
                      type="number"
                      placeholder="500"
                      value={form.fees || ""}
                      onChange={(e) =>
                        handleChange(
                          "fees",
                          parseFloat(e.target.value) || undefined
                        )
                      }
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialties">Specialties *</Label>
                <Input
                  id="specialties"
                  placeholder="Heart Surgery, Cardiac Catheterization, Preventive Cardiology"
                  value={form.specialties?.join(", ") || ""}
                  onChange={(e) =>
                    handleArrayInput("specialties", e.target.value)
                  }
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500">
                  Enter specialties separated by commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="badges">Badges & Certifications</Label>
                <Input
                  id="badges"
                  placeholder="Board Certified, Fellowship Trained, Award Winner"
                  value={form.badges?.join(", ") || ""}
                  onChange={(e) => handleArrayInput("badges", e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500">
                  Enter badges separated by commas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Location & Languages */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Location & Languages
              </CardTitle>
              <CardDescription>
                Practice location and communication details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    value={form.city || ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Languages Spoken *</Label>
                  <div className="relative">
                    <Input
                      id="languages"
                      placeholder="English, Hindi, Marathi"
                      value={form.languages?.join(", ") || ""}
                      onChange={(e) =>
                        handleArrayInput("languages", e.target.value)
                      }
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-20"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        const currentValue = form.languages?.join(", ") || "";
                        const newValue =
                          currentValue + (currentValue ? ", " : "");
                        document.getElementById("languages")?.focus();
                        handleArrayInput("languages", newValue);
                      }}
                    >
                      , +
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Enter languages separated by commas or click ", +" to add
                    comma
                  </p>
                  {form.languages && form.languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.languages.map((language, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Availability Schedule
              </CardTitle>
              <CardDescription>
                Set the doctor's available days and time slots
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(form.availability || []).map((availability, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">
                        Day {index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAvailability(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Day of the Week</Label>
                        <Select
                          value={availability.day}
                          onValueChange={(value) =>
                            handleAvailabilityChange(index, "day", value)
                          }
                        >
                          <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            {days.map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Time Slots</Label>
                        {availability.slots.map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className="flex items-center gap-3"
                          >
                            <div className="flex-1 relative">
                              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                placeholder="09:00 AM - 12:00 PM"
                                value={slot}
                                onChange={(e) =>
                                  handleSlotChange(
                                    index,
                                    slotIndex,
                                    e.target.value
                                  )
                                }
                                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            {availability.slots.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRemoveSlot(index, slotIndex)
                                }
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddSlot(index)}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Time Slot
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={handleAddAvailability}
                className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Availability Day
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 shadow-sm px-8"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding Doctor...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Doctor
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
