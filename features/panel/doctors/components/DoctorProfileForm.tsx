"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  X,
  Plus,
  User,
  Stethoscope,
  MapPin,
  DollarSign,
  Languages,
  Clock,
  Camera,
  Calendar,
  AlertCircle,
  Save,
  Edit,
  CheckCircle,
  Sparkles,
  Award,
  Building2,
  Phone,
  Mail,
  GraduationCap,
} from "lucide-react";

export default function DoctorProfileForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    gender: "",
    profilePic: "",
    fees: "",
    city: "",
    email: "",
    phone: "",
    education: "",
  });

  const [specialtyTags, setSpecialtyTags] = useState<string[]>([]);
  const [languageTags, setLanguageTags] = useState<string[]>([]);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [availabilityDays, setAvailabilityDays] = useState<
    Record<string, string>
  >({});

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialtyTags.includes(newSpecialty.trim())) {
      setSpecialtyTags([...specialtyTags, newSpecialty.trim()]);
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialtyTags(specialtyTags.filter((s) => s !== specialty));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languageTags.includes(newLanguage.trim())) {
      setLanguageTags([...languageTags, newLanguage.trim()]);
      setNewLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    setLanguageTags(languageTags.filter((l) => l !== language));
  };

  const updateAvailability = (day: string, time: string) => {
    const updated = { ...availabilityDays };
    if (time.trim()) {
      updated[day.toLowerCase()] = time;
    } else {
      delete updated[day.toLowerCase()];
    }
    setAvailabilityDays(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Profile submitted successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-xl">
                  Doctor Profile
                </h2>
                <p className="text-xs text-slate-600">
                  Complete your professional information
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Card */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-2xl flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-teal-500 rounded-full border-4 border-white flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">
                    Create Your Profile
                  </h1>
                  <p className="text-slate-600 text-lg mb-4">
                    Join our network of trusted healthcare professionals
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Quick Setup
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Platform
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardHeader className="border-b border-slate-200 pb-4">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-cyan-600" />
                </div>
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <Input
                    placeholder="Dr. John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12 text-base border-slate-300 focus:border-cyan-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Gender
                  </label>
                  <Select
                    value={formData.gender}
                    onValueChange={(val) =>
                      setFormData({ ...formData, gender: val })
                    }
                  >
                    <SelectTrigger className="h-12 border-slate-300 focus:border-cyan-600">
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
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-600" />
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="doctor@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-12 text-base border-slate-300 focus:border-cyan-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-600" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="h-12 text-base border-slate-300 focus:border-cyan-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-cyan-600" />
                  Profile Picture URL
                </label>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  value={formData.profilePic}
                  onChange={(e) =>
                    setFormData({ ...formData, profilePic: e.target.value })
                  }
                  className="h-12 text-base border-slate-300 focus:border-cyan-600"
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardHeader className="border-b border-slate-200 pb-4">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-teal-600" />
                </div>
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Primary Specialization *
                  </label>
                  <Input
                    placeholder="e.g., Cardiologist, Neurologist"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    className="h-12 text-base border-slate-300 focus:border-cyan-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Award className="w-4 h-4 text-teal-600" />
                    Years of Experience
                  </label>
                  <Input
                    type="number"
                    placeholder="5"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="h-12 text-base border-slate-300 focus:border-cyan-600"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-teal-600" />
                    Education & Qualifications
                  </label>
                  <Input
                    placeholder="MBBS, MD - General Medicine"
                    value={formData.education}
                    onChange={(e) =>
                      setFormData({ ...formData, education: e.target.value })
                    }
                    className="h-12 text-base border-slate-300 focus:border-cyan-600"
                  />
                </div>
              </div>

              {/* Specialties Tags */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700">
                  Sub-Specialties
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a specialty (e.g., Heart Surgery)"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSpecialty())
                    }
                    className="h-12 border-slate-300 focus:border-cyan-600"
                  />
                  <Button
                    type="button"
                    onClick={addSpecialty}
                    className="h-12 px-6 bg-cyan-600 hover:bg-cyan-700"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialtyTags.map((specialty) => (
                    <Badge
                      key={specialty}
                      className="px-4 py-2 text-sm bg-cyan-100 text-cyan-700 hover:bg-cyan-100"
                    >
                      {specialty}
                      <button
                        type="button"
                        onClick={() => removeSpecialty(specialty)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Consultation */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardHeader className="border-b border-slate-200 pb-4">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                Location & Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Practice City
                  </label>
                  <Input
                    placeholder="e.g., Mumbai, Delhi"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="h-12 text-base border-slate-300 focus:border-cyan-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    Consultation Fees (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="1500"
                    value={formData.fees}
                    onChange={(e) =>
                      setFormData({ ...formData, fees: e.target.value })
                    }
                    className="h-12 text-base border-slate-300 focus:border-cyan-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardHeader className="border-b border-slate-200 pb-4">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Languages className="w-5 h-5 text-purple-600" />
                </div>
                Languages Spoken
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a language (e.g., Hindi, English)"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addLanguage())
                  }
                  className="h-12 border-slate-300 focus:border-cyan-600"
                />
                <Button
                  type="button"
                  onClick={addLanguage}
                  className="h-12 px-6 bg-cyan-600 hover:bg-cyan-700"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {languageTags.map((language) => (
                  <Badge
                    key={language}
                    className="px-4 py-2 text-sm bg-purple-100 text-purple-700 hover:bg-purple-100"
                  >
                    {language}
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Availability */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardHeader className="border-b border-slate-200 pb-4">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                Weekly Availability
              </CardTitle>
              <p className="text-sm text-slate-600 mt-2">
                Set your working hours for each day
              </p>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {weekDays.map((day) => {
                const dayKey = day.toLowerCase();
                const isActive = availabilityDays[dayKey];

                return (
                  <div
                    key={day}
                    className="border-2 border-slate-200 rounded-xl p-5 hover:border-cyan-600 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={dayKey}
                          checked={!!isActive}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              updateAvailability(day, "");
                            } else {
                              updateAvailability(day, "9:00 AM - 5:00 PM");
                            }
                          }}
                          className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                        />
                        <label
                          htmlFor={dayKey}
                          className={`text-base font-bold cursor-pointer ${
                            isActive ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {day}
                        </label>
                      </div>
                      {isActive && (
                        <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Available
                        </Badge>
                      )}
                    </div>

                    {isActive && (
                      <div className="grid grid-cols-2 gap-4 ml-8">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-600">
                            Start Time
                          </label>
                          <Select
                            value={isActive.split(" - ")[0] || "9:00 AM"}
                            onValueChange={(startTime) => {
                              const endTime =
                                isActive.split(" - ")[1] || "5:00 PM";
                              updateAvailability(
                                day,
                                `${startTime} - ${endTime}`
                              );
                            }}
                          >
                            <SelectTrigger className="h-10 border-slate-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "6:00 AM",
                                "7:00 AM",
                                "8:00 AM",
                                "9:00 AM",
                                "10:00 AM",
                                "11:00 AM",
                                "12:00 PM",
                              ].map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-600">
                            End Time
                          </label>
                          <Select
                            value={isActive.split(" - ")[1] || "5:00 PM"}
                            onValueChange={(endTime) => {
                              const startTime =
                                isActive.split(" - ")[0] || "9:00 AM";
                              updateAvailability(
                                day,
                                `${startTime} - ${endTime}`
                              );
                            }}
                          >
                            <SelectTrigger className="h-10 border-slate-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "12:00 PM",
                                "1:00 PM",
                                "2:00 PM",
                                "3:00 PM",
                                "4:00 PM",
                                "5:00 PM",
                                "6:00 PM",
                                "7:00 PM",
                                "8:00 PM",
                              ].map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    weekDays.forEach((day) =>
                      updateAvailability(day, "9:00 AM - 5:00 PM")
                    );
                  }}
                  className="border-2 hover:bg-cyan-50 hover:border-cyan-600"
                >
                  <Clock className="w-4 h-4 mr-1" />
                  All Days 9-5
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].forEach((day) =>
                      updateAvailability(day, "9:00 AM - 6:00 PM")
                    );
                    ["Saturday", "Sunday"].forEach((day) =>
                      updateAvailability(day, "")
                    );
                  }}
                  className="border-2 hover:bg-teal-50 hover:border-teal-600"
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Weekdays Only
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    weekDays.forEach((day) => updateAvailability(day, ""));
                  }}
                  className="border-2 hover:bg-red-50 hover:border-red-600"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              </div>

              {/* Summary */}
              {Object.keys(availabilityDays).length > 0 && (
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-5 border-2 border-cyan-200">
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    Availability Summary
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(availabilityDays).map(([day, time]) => (
                      <div
                        key={day}
                        className="flex justify-between items-center"
                      >
                        <span className="capitalize font-semibold text-slate-700">
                          {day}:
                        </span>
                        <span className="text-slate-600 font-medium">
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Alert */}
          <Alert className="border-2 border-blue-200 bg-blue-50">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-slate-700 font-medium">
              Your profile will be reviewed by our admin team before going live.
              You'll receive a notification once approved.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardContent className="p-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 text-lg font-bold bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Profile...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-6 h-6" />
                    Submit Profile for Review
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
