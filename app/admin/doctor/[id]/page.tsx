import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminDoctorActions from "@/features/admin/doctors/components/AdminDoctorActions";
import {
  User,
  Mail,
  Phone,
  Stethoscope,
  Award,
  Calendar,
  DollarSign,
  Languages,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
} from "lucide-react";

export default async function AdminDoctorPage(props: any) {
  const params = await props.params;

  const doctor = await prisma.independentDoctor.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          email: true,
          phone: true,
        },
      },
    },
  });

  if (!doctor) return notFound();

  // Status styling
  const statusConfig = {
    PENDING: {
      color: "from-amber-500 to-orange-500",
      bg: "from-amber-50 to-orange-50",
      border: "border-amber-300",
      icon: AlertCircle,
      text: "text-amber-700",
    },
    APPROVED: {
      color: "from-green-500 to-emerald-500",
      bg: "from-green-50 to-emerald-50",
      border: "border-green-300",
      icon: CheckCircle,
      text: "text-green-700",
    },
    REJECTED: {
      color: "from-red-500 to-rose-500",
      bg: "from-red-50 to-rose-50",
      border: "border-red-300",
      icon: XCircle,
      text: "text-red-700",
    },
  };

  const status = doctor.status as keyof typeof statusConfig;
  const StatusIcon = statusConfig[status].icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 via-teal-400/10 to-sky-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/10 via-sky-400/10 to-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="p-6 space-y-6 relative z-10 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between border-b-2 border-cyan-200 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-50 to-teal-50 border-2 border-cyan-300 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
                <span className="bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent font-bold text-sm">
                  Doctor Profile Review
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
              Doctor Details
            </h1>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="border-2 border-cyan-200 shadow-2xl bg-white/90 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl" />
          <CardHeader
            className={`bg-gradient-to-br ${statusConfig[status].bg} border-b-2 ${statusConfig[status].border} relative z-10`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
                <AvatarImage
                  src={doctor.profilePic || undefined}
                  alt={doctor.name}
                />
                <AvatarFallback className="text-3xl font-black bg-gradient-to-br from-cyan-500 to-teal-500 text-white">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent mb-2">
                      {doctor.name}
                    </CardTitle>
                    <p className="text-lg font-bold text-slate-600 mb-3">
                      {doctor.specialization}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-cyan-300">
                        <Mail className="h-3.5 w-3.5 text-cyan-600" />
                        <span className="text-slate-700 font-semibold">
                          {doctor.user.email}
                        </span>
                      </Badge>
                      <Badge className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-teal-300">
                        <Phone className="h-3.5 w-3.5 text-teal-600" />
                        <span className="text-slate-700 font-semibold">
                          {doctor.user.phone}
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${statusConfig[status].color} rounded-xl shadow-lg`}
                  >
                    <StatusIcon className="h-5 w-5 text-white" />
                    <span className="text-white font-black text-lg">
                      {doctor.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Experience */}
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-xl border-2 border-cyan-200 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                    Experience
                  </span>
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  {doctor.experience} years
                </p>
              </div>

              {/* Gender */}
              <div className="bg-gradient-to-br from-teal-50 to-sky-50 p-5 rounded-xl border-2 border-teal-200 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-lg flex items-center justify-center shadow-md">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                    Gender
                  </span>
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent capitalize">
                  {doctor.gender}
                </p>
              </div>

              {/* Consultation Fees */}
              <div className="bg-gradient-to-br from-sky-50 to-cyan-50 p-5 rounded-xl border-2 border-sky-200 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                    Consultation Fees
                  </span>
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  ₹{doctor.fees}
                </p>
              </div>

              {/* City */}
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-xl border-2 border-cyan-200 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                    City
                  </span>
                </div>
                <p className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  {doctor.city}
                </p>
              </div>

              {/* Availability */}
              <div className="bg-gradient-to-br from-teal-50 to-sky-50 p-5 rounded-xl border-2 border-teal-200 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-lg flex items-center justify-center shadow-md">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                    Availability
                  </span>
                </div>
                <p className="text-lg font-bold text-slate-700">
                  {typeof doctor.availability === "string"
                    ? doctor.availability
                    : Array.isArray(doctor.availability)
                    ? (doctor.availability as unknown[]).join(", ")
                    : JSON.stringify(doctor.availability)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Specialties */}
          <Card className="border-2 border-cyan-200 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-br from-cyan-50 to-teal-50 border-b-2 border-cyan-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                  Specialties
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {doctor.specialties && doctor.specialties.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {(doctor.specialties as string[]).map((specialty, index) => (
                    <Badge
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No specialties listed</p>
              )}
            </CardContent>
          </Card>

          {/* Languages */}
          <Card className="border-2 border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-br from-teal-50 to-sky-50 border-b-2 border-teal-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-lg flex items-center justify-center shadow-md">
                  <Languages className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                  Languages Spoken
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {doctor.languages && doctor.languages.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {(doctor.languages as string[]).map((language, index) => (
                    <Badge
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-teal-500 to-sky-500 text-white font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No languages listed</p>
              )}
            </CardContent>
          </Card>

          {/* Badges/Certifications */}
          <Card className="border-2 border-sky-200 shadow-xl bg-white/90 backdrop-blur-sm lg:col-span-2">
            <CardHeader className="bg-gradient-to-br from-sky-50 to-cyan-50 border-b-2 border-sky-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                  Badges & Certifications
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {doctor.badges && doctor.badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {(doctor.badges as string[]).map((badge, index) => (
                    <Badge
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      <Star className="h-3.5 w-3.5 mr-1.5" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">
                  No badges or certifications listed
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions Card */}
        <Card
          className={`border-2 ${statusConfig[status].border} shadow-2xl bg-white/90 backdrop-blur-sm`}
        >
          <CardHeader
            className={`bg-gradient-to-br ${statusConfig[status].bg} border-b-2 ${statusConfig[status].border}`}
          >
            <CardTitle className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
              Review Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <AdminDoctorActions
              doctorId={doctor.id}
              currentStatus={
                doctor.status as "PENDING" | "APPROVED" | "REJECTED"
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
