"use client";
import DoctorStatusBadge from "./DoctorStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Star,
  Clock,
  Languages,
  DollarSign,
  User,
  Award,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { DoctorProfile, DoctorStatus } from "../types/doctorProfile";

export default function DoctorProfileView({
  profile,
  isAdmin = false,
}: {
  profile: DoctorProfile;
  isAdmin?: boolean;
}) {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.profilePic} alt={profile.name} />
              <AvatarFallback className="text-2xl">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {profile.name}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground">
                    {profile.specialization}
                  </p>
                </div>
                <DoctorStatusBadge status={profile.status} />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{profile.rating}</span>
                  <span className="text-muted-foreground">
                    ({profile.totalReviews} reviews)
                  </span>
                </div>
                {profile.city && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.city}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Professional Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Professional Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Specialties
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {profile.experience && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Experience
                  </label>
                  <p className="text-sm">{profile.experience} years</p>
                </div>
              )}

              {profile.gender && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Gender
                  </label>
                  <p className="text-sm">{profile.gender}</p>
                </div>
              )}

              {profile.languages.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Languages
                  </label>
                  <div className="flex items-center gap-1 mt-1">
                    <Languages className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {profile.languages.join(", ")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Consultation Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Consultation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.fees && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Consultation Fees
                </label>
                <p className="text-lg font-semibold text-green-600">
                  ₹{profile.fees}
                </p>
              </div>
            )}

            {profile.badges && profile.badges.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Badges
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-blue-600 border-blue-200"
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Calendar-style Availability Card */}
      {profile.availability && Object.keys(profile.availability).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Availability
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Available consultation hours throughout the week
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Calendar Grid */}
            <div className="grid gap-3">
              {weekDays.map((day) => {
                const dayKey = day.toLowerCase();
                const timeSlot = profile.availability[dayKey];
                const isAvailable = !!timeSlot;

                return (
                  <div
                    key={day}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      isAvailable
                        ? "bg-green-50 border-green-200 hover:bg-green-100"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isAvailable ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <div>
                        <span
                          className={`font-medium ${
                            isAvailable ? "text-green-900" : "text-gray-500"
                          }`}
                        >
                          {day}
                        </span>
                        {isAvailable && (
                          <div className="text-xs text-green-700 mt-0.5">
                            Available
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      {isAvailable ? (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">
                            {timeSlot}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Not Available
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Quick Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-muted-foreground">
                    {Object.keys(profile.availability).length} days available
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-muted-foreground">
                    {7 - Object.keys(profile.availability).length} days off
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-muted-foreground text-xs">
                  Times shown in local timezone
                </span>
              </div>
            </div>

            {/* Available Days Summary */}
            {Object.keys(profile.availability).length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Available Days This Week
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(profile.availability).map((day) => (
                    <Badge
                      key={day}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Admin Section */}
      {isAdmin && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-amber-800">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                Admin View - Profile pending approval
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
