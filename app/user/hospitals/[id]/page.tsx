"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getHospitalById } from "@/features/user-hospitals/actions/getHospitalById";
import { UserHospital } from "@/features/user-hospitals/types/userHospital";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MapPin,
  Users,
  Stethoscope,
  ArrowLeft,
  Phone,
  Mail,
  Clock,
  IndianRupee,
  Star,
  Building2,
  Calendar,
  FileText,
  Globe,
  Shield,
  Award,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import Header from "@/components/layout/Header";

export default function UserHospitalPage() {
  const params = useParams();
  const router = useRouter();
  const [hospital, setHospital] = useState<UserHospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospital = async () => {
      if (!params.id) return;

      try {
        const data = await getHospitalById(params.id);
        if (!data) {
          router.push("/user/hospitals");
          return;
        }
        setHospital(data);
      } catch (error) {
        console.error("Error fetching hospital:", error);
        router.push("/user/hospitals");
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [params.id, router]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="space-y-6">
              <Skeleton className="h-12 w-40" />
              <Card className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <Skeleton className="w-32 h-32 rounded-xl" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-10 w-3/4" />
                      <Skeleton className="h-6 w-1/2" />
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-28" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[...Array(3)].map((_, j) => (
                        <Skeleton key={j} className="h-20 w-full" />
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!hospital) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <Alert className="max-w-md mx-auto border-2 border-cyan-200 dark:border-cyan-800">
              <Building2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <AlertDescription className="text-slate-700 dark:text-slate-300">
                Hospital not found or not available.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-40 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 -right-32 w-96 h-96 bg-gradient-to-r from-teal-500/10 to-sky-400/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
          <div className="space-y-8">
            {/* Back Button */}
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2 border-2 hover:border-cyan-400 dark:hover:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Hospitals
            </Button>

            {/* Hospital Header */}
            <Card className="overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-cyan-600 via-teal-600 to-sky-600 dark:from-cyan-800 dark:via-teal-800 dark:to-sky-800 p-8 md:p-12 text-white overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

                  {/* Glow Effect */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                  <div className="relative flex flex-col md:flex-row items-start gap-6">
                    <div className="relative">
                      <Avatar className="w-32 h-32 border-4 border-white/30 shadow-2xl ring-4 ring-white/20">
                        <AvatarImage
                          src={hospital.logo || hospital.image}
                          alt={hospital.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-3xl font-black bg-white/20 backdrop-blur-sm text-white">
                          {hospital.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {hospital.verified && (
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 rounded-full p-2 shadow-lg">
                          <CheckCircle2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-start gap-3 mb-2">
                          <h1 className="text-3xl md:text-4xl font-black">
                            {hospital.name}
                          </h1>
                          <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-bold">
                            {hospital.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-cyan-100">
                          <MapPin className="w-5 h-5" />
                          <span className="text-lg font-medium">
                            {hospital.address && `${hospital.address}, `}
                            {[hospital.city, hospital.state, hospital.country]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 font-bold">
                          <Users className="w-4 h-4 mr-2" />
                          {hospital.doctors?.length || 0} Doctors
                        </Badge>
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 font-bold">
                          <Stethoscope className="w-4 h-4 mr-2" />
                          {hospital.procedures?.length || 0} Procedures
                        </Badge>
                        {hospital.services && hospital.services.length > 0 && (
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 font-bold">
                            <HeartHandshake className="w-4 h-4 mr-2" />
                            {hospital.services.length} Services
                          </Badge>
                        )}
                        {hospital.facilities &&
                          hospital.facilities.length > 0 && (
                            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 font-bold">
                              <Building2 className="w-4 h-4 mr-2" />
                              {hospital.facilities.length} Facilities
                            </Badge>
                          )}
                      </div>

                      {/* Contact Info */}
                      <div className="flex flex-wrap gap-4 text-cyan-50 font-medium">
                        {hospital.phone && (
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                            <Phone className="w-4 h-4" />
                            <span>{hospital.phone}</span>
                          </div>
                        )}
                        {hospital.email && (
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                            <Mail className="w-4 h-4" />
                            <span className="truncate max-w-[200px]">
                              {hospital.email}
                            </span>
                          </div>
                        )}
                        {hospital.website && (
                          <a
                            href={hospital.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/20 transition-all"
                          >
                            <Globe className="w-4 h-4" />
                            <span>Visit Website</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hospital Images */}
            {hospital.image && (
              <Card className="overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <ImageIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Hospital Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={hospital.image}
                    alt={`${hospital.name} facility`}
                    className="w-full h-96 object-cover"
                  />
                </CardContent>
              </Card>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Doctors Section */}
                <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20">
                    <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                      <div className="p-2 bg-cyan-100 dark:bg-cyan-900/40 rounded-lg">
                        <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      Our Doctors
                      <Badge variant="secondary" className="ml-auto font-bold">
                        {hospital.doctors?.length || 0}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    {!hospital.doctors || hospital.doctors.length === 0 ? (
                      <div className="text-center py-12 text-slate-500">
                        <Users className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                        <p className="font-medium">
                          No doctors information available.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {hospital.doctors.map((doctor) => (
                          <div
                            key={doctor.id}
                            className="p-4 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-cyan-400 dark:hover:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/10 transition-all group"
                          >
                            <div className="flex items-start gap-4">
                              <Avatar className="w-14 h-14 ring-2 ring-slate-200 dark:ring-slate-800 group-hover:ring-cyan-400 dark:group-hover:ring-cyan-600 transition-all">
                                <AvatarImage
                                  src={doctor.profilePic}
                                  alt={doctor.name}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900 dark:to-teal-900 text-cyan-700 dark:text-cyan-300 font-bold">
                                  {doctor.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">
                                      {doctor.name}
                                    </h4>
                                    <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold">
                                      {doctor.specialization}
                                    </p>
                                    {doctor.experience && (
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                                        {doctor.experience} years experience
                                      </p>
                                    )}
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300"
                                  >
                                    <Star className="w-3 h-3 mr-1 fill-cyan-600 dark:fill-cyan-400" />
                                    Specialist
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Services Section */}
                {hospital.services && hospital.services.length > 0 && (
                  <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                      <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <HeartHandshake className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        Medical Services
                        <Badge
                          variant="secondary"
                          className="ml-auto font-bold"
                        >
                          {hospital.services.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-6">
                      {hospital.services.map((service) => (
                        <div
                          key={service.id}
                          className="p-4 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-bold text-slate-900 dark:text-slate-100">
                                {service.name}
                              </h4>
                              {service.cost && (
                                <Badge className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700 font-bold">
                                  <IndianRupee className="w-3 h-3 mr-1" />
                                  {service.cost}
                                </Badge>
                              )}
                            </div>
                            {service.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {service.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Procedures Section */}
                <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                      <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                        <Stethoscope className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      Available Procedures
                      <Badge variant="secondary" className="ml-auto font-bold">
                        {hospital.procedures?.length || 0}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    {!hospital.procedures ||
                    hospital.procedures.length === 0 ? (
                      <div className="text-center py-12 text-slate-500">
                        <Stethoscope className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                        <p className="font-medium">
                          No procedures information available.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {hospital.procedures.map((procedure) => (
                          <div
                            key={procedure.id}
                            className="p-4 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-green-400 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all"
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-bold text-slate-900 dark:text-slate-100">
                                  {procedure.name}
                                </h4>
                                {procedure.cost && (
                                  <Badge className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 font-bold">
                                    <IndianRupee className="w-3 h-3 mr-1" />
                                    {procedure.cost}
                                  </Badge>
                                )}
                              </div>
                              {procedure.description && (
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {procedure.description}
                                </p>
                              )}
                              {procedure.duration && (
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                  <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  <span>{procedure.duration}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Facilities Section */}
                {hospital.facilities && hospital.facilities.length > 0 && (
                  <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                      <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
                          <Building2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        Hospital Facilities
                        <Badge
                          variant="secondary"
                          className="ml-auto font-bold"
                        >
                          {hospital.facilities.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-6">
                      {hospital.facilities.map((facility) => (
                        <div
                          key={facility.id}
                          className="p-4 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-orange-400 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all"
                        >
                          <div className="space-y-2">
                            <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              <Award className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                              {facility.name}
                            </h4>
                            {facility.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 ml-6">
                                {facility.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Insurance Section */}
            {hospital.Insurance && hospital.Insurance.length > 0 && (
              <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                      <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Insurance Coverage
                    <Badge variant="secondary" className="ml-auto font-bold">
                      {hospital.Insurance.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hospital.Insurance.map((insurance) => (
                      <div
                        key={insurance.id}
                        className="p-4 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-slate-900 dark:text-slate-100">
                              {insurance.name}
                            </h4>
                            {insurance.cashless !== null && (
                              <div className="flex items-center gap-1">
                                {insurance.cashless ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                )}
                              </div>
                            )}
                          </div>
                          {insurance.cashless !== null && (
                            <Badge
                              className={`${
                                insurance.cashless
                                  ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700"
                                  : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700"
                              } font-bold`}
                            >
                              {insurance.cashless
                                ? "Cashless"
                                : "Reimbursement"}
                            </Badge>
                          )}
                          {insurance.provider && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                              Provider: {insurance.provider}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="border-2 border-cyan-200 dark:border-cyan-800 shadow-xl bg-gradient-to-br from-cyan-50/50 to-teal-50/50 dark:from-cyan-900/10 dark:to-teal-900/10">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Button
                    size="lg"
                    className="flex items-center gap-2 min-w-[200px] bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex items-center gap-2 min-w-[200px] border-2 border-cyan-300 dark:border-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 font-bold transition-all"
                  >
                    <FileText className="w-5 h-5" />
                    Request Estimate
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex items-center gap-2 min-w-[200px] border-2 border-cyan-300 dark:border-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 font-bold transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    Contact Hospital
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
              opacity: 0.1;
            }
            50% {
              transform: translateY(-20px);
              opacity: 0.2;
            }
          }

          .animate-float {
            animation: float 12s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 12s ease-in-out 6s infinite;
          }
        `}</style>
      </div>
    </>
  );
}
