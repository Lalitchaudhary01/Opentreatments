"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Clock,
  Languages,
  DollarSign,
  Award,
  Calendar,
  Stethoscope,
  Users,
  TrendingUp,
  CheckCircle,
  Video,
  MessageSquare,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Heart,
  Activity,
} from "lucide-react";
import { DoctorProfile } from "../types/doctorProfile";

interface DoctorStatusBadgeProps {
  status: string;
}

const DoctorStatusBadge = ({ status }: DoctorStatusBadgeProps) => {
  const statusConfig: Record<string, { label: string; color: string }> = {
    ACTIVE: {
      label: "Active",
      color: "bg-teal-100 text-teal-700 border-teal-200",
    },
    PENDING: {
      label: "Pending",
      color: "bg-orange-100 text-orange-700 border-orange-200",
    },
    INACTIVE: {
      label: "Inactive",
      color: "bg-slate-100 text-slate-700 border-slate-200",
    },
  };

  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <Badge className={`${config.color} border font-semibold px-3 py-1`}>
      {config.label}
    </Badge>
  );
};

interface DoctorProfileViewProps {
  profile: DoctorProfile;
  isAdmin?: boolean;
}

export default function DoctorProfileView({
  profile,
  isAdmin = false,
}: DoctorProfileViewProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Avatar Section */}
            <div className="relative flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                <AvatarImage
                  src={profile.profilePic || undefined}
                  alt={profile.name}
                />
                <AvatarFallback className="text-4xl bg-white text-cyan-600 font-bold">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-teal-400 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                    Dr. {profile.name}
                  </h1>
                  <p className="text-xl text-cyan-50 mb-3 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    {profile.specialization}
                  </p>
                </div>
                <DoctorStatusBadge status={profile.status} />
              </div>

              <div className="flex flex-wrap gap-6 text-cyan-50 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <span className="font-bold text-white text-lg">
                    {profile.rating}
                  </span>
                  <span className="text-sm">
                    ({profile.totalReviews} reviews)
                  </span>
                </div>
                {profile.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{profile.city}</span>
                  </div>
                )}
                {profile.experience && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    <span>{profile.experience} years experience</span>
                  </div>
                )}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button className="bg-white text-cyan-700 hover:bg-cyan-50 font-bold px-6 py-6 shadow-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-6 shadow-lg">
                  <Video className="w-5 h-5 mr-2" />
                  Video Consultation
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-6 py-6"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16">
          <Card className="bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold mb-1">
                    Consultation Fee
                  </p>
                  <h3 className="text-4xl font-bold text-teal-600 mb-2">
                    ₹{profile.fees}
                  </h3>
                  <p className="text-xs text-slate-500">Per consultation</p>
                </div>
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold mb-1">
                    Total Patients
                  </p>
                  <h3 className="text-4xl font-bold text-cyan-600 mb-2">
                    {profile.totalReviews}+
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Growing daily
                  </p>
                </div>
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold mb-1">
                    Success Rate
                  </p>
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">
                    {profile.rating > 4.5 ? "96" : "92"}%
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    Patient satisfaction
                  </p>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-7 h-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Specialties & Expertise */}
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-6 h-6 text-cyan-600" />
                  Specialties & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  {profile.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 px-4 py-2 text-sm font-semibold border-0"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-cyan-600" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {profile.experience && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <label className="text-sm font-semibold text-slate-600 mb-2 block">
                        Experience
                      </label>
                      <p className="text-2xl font-bold text-cyan-600">
                        {profile.experience} Years
                      </p>
                    </div>
                  )}

                  {profile.gender && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <label className="text-sm font-semibold text-slate-600 mb-2 block">
                        Gender
                      </label>
                      <p className="text-2xl font-bold text-cyan-600">
                        {profile.gender}
                      </p>
                    </div>
                  )}
                </div>

                {profile.languages && profile.languages.length > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200">
                    <label className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <Languages className="w-5 h-5 text-cyan-600" />
                      Languages Spoken
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((lang, index) => (
                        <Badge
                          key={index}
                          className="bg-white text-cyan-700 border border-cyan-300 font-semibold"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements & Badges */}
            {profile.badges && profile.badges.length > 0 && (
              <Card className="bg-white border-slate-200 shadow-lg">
                <CardHeader className="border-b border-slate-200 pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-6 h-6 text-cyan-600" />
                    Achievements & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200"
                      >
                        <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-cyan-900">{badge}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Availability & Contact */}
          <div className="space-y-6">
            {/* Availability */}
            {/* Availability */}
            {profile.availability &&
              Object.keys(profile.availability).length > 0 && (
                <Card className="bg-white border-slate-200 shadow-lg">
                  <CardHeader className="border-b border-slate-200 pb-4">
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-cyan-600" />
                      Weekly Availability
                    </CardTitle>
                    <p className="text-xs text-slate-600 mt-1">
                      Working hours for consultation
                    </p>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    {[
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                      "sunday",
                    ].map((day) => {
                      const availability = profile.availability as
                        | Record<string, any>
                        | null
                        | undefined;
                      const time = availability?.[day];
                      const isAvailable = !!time;

                      return (
                        <div
                          key={day}
                          className={`border-2 rounded-xl p-4 transition-all ${
                            isAvailable
                              ? "border-cyan-200 bg-gradient-to-r from-cyan-50 to-teal-50"
                              : "border-slate-200 bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  isAvailable ? "bg-teal-500" : "bg-slate-300"
                                }`}
                              />
                              <span
                                className={`font-bold capitalize ${
                                  isAvailable
                                    ? "text-slate-900"
                                    : "text-slate-400"
                                }`}
                              >
                                {day}
                              </span>
                            </div>
                            {isAvailable ? (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-cyan-600" />
                                <span className="text-sm font-semibold text-cyan-700">
                                  {time}
                                </span>
                              </div>
                            ) : (
                              <Badge className="bg-slate-200 text-slate-600 hover:bg-slate-200">
                                Unavailable
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}

            {/* Contact Information */}
            <Card className="bg-gradient-to-br from-cyan-600 to-teal-600 text-white shadow-lg">
              <CardHeader className="border-b border-cyan-500 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Phone className="w-6 h-6" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Button className="w-full bg-white text-cyan-700 hover:bg-cyan-50 font-bold py-6 mt-2">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-cyan-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-slate-900">
                      {profile.rating}/5
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Reviews</span>
                  <span className="font-bold text-slate-900">
                    {profile.totalReviews}
                  </span>
                </div>
                {profile.city && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Location</span>
                    <span className="font-bold text-slate-900">
                      {profile.city}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Admin Section */}
        {isAdmin && (
          <Card className="border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-orange-800">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">Admin View</p>
                  <p className="text-sm">
                    Profile pending approval - Review and take action
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
