// app/user/doctor/[id]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import BookConsultationForm from "@/features/user-doctors/components/BookConsultationForm";
import {
  MapPin,
  Clock,
  IndianRupee,
  Languages,
  Star,
  Stethoscope,
  Award,
  Calendar,
  Shield,
  BookOpen,
  Users,
  MessageSquare,
  CheckCircle,
  Verified,
  Heart,
  TrendingUp,
  Building2,
  GraduationCap,
  Phone,
  Video,
  Sparkles,
} from "lucide-react";

interface DoctorPageProps {
  params: { id: string };
}

export default async function UserDoctorPage({ params }: DoctorPageProps) {
  const doctor = await prisma.independentDoctor.findUnique({
    where: { id: params.id, status: "APPROVED" }, // ✅ only approved doctors
  });

  if (!doctor) return notFound();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-4 w-4">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>

        {/* Floating shapes for visual appeal */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Doctor Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="relative">
                  <Avatar className="h-32 w-32 ring-4 ring-white/30 shadow-2xl">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/medical/svg?seed=${doctor.id}&backgroundColor=3b82f6`}
                    />
                    <AvatarFallback className="bg-white/20 text-white text-3xl font-bold">
                      {getInitials(doctor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full shadow-lg">
                    <Verified className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h1 className="text-4xl font-bold text-white">
                        Dr. {doctor.name}
                      </h1>
                      <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-300/30 backdrop-blur-sm">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-6 w-6 text-blue-200" />
                      <span className="text-2xl font-semibold text-blue-100">
                        {doctor.specialization}
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      {renderRatingStars(doctor.rating || 0)}
                      <span className="text-white font-semibold ml-2">
                        {doctor.rating || 0}
                      </span>
                    </div>
                    <span className="text-blue-200">
                      {doctor.totalReviews || 0} patient reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <Clock className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">
                  {doctor.experience ?? 0}+
                </div>
                <div className="text-blue-200 font-medium">
                  Years Experience
                </div>
              </div>

              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <Heart className="h-8 w-8 text-red-300 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">
                  {doctor.totalReviews || 0}
                </div>
                <div className="text-blue-200 font-medium">Happy Patients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Doctor */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  About Dr. {doctor.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Dr. {doctor.name} is a highly qualified{" "}
                  {doctor.specialization} with {doctor.experience ?? 0} years of
                  experience in providing exceptional medical care. Known for
                  their expertise and compassionate approach to patient care.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-blue-900">Qualified</div>
                    <div className="text-sm text-blue-600">
                      Medical Professional
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold text-green-900">
                      Experienced
                    </div>
                    <div className="text-sm text-green-600">
                      {doctor.experience ?? 0}+ Years Practice
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold text-purple-900">
                      Top Rated
                    </div>
                    <div className="text-sm text-purple-600">
                      {doctor.rating || 0}/5 Rating
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            {doctor.specialties && doctor.specialties.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    Medical Specialties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {doctor.specialties.map((specialty, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:border-purple-200 transition-colors"
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-purple-900">
                          {specialty}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Professional Details */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-indigo-600" />
                  </div>
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Experience */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Experience
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          {doctor.experience ?? 0} Years
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  {doctor.city && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                          <MapPin className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Location
                          </p>
                          <p className="text-2xl font-bold text-orange-600">
                            {doctor.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Languages */}
                {doctor.languages && doctor.languages.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                        <Languages className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Languages Spoken
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((language, index) => (
                        <Badge
                          key={index}
                          className="px-4 py-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 text-sm"
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-amber-600" />
                  </div>
                  Patient Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {doctor.totalReviews || 0} Patient Reviews
                  </h3>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="flex items-center gap-1">
                      {renderRatingStars(doctor.rating || 0)}
                    </div>
                    <span className="text-2xl font-bold text-amber-600">
                      {doctor.rating || 0}
                    </span>
                    <span className="text-muted-foreground">out of 5</span>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    See what patients are saying about Dr. {doctor.name}'s
                    exceptional care
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Consultation Fee */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
                    Consultation Fee
                  </p>
                  <div className="text-4xl font-bold text-green-600">
                    ₹{doctor.fees ?? "N/A"}
                  </div>
                  <p className="text-green-600/70">per session</p>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  Book Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BookConsultationForm
                  doctorId={doctor.id}
                  fee={doctor.fees ?? 0}
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                    <Video className="h-6 w-6 text-blue-600" />
                    <span className="text-xs font-medium text-blue-900">
                      Video Call
                    </span>
                  </button>

                  <button className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                    <Phone className="h-6 w-6 text-green-600" />
                    <span className="text-xs font-medium text-green-900">
                      Voice Call
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badge */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-emerald-800 text-lg mb-2">
                  Verified Professional
                </h3>
                <p className="text-sm text-emerald-600 leading-relaxed">
                  This doctor has been thoroughly verified and approved by our
                  medical board for your safety and trust
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
