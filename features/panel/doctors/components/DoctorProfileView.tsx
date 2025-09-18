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
} from "lucide-react";
import { DoctorProfile, DoctorStatus } from "../types/doctorProfile";

export default function DoctorProfileView({
  profile,
  isAdmin = false,
}: {
  profile: DoctorProfile;
  isAdmin?: boolean;
}) {
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

      {/* Availability Card */}
      {profile.availability && Object.keys(profile.availability).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(profile.availability).map(([day, time]) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <span className="font-medium capitalize">{day}</span>
                  <span className="text-sm text-muted-foreground">{time}</span>
                </div>
              ))}
            </div>
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
