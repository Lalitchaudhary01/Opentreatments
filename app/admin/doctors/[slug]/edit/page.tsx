"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  ArrowLeft,
  Save,
} from "lucide-react";
import type { IndependentDoctor } from "@/features/admin/IndependentDoctors/types/independentDoctor";
import { getDoctorById } from "@/features/admin/IndependentDoctors/actions/getDoctorById";
import { updateDoctor } from "@/features/admin/IndependentDoctors/actions/updateDoctor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function EditDoctorPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const router = useRouter();
  const [doctor, setDoctor] = useState<IndependentDoctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setFetchLoading(true);
        const doc = await getDoctorById(slug);
        setDoctor(doc);
      } catch (err) {
        setError("Failed to fetch doctor");
      } finally {
        setFetchLoading(false);
      }
    };
    fetchDoctor();
  }, [slug]);

  const handleChange = (field: keyof IndependentDoctor, value: any) => {
    if (!doctor) return;
    setDoctor({ ...doctor, [field]: value });
  };

  const handleArrayInput = (field: keyof IndependentDoctor, value: string) => {
    if (!doctor) return;
    if (value === "") {
      setDoctor({ ...doctor, [field]: [] });
      return;
    }
    const array = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setDoctor({ ...doctor, [field]: array });
  };

  const handleAddAvailability = () => {
    if (!doctor) return;
    setDoctor({
      ...doctor,
      availability: [...(doctor.availability || []), { day: "", slots: [""] }],
    });
  };

  const handleRemoveAvailability = (index: number) => {
    if (!doctor) return;
    const updated = [...(doctor.availability || [])];
    updated.splice(index, 1);
    setDoctor({ ...doctor, availability: updated });
  };

  const handleAvailabilityChange = (
    index: number,
    field: "day" | "slots",
    value: string | string[]
  ) => {
    if (!doctor) return;
    const updated = [...(doctor.availability || [])];
    if (field === "day") updated[index].day = value as string;
    else updated[index].slots = value as string[];
    setDoctor({ ...doctor, availability: updated });
  };

  const handleAddSlot = (index: number) => {
    if (!doctor) return;
    const updated = [...(doctor.availability || [])];
    updated[index].slots.push("");
    setDoctor({ ...doctor, availability: updated });
  };

  const handleRemoveSlot = (availIndex: number, slotIndex: number) => {
    if (!doctor) return;
    const updated = [...(doctor.availability || [])];
    updated[availIndex].slots.splice(slotIndex, 1);
    setDoctor({ ...doctor, availability: updated });
  };

  const handleSlotChange = (
    availIndex: number,
    slotIndex: number,
    value: string
  ) => {
    if (!doctor) return;
    const updated = [...(doctor.availability || [])];
    updated[availIndex].slots[slotIndex] = value;
    setDoctor({ ...doctor, availability: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) return;

    setLoading(true);
    setError(null);

    try {
      await updateDoctor(doctor);
      router.push("/admin/doctors");
    } catch (err) {
      setError("Failed to update doctor");
    } finally {
      setLoading(false);
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

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Alert variant="destructive">
            <AlertDescription>
              Doctor not found or failed to load.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="p-3 bg-green-100 rounded-xl">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Edit Doctor
                  </h1>
                  <p className="text-gray-600">
                    Update {doctor.name}'s information
                  </p>
                </div>
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
                <User className="h-5 w-5 text-green-600" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Update the doctor's personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Dr. John Smith"
                    value={doctor.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={doctor.gender || ""}
                    onValueChange={(value) => handleChange("gender", value)}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500">
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
                    value={doctor.profilePic || ""}
                    onChange={(e) => handleChange("profilePic", e.target.value)}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="5"
                    value={doctor.experience || ""}
                    onChange={(e) =>
                      handleChange(
                        "experience",
                        parseInt(e.target.value) || undefined
                      )
                    }
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-green-600" />
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
                    value={doctor.specialization}
                    onValueChange={(value) =>
                      handleChange("specialization", value)
                    }
                    required
                  >
                    <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500">
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
                      value={doctor.fees || ""}
                      onChange={(e) =>
                        handleChange(
                          "fees",
                          parseFloat(e.target.value) || undefined
                        )
                      }
                      className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialties">Specialties *</Label>
                <div className="relative">
                  <Input
                    id="specialties"
                    placeholder="Heart Surgery, Cardiac Catheterization, Preventive Cardiology"
                    value={doctor.specialties?.join(", ") || ""}
                    onChange={(e) =>
                      handleArrayInput("specialties", e.target.value)
                    }
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500 pr-20"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      const currentValue = doctor.specialties?.join(", ") || "";
                      const newValue =
                        currentValue + (currentValue ? ", " : "");
                      document.getElementById("specialties")?.focus();
                      handleArrayInput("specialties", newValue);
                    }}
                  >
                    , +
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter specialties separated by commas or click ", +" to add
                  comma
                </p>
                {doctor.specialties && doctor.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="badges">Badges & Certifications</Label>
                <div className="relative">
                  <Input
                    id="badges"
                    placeholder="Board Certified, Fellowship Trained, Award Winner"
                    value={doctor.badges?.join(", ") || ""}
                    onChange={(e) => handleArrayInput("badges", e.target.value)}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500 pr-20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      const currentValue = doctor.badges?.join(", ") || "";
                      const newValue =
                        currentValue + (currentValue ? ", " : "");
                      document.getElementById("badges")?.focus();
                      handleArrayInput("badges", newValue);
                    }}
                  >
                    , +
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter badges separated by commas or click ", +" to add comma
                </p>
                {doctor.badges && doctor.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-green-50 text-green-700 border-green-200"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location & Languages */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
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
                    value={doctor.city || ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Languages Spoken *</Label>
                  <div className="relative">
                    <Input
                      id="languages"
                      placeholder="English, Hindi, Marathi"
                      value={doctor.languages?.join(", ") || ""}
                      onChange={(e) =>
                        handleArrayInput("languages", e.target.value)
                      }
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500 pr-20"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        const currentValue = doctor.languages?.join(", ") || "";
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
                  {doctor.languages && doctor.languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {doctor.languages.map((language, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-green-50 text-green-700 border-green-200"
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
                <Calendar className="h-5 w-5 text-green-600" />
                Availability Schedule
              </CardTitle>
              <CardDescription>
                Update the doctor's available days and time slots
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(doctor.availability || []).map((availability, index) => (
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
                          <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500">
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
                                className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
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
                          className="border-green-200 text-green-600 hover:bg-green-50"
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
                  onClick={() => router.back()}
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 shadow-sm px-8"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Doctor
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
