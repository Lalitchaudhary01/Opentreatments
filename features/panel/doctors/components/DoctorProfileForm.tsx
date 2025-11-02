"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { submitDoctorProfile } from "../actions/submitDoctorProfile";
import { SubmitDoctorProfileInput } from "../types/doctorProfile";
import { updateDoctorProfile } from "../actions/updateDoctorProfile";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  specialization: z.string().min(2, "Specialization required"),
  specialties: z.string().optional(),
  experience: z.number().min(0, "Experience must be positive").optional(),
  gender: z.string().optional(),
  profilePic: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  fees: z.number().min(0, "Fees must be positive").optional(),
  languages: z.string().optional(),
  city: z.string().optional(),
  availability: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function DoctorProfileForm({
  initialData,
}: {
  initialData?: Partial<ProfileFormValues>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [specialtyTags, setSpecialtyTags] = useState<string[]>(() => {
    if (!initialData?.specialties) return [];
    if (Array.isArray(initialData.specialties)) return initialData.specialties;
    if (typeof initialData.specialties === "string") {
      return initialData.specialties
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
    }
    return [];
  });

  const [languageTags, setLanguageTags] = useState<string[]>(() => {
    if (!initialData?.languages) return [];
    if (Array.isArray(initialData.languages)) return initialData.languages;
    if (typeof initialData.languages === "string") {
      return initialData.languages
        .split(",")
        .map((l) => l.trim())
        .filter((l) => l);
    }
    return [];
  });
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [availabilityDays, setAvailabilityDays] = useState<{
    [key: string]: string;
  }>(() => {
    if (!initialData?.availability) return {};

    try {
      if (typeof initialData.availability === "string") {
        return JSON.parse(initialData.availability);
      }
      if (typeof initialData.availability === "object") {
        return initialData.availability;
      }
    } catch (error) {
      console.warn("Failed to parse availability:", error);
    }

    return {};
  });

  const isEditMode = !!initialData;
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData?.name || "",
      specialization: initialData?.specialization || "",
      specialties: Array.isArray(initialData?.specialties)
        ? initialData.specialties.join(", ")
        : initialData?.specialties || "",
      experience: initialData?.experience || undefined,
      gender: initialData?.gender || "",
      profilePic: initialData?.profilePic || "",
      fees: initialData?.fees || undefined,
      languages: Array.isArray(initialData?.languages)
        ? initialData.languages.join(", ")
        : initialData?.languages || "",
      city: initialData?.city || "",
      availability:
        typeof initialData?.availability === "object"
          ? JSON.stringify(initialData.availability)
          : initialData?.availability || "",
    },
  });

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialtyTags.includes(newSpecialty.trim())) {
      const updated = [...specialtyTags, newSpecialty.trim()];
      setSpecialtyTags(updated);
      form.setValue("specialties", updated.join(", "));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    const updated = specialtyTags.filter((s) => s !== specialty);
    setSpecialtyTags(updated);
    form.setValue("specialties", updated.join(", "));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languageTags.includes(newLanguage.trim())) {
      const updated = [...languageTags, newLanguage.trim()];
      setLanguageTags(updated);
      form.setValue("languages", updated.join(", "));
      setNewLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    const updated = languageTags.filter((l) => l !== language);
    setLanguageTags(updated);
    form.setValue("languages", updated.join(", "));
  };

  const updateAvailability = (day: string, time: string) => {
    const updated = { ...availabilityDays };
    if (time.trim()) {
      updated[day.toLowerCase()] = time;
    } else {
      delete updated[day.toLowerCase()];
    }
    setAvailabilityDays(updated);
    form.setValue("availability", JSON.stringify(updated));
  };

  async function onSubmit(values: ProfileFormValues) {
    setLoading(true);
    try {
      // Transform availability to always be an object or undefined
      let availabilityObject: Record<string, any> | undefined;

      if (Object.keys(availabilityDays).length > 0) {
        availabilityObject = availabilityDays;
      } else if (values.availability) {
        // If there's availability from form values, parse it
        if (typeof values.availability === "string") {
          try {
            availabilityObject = JSON.parse(values.availability);
          } catch (error) {
            console.warn("Failed to parse availability string:", error);
            availabilityObject = undefined;
          }
        } else if (typeof values.availability === "object") {
          availabilityObject = values.availability;
        }
      }

      // Create the payload with proper typing
      const payload: Partial<SubmitDoctorProfileInput> = {
        name: values.name,
        specialization: values.specialization,
        specialties:
          specialtyTags.length > 0
            ? specialtyTags
            : values.specialties
            ? values.specialties.split(",").map((s) => s.trim())
            : [],
        experience: values.experience,
        gender: values.gender,
        profilePic: values.profilePic,
        fees: values.fees,
        languages:
          languageTags.length > 0
            ? languageTags
            : values.languages
            ? values.languages.split(",").map((l) => l.trim())
            : [],
        city: values.city,
        availability: availabilityObject,
      };

      // Remove undefined values to avoid sending them
      Object.keys(payload).forEach((key) => {
        if (payload[key as keyof SubmitDoctorProfileInput] === undefined) {
          delete payload[key as keyof SubmitDoctorProfileInput];
        }
      });

      if (isEditMode) {
        await updateDoctorProfile(payload);
      } else {
        await submitDoctorProfile(payload);
      }

      router.push("/doctor/profile/view");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // ... rest of your JSX component remains exactly the same ...
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* ALL YOUR EXISTING JSX CODE HERE - IT REMAINS UNCHANGED */}
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
            {isEditMode ? (
              <Edit className="w-8 h-8" />
            ) : (
              <User className="w-8 h-8" />
            )}
            {isEditMode ? "Edit Profile" : "Doctor Registration"}
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            {isEditMode
              ? "Update your professional information"
              : "Create your professional profile"}
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Your existing form sections */}
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <User className="w-6 h-6 text-blue-500" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Dr. John Doe"
                              className="h-12 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Gender
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="profilePic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          Profile Picture URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/photo.jpg"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Stethoscope className="w-6 h-6 text-green-500" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Primary Specialization *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Cardiologist, Neurologist"
                              className="h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Years of Experience
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="5"
                              className="h-12"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Specialties Tags */}
                  <div className="space-y-4">
                    <FormLabel className="text-base font-semibold">
                      Sub-Specialties
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a specialty (e.g., Heart Surgery)"
                        value={newSpecialty}
                        onChange={(e) => setNewSpecialty(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addSpecialty())
                        }
                        className="h-12"
                      />
                      <Button
                        type="button"
                        onClick={addSpecialty}
                        variant="outline"
                        size="lg"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {specialtyTags.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
                          className="px-3 py-2 text-sm"
                        >
                          {specialty}
                          <button
                            type="button"
                            onClick={() => removeSpecialty(specialty)}
                            className="ml-2 text-muted-foreground hover:text-red-500 transition-colors"
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MapPin className="w-6 h-6 text-purple-500" />
                    Location & Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Practice City
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Mumbai, Delhi"
                              className="h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Consultation Fees (₹)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="1500"
                              className="h-12"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Languages className="w-6 h-6 text-orange-500" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a language (e.g., Hindi, English)"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addLanguage())
                      }
                      className="h-12"
                    />
                    <Button
                      type="button"
                      onClick={addLanguage}
                      variant="outline"
                      size="lg"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {languageTags.map((language) => (
                      <Badge
                        key={language}
                        variant="secondary"
                        className="px-3 py-2 text-sm"
                      >
                        {language}
                        <button
                          type="button"
                          onClick={() => removeLanguage(language)}
                          className="ml-2 text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Availability Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="w-6 h-6 text-teal-500" />
                    Weekly Availability
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select your working days and set time slots for each day
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {weekDays.map((day) => {
                    const dayKey = day.toLowerCase();
                    const isActive = availabilityDays[dayKey];

                    return (
                      <div
                        key={day}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
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
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <FormLabel
                              htmlFor={dayKey}
                              className={`text-base font-medium cursor-pointer ${
                                isActive
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {day}
                            </FormLabel>
                          </div>
                          {isActive && (
                            <Badge variant="secondary" className="text-xs">
                              Available
                            </Badge>
                          )}
                        </div>

                        {isActive && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-7">
                            <div className="space-y-2">
                              <FormLabel className="text-sm text-muted-foreground">
                                Start Time
                              </FormLabel>
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
                                <SelectTrigger className="h-10">
                                  <SelectValue placeholder="Start time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "6:00 AM",
                                    "6:30 AM",
                                    "7:00 AM",
                                    "7:30 AM",
                                    "8:00 AM",
                                    "8:30 AM",
                                    "9:00 AM",
                                    "9:30 AM",
                                    "10:00 AM",
                                    "10:30 AM",
                                    "11:00 AM",
                                    "11:30 AM",
                                    "12:00 PM",
                                    "12:30 PM",
                                    "1:00 PM",
                                    "1:30 PM",
                                    "2:00 PM",
                                    "2:30 PM",
                                    "3:00 PM",
                                    "3:30 PM",
                                  ].map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <FormLabel className="text-sm text-muted-foreground">
                                End Time
                              </FormLabel>
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
                                <SelectTrigger className="h-10">
                                  <SelectValue placeholder="End time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "12:00 PM",
                                    "12:30 PM",
                                    "1:00 PM",
                                    "1:30 PM",
                                    "2:00 PM",
                                    "2:30 PM",
                                    "3:00 PM",
                                    "3:30 PM",
                                    "4:00 PM",
                                    "4:30 PM",
                                    "5:00 PM",
                                    "5:30 PM",
                                    "6:00 PM",
                                    "6:30 PM",
                                    "7:00 PM",
                                    "7:30 PM",
                                    "8:00 PM",
                                    "8:30 PM",
                                    "9:00 PM",
                                    "9:30 PM",
                                    "10:00 PM",
                                    "10:30 PM",
                                    "11:00 PM",
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
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        weekDays.forEach((day) => {
                          updateAvailability(day, "9:00 AM - 5:00 PM");
                        });
                      }}
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
                        ].forEach((day) => {
                          updateAvailability(day, "9:00 AM - 6:00 PM");
                        });
                        ["Saturday", "Sunday"].forEach((day) => {
                          updateAvailability(day, "");
                        });
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Weekdays Only
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        weekDays.forEach((day) => {
                          updateAvailability(day, "");
                        });
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  </div>

                  {/* Summary */}
                  {Object.keys(availabilityDays).length > 0 && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">
                        Availability Summary:
                      </h4>
                      <div className="text-sm space-y-1">
                        {Object.entries(availabilityDays).map(([day, time]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize font-medium">
                              {day}:
                            </span>
                            <span className="text-muted-foreground">
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
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your profile will be reviewed by our admin team before going
                  live. You'll receive a notification once approved.
                </AlertDescription>
              </Alert>

              {/* Submit Button */}
              <Card>
                <CardContent className="pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-lg font-semibold"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {isEditMode ? "Updating..." : "Submitting..."}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="w-5 h-5" />
                        {isEditMode ? "Update Profile" : "Submit Profile"}
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
