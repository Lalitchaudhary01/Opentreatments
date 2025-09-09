"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Star,
  Shield,
  Phone,
  Mail,
  Globe,
  Clock,
  Bed,
  CreditCard,
  Building2,
  Stethoscope,
  User,
  Calendar,
  IndianRupee,
  Timer,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getHospitalBySlug } from "@/features/Hospitals/actions/getHospitalBySlug";
import { Hospital } from "@/features/Hospitals/types/hospital";
import Link from "next/link";

export default function HospitalDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHospital() {
      try {
        const data = await getHospitalBySlug(slug);
        setHospital(data);
      } catch (err) {
        console.error("Failed to fetch hospital:", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchHospital();
  }, [slug]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-500 fill-current"
            : i < rating
            ? "text-yellow-500 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case "government":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "private":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "semi-private":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading hospital details...</p>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertDescription>
            Hospital not found. Please check the URL or try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/Hospitals">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </Link>
          <div className="h-6 w-px bg-border"></div>
          <nav className="text-sm text-muted-foreground">
            <span>Hospitals</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{hospital.name}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-20 w-20 border-4 border-white/20">
                    <AvatarImage src={hospital.logo} alt={hospital.name} />
                    <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
                      {hospital.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{hospital.name}</h1>
                      <Shield className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        {renderStars(4.2)}
                        <span className="ml-2 font-medium">4.2</span>
                        <span className="text-blue-200 ml-1">
                          (156 reviews)
                        </span>
                      </div>
                      <Badge className={getTypeColor("private")}>
                        <Building2 className="h-3 w-3 mr-1" />
                        Private Hospital
                      </Badge>
                    </div>
                    <p className="text-blue-100 text-lg leading-relaxed">
                      {hospital.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-200" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-blue-200 text-sm">
                        {hospital.address}, {hospital.city}, {hospital.state}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-200" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-blue-200 text-sm">{hospital.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-200" />
                    <div>
                      <p className="font-medium">Emergency</p>
                      <p className="text-green-300 text-sm font-medium">
                        24/7 Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:min-w-[200px]">
                <Button className="bg-white text-blue-600 hover:bg-blue-50 gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </Button>
                {hospital.website && (
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="procedures">Procedures</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <Bed className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-lg">150</h3>
                    <p className="text-muted-foreground text-sm">Total Beds</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-lg">
                      {hospital.doctors.length}
                    </h3>
                    <p className="text-muted-foreground text-sm">Doctors</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <Stethoscope className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-lg">
                      {hospital.services.length}
                    </h3>
                    <p className="text-muted-foreground text-sm">Services</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-lg">
                      {hospital.insurances.length}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Insurance Plans
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{hospital.email}</span>
                  </div>
                  {hospital.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={hospital.website}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Address</h4>
                    <p className="text-sm text-muted-foreground">
                      {hospital.address}
                      <br />
                      {hospital.city}, {hospital.state}
                      <br />
                      {hospital.country}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            {hospital.services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospital.services.map((service) => (
                  <Card
                    key={service.id}
                    className="border-0 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {service.description && (
                        <p className="text-muted-foreground text-sm">
                          {service.description}
                        </p>
                      )}
                      {service.cost !== null && (
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">
                            ₹{service.cost.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No services information available.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6">
            {hospital.doctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hospital.doctors.map((doctor) => (
                  <Card key={doctor.id} className="border-0 shadow-md">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                            {doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {doctor.name}
                          </CardTitle>
                          <p className="text-muted-foreground">
                            {doctor.specialization}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {doctor.experience !== null && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {doctor.experience} years experience
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No doctors information available.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Facilities Tab */}
          <TabsContent value="facilities" className="space-y-6">
            {hospital.facilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospital.facilities.map((facility) => (
                  <Card key={facility.id} className="border-0 shadow-md">
                    <CardContent className="p-4 flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="font-medium">{facility.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No facilities information available.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-6">
            {hospital.insurances.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hospital.insurances.map((insurance) => (
                  <Card key={insurance.id} className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{insurance.name}</h3>
                          {insurance.provider && (
                            <p className="text-muted-foreground text-sm">
                              {insurance.provider}
                            </p>
                          )}
                        </div>
                        {insurance.cashless && (
                          <Badge className="bg-green-100 text-green-800">
                            <CreditCard className="h-3 w-3 mr-1" />
                            Cashless
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No insurance information available.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Procedures Tab */}
          <TabsContent value="procedures" className="space-y-6">
            {hospital.procedures.length > 0 ? (
              <div className="space-y-4">
                {hospital.procedures.map((procedure) => (
                  <Card key={procedure.id} className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {procedure.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {procedure.description && (
                        <p className="text-muted-foreground">
                          {procedure.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4">
                        {procedure.cost !== null && (
                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-green-600" />
                            <span className="font-semibold">
                              ₹{procedure.cost.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {procedure.duration && (
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-blue-600" />
                            <span>{procedure.duration}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No procedures information available.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
