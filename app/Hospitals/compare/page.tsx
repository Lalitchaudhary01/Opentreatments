"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  Shield,
  Phone,
  Mail,
  Globe,
  Building2,
  Stethoscope,
  User,
  IndianRupee,
  X,
  Plus,
  Eye,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getHospitalById } from "@/features/Hospitals/actions/getHospitalById";
import { Hospital } from "@/features/Hospitals/types/hospital";
import Link from "next/link";

export default function ComparePage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompareHospitals() {
      const ids: string[] = JSON.parse(
        localStorage.getItem("compareHospitals") || "[]"
      );
      const data: Hospital[] = [];

      for (const id of ids) {
        try {
          const hospital = await getHospitalById(id);
          if (hospital) data.push(hospital);
        } catch (err) {
          console.error(err);
        }
      }
      setHospitals(data);
      setLoading(false);
    }

    fetchCompareHospitals();
  }, []);

  const removeFromComparison = (hospitalId: string) => {
    const currentIds = JSON.parse(
      localStorage.getItem("compareHospitals") || "[]"
    );
    const updatedIds = currentIds.filter((id: string) => id !== hospitalId);
    localStorage.setItem("compareHospitals", JSON.stringify(updatedIds));
    setHospitals(hospitals.filter((h) => h.id !== hospitalId));
  };

  const clearAllComparisons = () => {
    localStorage.removeItem("compareHospitals");
    setHospitals([]);
  };

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
        return "bg-green-100 text-green-800";
      case "private":
        return "bg-blue-100 text-blue-800";
      case "semi-private":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (hospitals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
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
              <span className="text-foreground font-medium">Compare</span>
            </nav>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Plus className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  No Hospitals Selected
                </h2>
                <p className="text-muted-foreground mb-6">
                  You haven't selected any hospitals for comparison yet. Browse
                  hospitals and add them to compare features, services, and
                  more.
                </p>
                <Button className="gap-2">
                  <Eye className="h-4 w-4" />
                  Browse Hospitals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <nav className="text-sm text-muted-foreground">
              <span>Hospitals</span>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">Compare</span>
            </nav>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllComparisons}
            className="gap-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Compare Hospitals</h1>
          <p className="text-muted-foreground">
            Comparing {hospitals.length} hospital
            {hospitals.length > 1 ? "s" : ""} to help you make the best choice
          </p>
        </div>

        {/* Hospital Cards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {hospitals.map((hospital) => (
            <Card
              key={hospital.id}
              className="border-0 shadow-lg relative group"
            >
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 z-10 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFromComparison(hospital.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={hospital.logo} alt={hospital.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {hospital.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">
                        {hospital.name}
                      </h3>
                      <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">
                        {hospital.city}, {hospital.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {renderStars(4.2)}
                        <span className="ml-1 text-sm">4.2</span>
                      </div>
                      <Badge
                        className={getTypeColor("private")}
                        variant="secondary"
                      >
                        Private
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-blue-600" />
                    <span>{hospital.services.length} Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    <span>{hospital.doctors.length} Doctors</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Comparison */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Detailed Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="doctors">Doctors</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="procedures">Procedures</TabsTrigger>
              </TabsList>

              {/* Overview Comparison */}
              <TabsContent value="overview">
                <ScrollArea className="w-full">
                  <div className="min-w-full">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4 font-semibold min-w-[150px]">
                            Attribute
                          </th>
                          {hospitals.map((hospital) => (
                            <th
                              key={hospital.id}
                              className="text-left py-4 px-4 font-semibold min-w-[200px]"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={hospital.logo} />
                                  <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                                    {hospital.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="truncate">
                                  {hospital.name}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-4 font-medium">Location</td>
                          {hospitals.map((hospital) => (
                            <td key={hospital.id} className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {hospital.city}, {hospital.state}
                                </span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-4 font-medium">Contact</td>
                          {hospitals.map((hospital) => (
                            <td
                              key={hospital.id}
                              className="py-4 px-4 space-y-1"
                            >
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span>{hospital.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span className="truncate">
                                  {hospital.email}
                                </span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-4 font-medium">Type</td>
                          {hospitals.map((hospital) => (
                            <td key={hospital.id} className="py-4 px-4">
                              <Badge className={getTypeColor("private")}>
                                <Building2 className="h-3 w-3 mr-1" />
                                Private Hospital
                              </Badge>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Facilities Comparison */}
              <TabsContent value="facilities">
                <ScrollArea className="w-full">
                  <div className="min-w-full">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4 font-semibold min-w-[150px]">
                            Facilities
                          </th>
                          {hospitals.map((hospital) => (
                            <th
                              key={hospital.id}
                              className="text-left py-4 px-4 font-semibold min-w-[200px]"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={hospital.logo} />
                                  <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                                    {hospital.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="truncate">
                                  {hospital.name}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-4 font-medium">
                            Available Facilities
                          </td>
                          {hospitals.map((hospital) => (
                            <td key={hospital.id} className="py-4 px-4">
                              {hospital.facilities.length > 0 ? (
                                <div className="space-y-2">
                                  {hospital.facilities
                                    .slice(0, 5)
                                    .map((facility) => (
                                      <div
                                        key={facility.id}
                                        className="flex items-center gap-2 text-sm"
                                      >
                                        <CheckCircle className="h-3 w-3 text-green-600" />
                                        <span>{facility.name}</span>
                                      </div>
                                    ))}
                                  {hospital.facilities.length > 5 && (
                                    <p className="text-sm text-muted-foreground">
                                      +{hospital.facilities.length - 5} more
                                      facilities
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">
                                  No facilities listed
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Services Comparison */}
              <TabsContent value="services">
                <ScrollArea className="w-full">
                  <div className="min-w-full">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4 font-semibold min-w-[150px]">
                            Services
                          </th>
                          {hospitals.map((hospital) => (
                            <th
                              key={hospital.id}
                              className="text-left py-4 px-4 font-semibold min-w-[200px]"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={hospital.logo} />
                                  <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                                    {hospital.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="truncate">
                                  {hospital.name}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-4 font-medium">
                            Available Services
                          </td>
                          {hospitals.map((hospital) => (
                            <td key={hospital.id} className="py-4 px-4">
                              {hospital.services.length > 0 ? (
                                <div className="space-y-2">
                                  {hospital.services
                                    .slice(0, 5)
                                    .map((service) => (
                                      <div
                                        key={service.id}
                                        className="space-y-1"
                                      >
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                          <Stethoscope className="h-3 w-3 text-blue-600" />
                                          <span>{service.name}</span>
                                        </div>
                                        {service.cost !== null && (
                                          <div className="flex items-center gap-1 text-xs text-green-600 ml-5">
                                            <IndianRupee className="h-3 w-3" />
                                            <span>
                                              {service.cost.toLocaleString()}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  {hospital.services.length > 5 && (
                                    <p className="text-sm text-muted-foreground">
                                      +{hospital.services.length - 5} more
                                      services
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">
                                  No services listed
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Doctors Comparison */}
              <TabsContent value="doctors">
                <ScrollArea className="w-full">
                  <div className="min-w-full">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4 font-semibold min-w-[150px]">
                            Doctors
                          </th>
                          {hospitals.map((hospital) => (
                            <th
                              key={hospital.id}
                              className="text-left py-4 px-4 font-semibold min-w-[200px]"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={hospital.logo} />
                                  <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                                    {hospital.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="truncate">
                                  {hospital.name}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-4 font-medium">
                            Medical Staff
                          </td>
                          {hospitals.map((hospital) => (
                            <td key={hospital.id} className="py-4 px-4">
                              {hospital.doctors.length > 0 ? (
                                <div className="space-y-2">
                                  {hospital.doctors
                                    .slice(0, 5)
                                    .map((doctor) => (
                                      <div
                                        key={doctor.id}
                                        className="space-y-1"
                                      >
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                          <User className="h-3 w-3 text-blue-600" />
                                          <span>{doctor.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground ml-5">
                                          {doctor.specialization}
                                          {doctor.experience &&
                                            ` • ${doctor.experience} yrs exp`}
                                        </p>
                                      </div>
                                    ))}
                                  {hospital.doctors.length > 5 && (
                                    <p className="text-sm text-muted-foreground">
                                      +{hospital.doctors.length - 5} more
                                      doctors
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">
                                  No doctors listed
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Insurance Comparison */}
              <TabsContent value="insurance">
                <ScrollArea className="w-full">
                  <div className="min-w-full">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4 font-semibold min-w-[150px]">
                            Insurance
                          </th>
                          {hospitals.map((hospital) => (
                            <th
                              key={hospital.id}
                              className="text-left py-4 px-4 font-semibold min-w-[200px]"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={hospital.logo} />
                                  <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                                    {hospital.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="truncate">
                                  {hospital.name}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-4 font-medium">
                            Accepted Plans
                          </td>
                          {hospitals.map((hospital) => (
                            <td key={hospital.id} className="py-4 px-4">
                              {hospital.insurances.length > 0 ? (
                                <div className="space-y-2">
                                  {hospital.insurances.map((insurance) => (
                                    <div
                                      key={insurance.id}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                          {insurance.name}
                                        </p>
                                        {insurance.provider && (
                                          <p className="text-xs text-muted-foreground">
                                            {insurance.provider}
                                          </p>
                                        )}
                                      </div>
                                      {insurance.cashless && (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          Cashless
                                        </Badge>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">
                                  No insurance info
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Procedures Comparison */}
              <TabsContent value="procedures">
                <ScrollArea className="w-full">
                  <div className="min-w-full">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4 font-semibold min-w-[150px]">
                            Procedures
                          </th>
                          {hospitals.map((hospital) => (
                            <th
                              key={hospital.id}
                              className="text-left py-4 px-4 font-semibold min-w-[200px]"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={hospital.logo} />
                                  <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                                    {hospital.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="truncate">
                                  {hospital.name}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-4 px-4 font-medium">
                            Available Procedures
                          </td>
                          {hospitals.map((hospital) => (
                            <td key={hospital.id} className="py-4 px-4">
                              {hospital.procedures.length > 0 ? (
                                <div className="space-y-2">
                                  {hospital.procedures
                                    .slice(0, 3)
                                    .map((procedure) => (
                                      <div
                                        key={procedure.id}
                                        className="space-y-1"
                                      >
                                        <p className="text-sm font-medium">
                                          {procedure.name}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                          {procedure.cost !== null && (
                                            <div className="flex items-center gap-1 text-green-600">
                                              <IndianRupee className="h-3 w-3" />
                                              <span>
                                                {procedure.cost.toLocaleString()}
                                              </span>
                                            </div>
                                          )}
                                          {procedure.duration && (
                                            <span>{procedure.duration}</span>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  {hospital.procedures.length > 3 && (
                                    <p className="text-sm text-muted-foreground">
                                      +{hospital.procedures.length - 3} more
                                      procedures
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">
                                  No procedures listed
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
