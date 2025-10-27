// app/user/doctor/[id]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import BookConsultationForm from "@/features/user-doctors/components/BookConsultationForm";
import {
  MapPin,
  Clock,
  IndianRupee,
  Languages,
  Star,
  Stethoscope,
  Award,
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
import Header from "@/components/layout/Header";

interface DoctorPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDoctorPage({ params }: DoctorPageProps) {
  const { id } = await params
  const doctor = await prisma.independentDoctor.findUnique({
    where: { id: id, status: "APPROVED" },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/50 dark:from-slate-950 dark:via-cyan-950/20 dark:to-teal-950/20">
      <Header/>
      {/* Hero Section - Cyan/Teal Theme */}
      <div className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 dark:from-cyan-900 dark:via-teal-900 dark:to-cyan-950"></div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.3),rgba(255,255,255,0))]"></div>
        </div>

        {/* Animated floating elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Doctor Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {/* Avatar with glow effect */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <Avatar className="relative h-32 w-32 ring-4 ring-white/40 shadow-2xl">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/medical/svg?seed=${doctor.id}&backgroundColor=0891b2`}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-teal-400 text-white text-3xl font-bold">
                      {getInitials(doctor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-500 to-teal-500 p-2.5 rounded-full shadow-lg ring-4 ring-white/30">
                    <Verified className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                        Dr. {doctor.name}
                      </h1>
                      <Badge className="bg-gradient-to-r from-cyan-400/30 to-teal-400/30 text-cyan-100 border-cyan-300/40 backdrop-blur-xl shadow-lg px-3 py-1">
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        <span className="font-semibold">Verified</span>
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 w-fit border border-white/20">
                      <Stethoscope className="h-6 w-6 text-cyan-200" />
                      <span className="text-2xl font-bold text-white">
                        {doctor.specialization}
                      </span>
                    </div>
                  </div>

                  {/* Rating with glassmorphism */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xl rounded-full px-5 py-3 border border-white/20 shadow-xl">
                      <div className="flex items-center gap-1">
                        {renderRatingStars(doctor.rating || 0)}
                      </div>
                      <Separator orientation="vertical" className="h-5 bg-white/30" />
                      <span className="text-white font-bold text-lg">
                        {doctor.rating || 0}
                      </span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl rounded-full px-5 py-3 border border-white/20">
                      <span className="text-cyan-100 font-medium">
                        {doctor.totalReviews || 0} patient reviews
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative overflow-hidden text-center p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Clock className="h-8 w-8 text-cyan-200 mx-auto mb-3" />
                <div className="text-4xl font-black text-white mb-1">
                  {doctor.experience ?? 0}+
                </div>
                <div className="text-cyan-100 font-semibold text-sm">
                  Years Experience
                </div>
              </div>

              <div className="group relative overflow-hidden text-center p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Heart className="h-8 w-8 text-teal-300 mx-auto mb-3" />
                <div className="text-4xl font-black text-white mb-1">
                  {doctor.totalReviews || 0}
                </div>
                <div className="text-teal-100 font-semibold text-sm">Happy Patients</div>
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
            <div className="group relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl relative">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-4 text-2xl">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent font-black">
                      About Dr. {doctor.name}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Dr. {doctor.name} is a highly qualified{" "}
                    {doctor.specialization} with {doctor.experience ?? 0} years of
                    experience in providing exceptional medical care. Known for
                    their expertise and compassionate approach to patient care.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="group/card relative overflow-hidden text-center p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 rounded-2xl border-2 border-cyan-200/50 dark:border-cyan-800/50 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all hover:scale-105 hover:shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      <GraduationCap className="h-10 w-10 text-cyan-600 dark:text-cyan-400 mx-auto mb-3 relative z-10" />
                      <div className="font-bold text-cyan-900 dark:text-cyan-100 mb-1 relative z-10">Qualified</div>
                      <div className="text-sm text-cyan-700 dark:text-cyan-300 relative z-10">
                        Medical Professional
                      </div>
                    </div>

                    <div className="group/card relative overflow-hidden text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/50 dark:to-cyan-950/50 rounded-2xl border-2 border-teal-200/50 dark:border-teal-800/50 hover:border-teal-400 dark:hover:border-teal-600 transition-all hover:scale-105 hover:shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      <TrendingUp className="h-10 w-10 text-teal-600 dark:text-teal-400 mx-auto mb-3 relative z-10" />
                      <div className="font-bold text-teal-900 dark:text-teal-100 mb-1 relative z-10">
                        Experienced
                      </div>
                      <div className="text-sm text-teal-700 dark:text-teal-300 relative z-10">
                        {doctor.experience ?? 0}+ Years Practice
                      </div>
                    </div>

                    <div className="group/card relative overflow-hidden text-center p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 rounded-2xl border-2 border-cyan-200/50 dark:border-cyan-800/50 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all hover:scale-105 hover:shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      <Sparkles className="h-10 w-10 text-cyan-600 dark:text-cyan-400 mx-auto mb-3 relative z-10" />
                      <div className="font-bold text-cyan-900 dark:text-cyan-100 mb-1 relative z-10">
                        Top Rated
                      </div>
                      <div className="text-sm text-cyan-700 dark:text-cyan-300 relative z-10">
                        {doctor.rating || 0}/5 Rating
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Specialties */}
            {doctor.specialties && doctor.specialties.length > 0 && (
              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-4 text-2xl">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent font-black">
                      Medical Specialties
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {doctor.specialties.map((specialty, index) => (
                      <div
                        key={index}
                        className="group flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50/80 to-teal-50/80 dark:from-cyan-950/50 dark:to-teal-950/50 rounded-xl border-2 border-cyan-200/50 dark:border-cyan-800/50 hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-lg transition-all hover:scale-105"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full group-hover:scale-150 transition-transform"></div>
                        <span className="font-semibold text-cyan-900 dark:text-cyan-100">
                          {specialty}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Professional Details */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-4 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent font-black">
                    Professional Information
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Experience */}
                  <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 rounded-2xl border-2 border-cyan-200/50 dark:border-cyan-800/50 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="p-4 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
                          Experience
                        </p>
                        <p className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                          {doctor.experience ?? 0} Years
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  {doctor.city && (
                    <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/50 dark:to-cyan-950/50 rounded-2xl border-2 border-teal-200/50 dark:border-teal-800/50 hover:border-teal-400 dark:hover:border-teal-600 transition-all hover:shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
                          <MapPin className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                            Location
                          </p>
                          <p className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            {doctor.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Languages */}
                {doctor.languages && doctor.languages.length > 0 && (
                  <div className="space-y-4 p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30 rounded-2xl border-2 border-cyan-200/50 dark:border-cyan-800/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg">
                        <Languages className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                          Languages Spoken
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((language, index) => (
                        <Badge
                          key={index}
                          className="px-5 py-2 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/50 dark:to-teal-900/50 text-cyan-700 dark:text-cyan-300 border-2 border-cyan-300 dark:border-cyan-700 hover:from-cyan-200 hover:to-teal-200 dark:hover:from-cyan-800 dark:hover:to-teal-800 text-sm font-bold transition-all hover:scale-110"
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
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-4 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent font-black">
                    Patient Reviews
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-center py-12">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/50 dark:to-teal-900/50 rounded-full flex items-center justify-center border-4 border-cyan-200 dark:border-cyan-800">
                      <Users className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                    {doctor.totalReviews || 0} Patient Reviews
                  </h3>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="flex items-center gap-1 bg-cyan-100 dark:bg-cyan-900/30 px-4 py-2 rounded-full">
                      {renderRatingStars(doctor.rating || 0)}
                    </div>
                    <span className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                      {doctor.rating || 0}
                    </span>
                    <span className="text-muted-foreground font-medium">out of 5</span>
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
          <div className="space-y-6">
            {/* Consultation Fee */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Card className="relative border-0 shadow-2xl bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-100 dark:from-cyan-950/80 dark:via-teal-950/80 dark:to-cyan-900/80">
                <CardContent className="p-8 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
                      <IndianRupee className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
                      Consultation Fee
                    </p>
                    <div className="text-5xl font-black bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                      ₹{doctor.fees ?? "N/A"}
                    </div>
                    <p className="text-cyan-600/80 dark:text-cyan-400/80 font-semibold">per session</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <BookConsultationForm
              doctorId={doctor.id}
              fee={doctor.fees ?? 0}
            />

            {/* Quick Actions */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-4 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent font-black">
                    Quick Actions
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button className="group relative overflow-hidden flex flex-col items-center gap-3 h-auto p-5 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 hover:from-cyan-100 hover:to-teal-100 dark:hover:from-cyan-900/50 dark:hover:to-teal-900/50 rounded-2xl transition-all hover:scale-105 hover:shadow-xl border-2 border-cyan-200/50 dark:border-cyan-800/50 hover:border-cyan-400 dark:hover:border-cyan-600 text-cyan-900 dark:text-cyan-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl shadow-lg">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                    <span className="relative z-10 text-xs font-bold">
                      Video Call
                    </span>
                  </Button>

                  <Button className="group relative overflow-hidden flex flex-col items-center gap-3 h-auto p-5 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/50 dark:to-cyan-950/50 hover:from-teal-100 hover:to-cyan-100 dark:hover:from-teal-900/50 dark:hover:to-cyan-900/50 rounded-2xl transition-all hover:scale-105 hover:shadow-xl border-2 border-teal-200/50 dark:border-teal-800/50 hover:border-teal-400 dark:hover:border-teal-600 text-teal-900 dark:text-teal-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl shadow-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <span className="relative z-10 text-xs font-bold">
                      Voice Call
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badge */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Card className="relative border-0 shadow-2xl bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/80 dark:to-teal-950/80">
                <CardContent className="p-8 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="font-black text-cyan-800 dark:text-cyan-200 text-xl mb-3">
                    Verified Professional
                  </h3>
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 leading-relaxed font-medium">
                    This doctor has been thoroughly verified and approved by our
                    medical board for your safety and trust
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">
                      100% Secure
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}