"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Stethoscope,
  Heart,
  Shield,
  Building,
  CheckCircle,
  Edit,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  experience?: number;
  profilePic?: string;
};

type Procedure = {
  id: string;
  name: string;
  description?: string;
  cost?: number;
  duration?: string;
};

type Service = {
  id: string;
  name: string;
  description?: string;
  cost?: number;
};

type Facility = {
  id: string;
  name: string;
  description?: string;
};

type Insurance = {
  id: string;
  name: string;
  provider?: string;
  cashless?: boolean;
};

type HospitalProfile = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  image?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  doctors?: Doctor[];
  procedures?: Procedure[];
  services?: Service[];
  facilities?: Facility[];
  insurances?: Insurance[];
};

export function HospitalProfileView({ profile }: { profile: HospitalProfile }) {
  return (
    <div className="space-y-6">
      {/* Cover Image and Logo */}
      {(profile.image || profile.logo) && (
        <Card className="border-2 border-gray-900 overflow-hidden">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Images
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.logo && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Hospital Logo
                  </p>
                  <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-center">
                    <img
                      src={profile.logo}
                      alt="Hospital Logo"
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                </div>
              )}
              {profile.image && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Cover Image
                  </p>
                  <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={profile.image}
                      alt="Hospital Cover"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Basic Information */}
      <Card className="border-2 border-gray-900">
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Essential details about your hospital
              </CardDescription>
            </div>
            <Link href="/hospitals/profile/edit">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Hospital Name
              </p>
              <p className="font-semibold text-lg text-gray-900">
                {profile.name}
              </p>
            </div>

            {profile.phone && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </p>
                <p className="font-medium text-gray-900">{profile.phone}</p>
              </div>
            )}

            {profile.email && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </p>
                <p className="font-medium text-gray-900">{profile.email}</p>
              </div>
            )}

            {profile.website && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </p>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {profile.website}
                </a>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {profile.address && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Full Address
              </p>
              <p className="font-medium text-gray-900 whitespace-pre-wrap">
                {profile.address}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.city && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">City</p>
                <p className="font-medium text-gray-900">{profile.city}</p>
              </div>
            )}

            {profile.state && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">State</p>
                <p className="font-medium text-gray-900">{profile.state}</p>
              </div>
            )}

            {profile.country && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Country</p>
                <p className="font-medium text-gray-900">{profile.country}</p>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">
                Profile Created
              </p>
              <p className="font-medium text-gray-900">
                {new Date(profile.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="font-medium text-gray-900">
                {new Date(profile.updatedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctors Section */}
      {profile.doctors && profile.doctors.length > 0 && (
        <Card className="border-2 border-gray-900">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Doctors
                </CardTitle>
                <CardDescription>
                  Doctors working at your hospital
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {profile.doctors.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.doctors.map((doctor, index) => (
                <Card
                  key={doctor.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {doctor.profilePic ? (
                        <img
                          src={doctor.profilePic}
                          alt={doctor.name}
                          className="h-20 w-20 rounded-full object-cover border-2 border-gray-300"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                          <Users className="h-10 w-10 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900">
                          {doctor.name}
                        </h4>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          {doctor.specialization}
                        </p>
                        {doctor.experience && (
                          <Badge variant="outline" className="text-xs">
                            {doctor.experience} years experience
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Procedures Section */}
      {profile.procedures && profile.procedures.length > 0 && (
        <Card className="border-2 border-gray-900">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Procedures
                </CardTitle>
                <CardDescription>Medical procedures offered</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {profile.procedures.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {profile.procedures.map((procedure, index) => (
                <Card
                  key={procedure.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {procedure.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>

                    {procedure.description && (
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {procedure.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {procedure.cost && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-500">
                            Cost
                          </p>
                          <p className="font-semibold text-lg text-gray-900">
                            ₹{procedure.cost.toLocaleString("en-IN")}
                          </p>
                        </div>
                      )}
                      {procedure.duration && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-500">
                            Duration
                          </p>
                          <p className="font-medium text-gray-900">
                            {procedure.duration}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services Section */}
      {profile.services && profile.services.length > 0 && (
        <Card className="border-2 border-gray-900">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Services
                </CardTitle>
                <CardDescription>Medical services provided</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {profile.services.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.services.map((service, index) => (
                <Card
                  key={service.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {service.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>

                    {service.description && (
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    {service.cost && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500">
                          Cost
                        </p>
                        <p className="font-semibold text-lg text-gray-900">
                          ₹{service.cost.toLocaleString("en-IN")}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Facilities Section */}
      {profile.facilities && profile.facilities.length > 0 && (
        <Card className="border-2 border-gray-900">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Facilities
                </CardTitle>
                <CardDescription>
                  Available facilities at your hospital
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {profile.facilities.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.facilities.map((facility, index) => (
                <Card
                  key={facility.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {facility.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>

                    {facility.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {facility.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insurances Section */}
      {profile.insurances && profile.insurances.length > 0 && (
        <Card className="border-2 border-gray-900">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Insurance Accepted
                </CardTitle>
                <CardDescription>Accepted insurance providers</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {profile.insurances.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.insurances.map((insurance, index) => (
                <Card
                  key={insurance.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6">
                    <div className="mb-3">
                      <h4 className="font-semibold text-lg text-gray-900 mb-2">
                        {insurance.name}
                      </h4>

                      {insurance.provider && (
                        <p className="text-sm text-gray-600 mb-3">
                          Provider: {insurance.provider}
                        </p>
                      )}
                    </div>

                    {insurance.cashless ? (
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-700 bg-green-50"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Cashless Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-600">
                        Cashless Not Available
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {(!profile.doctors || profile.doctors.length === 0) &&
        (!profile.procedures || profile.procedures.length === 0) &&
        (!profile.services || profile.services.length === 0) &&
        (!profile.facilities || profile.facilities.length === 0) &&
        (!profile.insurances || profile.insurances.length === 0) && (
          <Card className="border-2 border-gray-300 bg-gray-50">
            <CardContent className="pt-6 text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium mb-2">
                No additional details added yet
              </p>
              <p className="text-sm text-gray-500">
                Click "Edit Profile" to add doctors, services, facilities, and
                more
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
