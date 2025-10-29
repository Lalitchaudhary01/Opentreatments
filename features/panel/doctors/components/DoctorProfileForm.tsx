"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { updateDoctorProfile } from "../actions/updateDoctorProle";

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

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  enabled: boolean;
  slots: TimeSlot[];
}

interface AvailabilityData {
  [key: string]: DayAvailability;
}

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

  // New availability state with better structure
  const [availability, setAvailability] = useState<AvailabilityData>(() => {
    if (!initialData?.availability) {
      // Default empty availability
      const defaultAvailability: AvailabilityData = {};
      weekDays.forEach((day) => {
        defaultAvailability[day.toLowerCase()] = {
          enabled: false,
          slots: [{ start: "09:00", end: "17:00" }],
        };
      });
      return defaultAvailability;
    }

    try {
      if (typeof initialData.availability === "string") {
        return JSON.parse(initialData.availability);
      }
      if (
        typeof initialData.availability === "object" &&
        initialData.availability !== null
      ) {
        return initialData.availability as AvailabilityData;
      }
    } catch (error) {
      console.warn("Failed to parse availability:", error);
    }

    // Fallback to default
    const defaultAvailability: AvailabilityData = {};
    weekDays.forEach((day) => {
      defaultAvailability[day.toLowerCase()] = {
        enabled: false,
        slots: [{ start: "09:00", end: "17:00" }],
      };
    });
    return defaultAvailability;
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

  const timeOptions = [
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
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
      availability: "",
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

  // Availability handlers
  const toggleDayAvailability = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }));
  };

  const updateTimeSlot = (
    day: string,
    slotIndex: number,
    field: "start" | "end",
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, index) =>
          index === slotIndex ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  };

  const addTimeSlot = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: "09:00", end: "17:00" }],
      },
    }));
  };

  const removeTimeSlot = (day: string, slotIndex: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, index) => index !== slotIndex),
      },
    }));
  };

  // Quick setup functions
  const setAllWeekdays = () => {
    const updated = { ...availability };
    weekDays.forEach((day) => {
      const dayKey = day.toLowerCase();
      if (
        ["monday", "tuesday", "wednesday", "thursday", "friday"].includes(
          dayKey
        )
      ) {
        updated[dayKey] = {
          enabled: true,
          slots: [{ start: "09:00", end: "17:00" }],
        };
      } else {
        updated[dayKey] = {
          enabled: false,
          slots: [{ start: "09:00", end: "17:00" }],
        };
      }
    });
    setAvailability(updated);
  };

  const setAllDays = () => {
    const updated = { ...availability };
    weekDays.forEach((day) => {
      const dayKey = day.toLowerCase();
      updated[dayKey] = {
        enabled: true,
        slots: [{ start: "09:00", end: "17:00" }],
      };
    });
    setAvailability(updated);
  };

  const clearAll = () => {
    const updated = { ...availability };
    weekDays.forEach((day) => {
      const dayKey = day.toLowerCase();
      updated[dayKey] = {
        enabled: false,
        slots: [{ start: "09:00", end: "17:00" }],
      };
    });
    setAvailability(updated);
  };

  async function onSubmit(values: ProfileFormValues) {
    setLoading(true);
    try {
      const payload = {
        ...values,
        specialties:
          specialtyTags.length > 0
            ? specialtyTags
            : values.specialties
            ? values.specialties.split(",").map((s) => s.trim())
            : [],
        languages:
          languageTags.length > 0
            ? languageTags
            : values.languages
            ? values.languages.split(",").map((l) => l.trim())
            : [],
        // Send availability as object
        availability: availability,
      };

      console.log("Submitting payload:", payload);

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

  // Format time for display
  const formatTimeForDisplay = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
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
              {/* ... (Previous sections remain same - Personal Info, Professional Info, Location, Languages) ... */}

              {/* Availability Section - UPDATED WITH SHADCN/UI */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="w-6 h-6 text-teal-500" />
                    Weekly Availability
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Set your working days and time slots for each day
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={setAllWeekdays}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Weekdays 9-5
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={setAllDays}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      All Days 9-5
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={clearAll}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  </div>

                  <Tabs defaultValue="detailed" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="detailed">Detailed View</TabsTrigger>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                    </TabsList>

                    <TabsContent value="detailed" className="space-y-4">
                      {weekDays.map((day) => {
                        const dayKey = day.toLowerCase();
                        const dayAvailability = availability[dayKey];

                        return (
                          <Card
                            key={day}
                            className={`border-l-4 ${
                              dayAvailability.enabled
                                ? "border-l-green-500"
                                : "border-l-gray-300"
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <Switch
                                    checked={dayAvailability.enabled}
                                    onCheckedChange={() =>
                                      toggleDayAvailability(dayKey)
                                    }
                                  />
                                  <FormLabel
                                    className={`text-base font-medium cursor-pointer ${
                                      dayAvailability.enabled
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {day}
                                  </FormLabel>
                                </div>
                                {dayAvailability.enabled && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Available
                                  </Badge>
                                )}
                              </div>

                              {dayAvailability.enabled && (
                                <div className="space-y-3 ml-8">
                                  {dayAvailability.slots.map(
                                    (slot, slotIndex) => (
                                      <div
                                        key={slotIndex}
                                        className="flex items-center gap-3 p-3 border rounded-lg"
                                      >
                                        <div className="grid grid-cols-2 gap-3 flex-1">
                                          <div className="space-y-2">
                                            <FormLabel className="text-sm">
                                              Start Time
                                            </FormLabel>
                                            <Select
                                              value={slot.start}
                                              onValueChange={(value) =>
                                                updateTimeSlot(
                                                  dayKey,
                                                  slotIndex,
                                                  "start",
                                                  value
                                                )
                                              }
                                            >
                                              <SelectTrigger>
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {timeOptions.map((time) => (
                                                  <SelectItem
                                                    key={time}
                                                    value={time}
                                                  >
                                                    {formatTimeForDisplay(time)}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                          </div>

                                          <div className="space-y-2">
                                            <FormLabel className="text-sm">
                                              End Time
                                            </FormLabel>
                                            <Select
                                              value={slot.end}
                                              onValueChange={(value) =>
                                                updateTimeSlot(
                                                  dayKey,
                                                  slotIndex,
                                                  "end",
                                                  value
                                                )
                                              }
                                            >
                                              <SelectTrigger>
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {timeOptions.map((time) => (
                                                  <SelectItem
                                                    key={time}
                                                    value={time}
                                                  >
                                                    {formatTimeForDisplay(time)}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>

                                        {dayAvailability.slots.length > 1 && (
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              removeTimeSlot(dayKey, slotIndex)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                          >
                                            <X className="w-4 h-4" />
                                          </Button>
                                        )}
                                      </div>
                                    )
                                  )}

                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addTimeSlot(dayKey)}
                                    className="w-full"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Time Slot
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </TabsContent>

                    <TabsContent value="summary">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-3">
                            Availability Summary
                          </h4>
                          <div className="space-y-2">
                            {weekDays.map((day) => {
                              const dayKey = day.toLowerCase();
                              const dayAvailability = availability[dayKey];

                              if (!dayAvailability.enabled) return null;

                              return (
                                <div
                                  key={day}
                                  className="flex justify-between items-center py-2 border-b"
                                >
                                  <span className="font-medium capitalize">
                                    {day}
                                  </span>
                                  <div className="text-sm text-muted-foreground">
                                    {dayAvailability.slots.map(
                                      (slot, index) => (
                                        <span key={index}>
                                          {formatTimeForDisplay(slot.start)} -{" "}
                                          {formatTimeForDisplay(slot.end)}
                                          {index <
                                            dayAvailability.slots.length - 1 &&
                                            ", "}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                            {!weekDays.some(
                              (day) => availability[day.toLowerCase()].enabled
                            ) && (
                              <p className="text-muted-foreground text-center py-4">
                                No availability set. Use the detailed view to
                                set your schedule.
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
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
