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
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  HeartHandshake,
} from "lucide-react";

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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {/* Back button skeleton */}
          <Skeleton className="h-10 w-32" />

          {/* Header skeleton */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <Skeleton className="w-32 h-32 rounded-xl" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content skeletons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Alert className="max-w-md mx-auto">
          <Building2 className="h-4 w-4" />
          <AlertDescription>
            Hospital not found or not available.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hospitals
        </Button>

        {/* Hospital Header */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
              <div className="flex items-start gap-6">
                <Avatar className="w-32 h-32 border-4 border-white/20">
                  <AvatarImage
                    src={hospital.logo}
                    alt={hospital.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-bold bg-white/10 text-white">
                    {hospital.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{hospital.name}</h1>
                    <div className="flex items-center gap-2 text-blue-100">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">
                        {hospital.address && `${hospital.address}, `}
                        {hospital.city}, {hospital.state}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      <Users className="w-4 h-4 mr-1" />
                      {hospital.doctors.length} Doctors
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      <Stethoscope className="w-4 h-4 mr-1" />
                      {hospital.procedures.length} Procedures
                    </Badge>
                    {hospital.services && (
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30"
                      >
                        <HeartHandshake className="w-4 h-4 mr-1" />
                        {hospital.services.length} Services
                      </Badge>
                    )}
                    {hospital.facilities && (
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30"
                      >
                        <Building2 className="w-4 h-4 mr-1" />
                        {hospital.facilities.length} Facilities
                      </Badge>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-blue-100">
                    {hospital.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{hospital.phone}</span>
                      </div>
                    )}
                    {hospital.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{hospital.email}</span>
                      </div>
                    )}
                    {hospital.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <a
                          href={hospital.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hospital Images */}
        {hospital.image && (
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                Hospital Gallery
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <img
                src={hospital.image}
                alt={`${hospital.name} facility`}
                className="w-full h-64 object-cover"
              />
            </CardContent>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Doctors Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Our Doctors
                  <Badge variant="secondary" className="ml-auto">
                    {hospital.doctors.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hospital.doctors.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No doctors information available.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {hospital.doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          {doctor.profilePic && (
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={doctor.profilePic}
                                alt={doctor.name}
                              />
                              <AvatarFallback>
                                {doctor.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {doctor.name}
                                </h4>
                                <p className="text-sm text-blue-600 font-medium">
                                  {doctor.specialization}
                                </p>
                                {doctor.experience && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {doctor.experience} years experience
                                  </p>
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-purple-600" />
                    Medical Services
                    <Badge variant="secondary" className="ml-auto">
                      {hospital.services.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hospital.services.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-gray-900">
                            {service.name}
                          </h4>
                          {service.cost && (
                            <Badge
                              variant="secondary"
                              className="text-purple-700 bg-purple-50"
                            >
                              <IndianRupee className="w-3 h-3 mr-1" />
                              {service.cost}
                            </Badge>
                          )}
                        </div>
                        {service.description && (
                          <p className="text-sm text-gray-600">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-green-600" />
                  Available Procedures
                  <Badge variant="secondary" className="ml-auto">
                    {hospital.procedures.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hospital.procedures.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Stethoscope className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No procedures information available.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {hospital.procedures.map((procedure) => (
                      <div
                        key={procedure.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-gray-900">
                              {procedure.name}
                            </h4>
                            {procedure.cost && (
                              <Badge
                                variant="secondary"
                                className="text-green-700 bg-green-50"
                              >
                                <IndianRupee className="w-3 h-3 mr-1" />
                                {procedure.cost}
                              </Badge>
                            )}
                          </div>
                          {procedure.description && (
                            <p className="text-sm text-gray-600">
                              {procedure.description}
                            </p>
                          )}
                          {procedure.duration && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-orange-600" />
                    Hospital Facilities
                    <Badge variant="secondary" className="ml-auto">
                      {hospital.facilities.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hospital.facilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Award className="w-4 h-4 text-orange-600" />
                          {facility.name}
                        </h4>
                        {facility.description && (
                          <p className="text-sm text-gray-600 ml-6">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Insurance Coverage
                <Badge variant="secondary" className="ml-auto">
                  {hospital.Insurance.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospital.Insurance.map((insurance) => (
                  <div
                    key={insurance.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-gray-900">
                          {insurance.name}
                        </h4>
                        {insurance.cashless !== null && (
                          <div className="flex items-center gap-1">
                            {insurance.cashless ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span
                              className={`text-xs font-medium ${
                                insurance.cashless
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {insurance.cashless
                                ? "Cashless"
                                : "Reimbursement"}
                            </span>
                          </div>
                        )}
                      </div>
                      {insurance.provider && (
                        <p className="text-sm text-gray-600">
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
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                size="lg"
                className="flex items-center gap-2 min-w-[200px]"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex items-center gap-2 min-w-[200px]"
              >
                <FileText className="w-5 h-5" />
                Request Estimate
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex items-center gap-2 min-w-[200px]"
              >
                <Phone className="w-5 h-5" />
                Contact Hospital
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
