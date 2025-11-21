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
  Search,
  Bell,
  User,
  MessageCircle,
  ClipboardCheck,
  Settings,
} from "lucide-react";
import { DoctorProfile } from "../types/doctorProfile";
import Link from "next/link";

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
    APPROVED: {
      label: "Approved",
      color: "bg-green-100 text-green-700 border-green-200",
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F4FAFA] dark:bg-[#0A1414]">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#00C6D2]/20 dark:bg-[#00C6D2]/30 rounded-full blur-[150px] -translate-y-1/4 translate-x-1/4 opacity-50 dark:opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00C6D2]/20 dark:bg-[#00C6D2]/30 rounded-full blur-[150px] translate-y-1/4 -translate-x-1/4 opacity-50 dark:opacity-40"></div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white/50 dark:bg-black/20 p-4 border-r border-white/80 dark:border-black/30">
          <div className="flex items-center gap-2 px-4 py-4 mb-8">
            <Heart className="text-[#00C6D2] text-3xl" />
            <h1 className="text-xl font-bold text-[#001B36] dark:text-white">
              HealthSys
            </h1>
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/doctor"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                <p className="text-base font-bold">Dashboard</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/profile"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 bg-[#00C6D2]/20 text-[#00C6D2]"
              >
                <User className="w-6 h-6" />
                <p className="text-base font-bold">Profile</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/consultations"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <MessageCircle className="w-6 h-6" />
                <p className="text-base font-bold">Consultations</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/patients"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Users className="w-6 h-6" />
                <p className="text-base font-bold">Patients</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/approvals"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <ClipboardCheck className="w-6 h-6" />
                <p className="text-base font-bold">Approvals</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/settings"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Settings className="w-6 h-6" />
                <p className="text-base font-bold">Settings</p>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto">
          {/* Header */}
          <header className="flex items-center p-6 pb-4 flex-shrink-0 z-10">
            <div className="flex-1 max-w-xl">
              <div className="flex w-full items-stretch rounded-2xl h-12">
                <div className="text-[#6C7A89] dark:text-gray-400 flex border-r-0 border-none bg-white/60 dark:bg-[#102224]/60 items-center justify-center pl-4 rounded-l-2xl backdrop-blur-md border border-white/80 dark:border-[#193436]/80">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-2xl text-[#001B36] dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-[#00C6D2]/50 border-none bg-white/60 dark:bg-[#102224]/60 h-full placeholder:text-[#6C7A89] dark:placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal backdrop-blur-md border border-white/80 dark:border-[#193436]/80 border-l-0"
                  placeholder="Search..."
                />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-4">
              <Button className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <Bell className="text-2xl text-[#6C7A89] dark:text-gray-400" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#F4FAFA] dark:border-[#0A1414]"></div>
              </Button>

              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-white/80">
                  <AvatarImage
                    src={profile.profilePic || undefined}
                    alt={profile.name}
                  />
                  <AvatarFallback className="bg-[#00C6D2] text-white font-bold">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-[#001B36] dark:text-white">
                    Dr. {profile.name}
                  </p>
                  <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                    {profile.specialization}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Profile Content */}
          <div className="px-6 py-4 flex-1">
            <div className="grid grid-cols-12 gap-6">
              {/* Main Profile Section */}
              <div className="col-span-12 lg:col-span-8">
                {/* Profile Header Card */}
                <Card className="p-8 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 mb-6">
                  <div className="flex flex-col sm:flex-row items-start gap-8">
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-40 h-40 border-4 border-white dark:border-gray-800 shadow-lg">
                        <AvatarImage
                          src={profile.profilePic || undefined}
                          alt={profile.name}
                        />
                        <AvatarFallback className="text-2xl bg-[#00C6D2] text-white font-bold">
                          {profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div>
                          <h2 className="text-3xl font-bold text-[#001B36] dark:text-white">
                            Dr. {profile.name}
                          </h2>
                          <p className="text-lg text-[#00C6D2] font-semibold mt-1 flex items-center gap-2">
                            <Stethoscope className="w-5 h-5" />
                            {profile.specialization}
                          </p>
                        </div>
                        <DoctorStatusBadge status={profile.status} />
                      </div>

                      <div className="flex flex-wrap gap-6 text-[#6C7A89] dark:text-gray-300 mb-6">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-[#001B36] dark:text-white text-lg">
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
                        <Button className="bg-[#00C6D2] hover:bg-[#00B4C0] text-white font-bold px-6 py-3">
                          <Calendar className="w-5 h-5 mr-2" />
                          Book Appointment
                        </Button>
                        <Button className="bg-white text-[#00C6D2] border border-[#00C6D2] hover:bg-[#00C6D2]/10 font-bold px-6 py-3">
                          <Video className="w-5 h-5 mr-2" />
                          Video Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                    <CardContent className="flex items-start justify-between p-0">
                      <div>
                        <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Consultation Fee
                        </p>
                        <p className="text-3xl font-bold text-[#001B36] dark:text-white mt-2">
                          ₹{profile.fees}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                        <DollarSign className="text-[#00C6D2] text-2xl" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                    <CardContent className="flex items-start justify-between p-0">
                      <div>
                        <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Total Patients
                        </p>
                        <p className="text-3xl font-bold text-[#001B36] dark:text-white mt-2">
                          {profile.totalReviews}+
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                        <Users className="text-[#00C6D2] text-2xl" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                    <CardContent className="flex items-start justify-between p-0">
                      <div>
                        <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Success Rate
                        </p>
                        <p className="text-3xl font-bold text-[#001B36] dark:text-white mt-2">
                          {profile.rating > 4.5 ? "96" : "92"}%
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                        <Activity className="text-[#00C6D2] text-2xl" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Specialties & Expertise */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 mb-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-[#001B36] dark:text-white flex items-center gap-2">
                      <Award className="text-[#00C6D2] w-5 h-5" />
                      Specialties & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          className="bg-[#00C6D2]/10 text-[#00C6D2] dark:bg-[#00C6D2]/20 px-3 py-1 text-sm font-semibold border-0"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Details */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-[#001B36] dark:text-white flex items-center gap-2">
                      <GraduationCap className="text-[#00C6D2] w-5 h-5" />
                      Professional Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {profile.experience && (
                        <div className="p-4 rounded-xl bg-[#00C6D2]/5 border border-[#00C6D2]/20">
                          <label className="text-sm font-semibold text-[#6C7A89] dark:text-gray-400 mb-2 block">
                            Experience
                          </label>
                          <p className="text-2xl font-bold text-[#00C6D2]">
                            {profile.experience} Years
                          </p>
                        </div>
                      )}

                      {profile.gender && (
                        <div className="p-4 rounded-xl bg-[#00C6D2]/5 border border-[#00C6D2]/20">
                          <label className="text-sm font-semibold text-[#6C7A89] dark:text-gray-400 mb-2 block">
                            Gender
                          </label>
                          <p className="text-2xl font-bold text-[#00C6D2]">
                            {profile.gender}
                          </p>
                        </div>
                      )}
                    </div>

                    {profile.languages && profile.languages.length > 0 && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#00C6D2]/10 to-teal-500/10 border border-[#00C6D2]/20">
                        <label className="text-sm font-semibold text-[#001B36] dark:text-white mb-3 flex items-center gap-2">
                          <Languages className="w-5 h-5 text-[#00C6D2]" />
                          Languages Spoken
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {profile.languages.map((lang, index) => (
                            <Badge
                              key={index}
                              className="bg-white text-[#00C6D2] border border-[#00C6D2] font-semibold"
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
                  <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 mt-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl font-bold text-[#001B36] dark:text-white flex items-center gap-2">
                        <Award className="text-[#00C6D2] w-5 h-5" />
                        Achievements & Recognition
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-4">
                        {profile.badges.map((badge, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-[#00C6D2]/10 to-blue-500/10 border border-[#00C6D2]/20"
                          >
                            <div className="w-10 h-10 bg-[#00C6D2] rounded-full flex items-center justify-center flex-shrink-0">
                              <Award className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-[#001B36] dark:text-white">
                              {badge}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Availability & Contact */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                {/* Availability */}
                {profile.availability &&
                  Object.keys(profile.availability).length > 0 && (
                    <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-xl font-bold text-[#001B36] dark:text-white flex items-center gap-2">
                          <Calendar className="text-[#00C6D2] w-5 h-5" />
                          Weekly Availability
                        </CardTitle>
                        <p className="text-xs text-[#6C7A89] dark:text-gray-400 mt-1">
                          Working hours for consultation
                        </p>
                      </CardHeader>
                      <CardContent className="p-0 space-y-3">
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
                              className={`border-2 rounded-xl p-3 transition-all ${
                                isAvailable
                                  ? "border-[#00C6D2]/30 bg-gradient-to-r from-[#00C6D2]/10 to-teal-500/10"
                                  : "border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/20"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      isAvailable
                                        ? "bg-[#00C6D2]"
                                        : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                                  />
                                  <span
                                    className={`font-bold capitalize ${
                                      isAvailable
                                        ? "text-[#001B36] dark:text-white"
                                        : "text-gray-400 dark:text-gray-500"
                                    }`}
                                  >
                                    {day}
                                  </span>
                                </div>
                                {isAvailable ? (
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#00C6D2]" />
                                    <span className="text-sm font-semibold text-[#00C6D2]">
                                      {time}
                                    </span>
                                  </div>
                                ) : (
                                  <Badge className="bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200">
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
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-gradient-to-br from-[#00C6D2] to-teal-500 text-white">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    <Button className="w-full bg-white text-[#00C6D2] hover:bg-gray-100 font-bold py-3">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-[#001B36] dark:text-white flex items-center gap-2">
                      <Activity className="text-[#00C6D2] w-5 h-5" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6C7A89] dark:text-gray-400 font-medium">
                        Rating
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-[#001B36] dark:text-white">
                          {profile.rating}/5
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6C7A89] dark:text-gray-400 font-medium">
                        Reviews
                      </span>
                      <span className="font-bold text-[#001B36] dark:text-white">
                        {profile.totalReviews}
                      </span>
                    </div>
                    {profile.city && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#6C7A89] dark:text-gray-400 font-medium">
                          Location
                        </span>
                        <span className="font-bold text-[#001B36] dark:text-white">
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
              <Card className="mt-6 border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 shadow-lg">
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
        </main>
      </div>
    </div>
  );
}
