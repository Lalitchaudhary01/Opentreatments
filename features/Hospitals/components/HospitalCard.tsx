"use client";
import { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Shield,
  Phone,
  Clock,
  Bed,
  CreditCard,
  Plus,
  Check,
  Eye,
  Building2,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Hospital type for demo
interface Hospital {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
  rating?: number;
  totalReviews?: number;
  type?: "government" | "private" | "semi-private";
  specialties?: string[];
  image?: string;
  verified?: boolean;
  phone?: string;
  emergencyAvailable?: boolean;
  insuranceAccepted?: string[];
  costRange?: {
    min: number;
    max: number;
  };
  bedCount?: number;
  availableBeds?: number;
}

interface Props {
  hospital: Hospital;
}

// Mock Link component for demo
const Link = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a href={href} className={className}>
    {children}
  </a>
);

export default function HospitalCard({ hospital }: Props) {
  const [selectedForCompare, setSelectedForCompare] = useState(false);

  // Mock hospital data with more details
  const mockHospital: Hospital = {
    ...hospital,
    rating: hospital.rating || 4.2,
    totalReviews: hospital.totalReviews || 156,
    type: hospital.type || "private",
    specialties: hospital.specialties || [
      "Cardiology",
      "Orthopedics",
      "Neurology",
    ],
    verified: hospital.verified !== false,
    phone: hospital.phone || "+91-XXX-XXX-XXXX",
    emergencyAvailable: hospital.emergencyAvailable !== false,
    insuranceAccepted: hospital.insuranceAccepted || ["Cashless", "Mediclaim"],
    costRange: hospital.costRange || { min: 5000, max: 25000 },
    bedCount: hospital.bedCount || 150,
    availableBeds: hospital.availableBeds || 12,
  };

  // Load initial compare state from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("compareHospitals") || "[]");
    setSelectedForCompare(stored.includes(hospital.id));
  }, [hospital.id]);

  // Toggle hospital in compare list
  const toggleCompare = () => {
    const stored: string[] = JSON.parse(
      localStorage.getItem("compareHospitals") || "[]"
    );
    let updated: string[];

    if (stored.includes(hospital.id)) {
      updated = stored.filter((id) => id !== hospital.id);
      setSelectedForCompare(false);
    } else {
      if (stored.length >= 3) {
        alert("You can compare up to 3 hospitals only!");
        return;
      }
      updated = [...stored, hospital.id];
      setSelectedForCompare(true);
    }

    localStorage.setItem("compareHospitals", JSON.stringify(updated));
  };

  const handleViewDetails = () => {
    console.log(`Navigate to /Hospitals/${hospital.slug}`);
  };

  const getTypeColor = (type: string) => {
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarImage src={mockHospital.image} alt={mockHospital.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {mockHospital.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Link
                  href={`/Hospitals/${hospital.slug}`}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                >
                  {mockHospital.name}
                </Link>
                {mockHospital.verified && (
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center text-muted-foreground text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">
                  {mockHospital.city}, {mockHospital.state}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <div className="flex items-center flex-wrap">
                  {renderStars(mockHospital.rating!)}
                  <span className="ml-2 text-sm font-medium">
                    {mockHospital.rating}
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">
                    ({mockHospital.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Badge className={getTypeColor(mockHospital.type!)}>
            <Building2 className="h-3 w-3 mr-1" />
            {mockHospital.type?.charAt(0).toUpperCase() +
              mockHospital.type?.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {mockHospital.description}
        </p>

        {/* Specialties */}
        {mockHospital.specialties && mockHospital.specialties.length > 0 && (
          <div className="flex items-start gap-2 flex-wrap">
            <Stethoscope className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex gap-1 flex-wrap">
              {mockHospital.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {mockHospital.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{mockHospital.specialties.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Key Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Bed className="h-4 w-4 mr-2" />
            <span>
              {mockHospital.availableBeds}/{mockHospital.bedCount} beds
            </span>
          </div>
          {mockHospital.emergencyAvailable && (
            <div className="flex items-center text-green-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>24/7 Emergency</span>
            </div>
          )}
        </div>

        {/* Cost Range */}
        {mockHospital.costRange && (
          <div className="flex items-center text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4 mr-2" />
            <span>
              ₹{mockHospital.costRange.min.toLocaleString()} - ₹
              {mockHospital.costRange.max.toLocaleString()}
            </span>
          </div>
        )}

        {/* Insurance */}
        {mockHospital.insuranceAccepted &&
          mockHospital.insuranceAccepted.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Insurance:</span>
              {mockHospital.insuranceAccepted
                .slice(0, 2)
                .map((insurance, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {insurance}
                  </Badge>
                ))}
              {mockHospital.insuranceAccepted.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{mockHospital.insuranceAccepted.length - 2} more
                </span>
              )}
            </div>
          )}

        <Separator />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant={selectedForCompare ? "secondary" : "outline"}
            size="sm"
            onClick={toggleCompare}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            {selectedForCompare ? (
              <>
                <Check className="h-4 w-4" />
                Added to Compare
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Compare
              </>
            )}
          </Button>

          <Button
            size="sm"
            onClick={handleViewDetails}
            className="flex items-center gap-2 flex-1 sm:flex-none w-full sm:w-auto"
          >
            <Eye className="h-4 w-4" />
            View Details
          </Button>

          {mockHospital.phone && (
            <Button
              variant="outline"
              size="sm"
              className="px-3 w-full sm:w-auto flex justify-center"
            >
              <Phone className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
