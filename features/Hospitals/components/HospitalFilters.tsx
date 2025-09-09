"use client";
import { useState } from "react";
import {
  Search,
  MapPin,
  Stethoscope,
  Building2,
  Bed,
  DollarSign,
  Star,
  Shield,
  CreditCard,
  X,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock useFilters hook for demo
const useFilters = () => {
  const [filters, setFilters] = useState({});

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  return { filters, updateFilter, resetFilters };
};

export default function HospitalFilters() {
  const { filters, updateFilter, resetFilters } = useFilters();
  const [isOpen, setIsOpen] = useState(true);

  // Local state for all filters
  const [location, setLocation] = useState(filters.location || "");
  const [procedure, setProcedure] = useState(filters.procedure || "");
  const [hospitalType, setHospitalType] = useState(filters.hospitalType || "");
  const [bedType, setBedType] = useState(filters.bedType || "");
  const [costRange, setCostRange] = useState(filters.costRange || [0]);
  const [rating, setRating] = useState(filters.rating || 0);
  const [transparencyBadge, setTransparencyBadge] = useState(
    filters.transparencyBadge || false
  );
  const [insuranceAccepted, setInsuranceAccepted] = useState(
    filters.insuranceAccepted || ""
  );

  const applyFilters = () => {
    updateFilter("location", location);
    updateFilter("procedure", procedure);
    updateFilter("hospitalType", hospitalType);
    updateFilter("bedType", bedType);
    updateFilter("costRange", costRange);
    updateFilter("rating", rating);
    updateFilter("transparencyBadge", transparencyBadge);
    updateFilter("insuranceAccepted", insuranceAccepted);
  };

  const handleReset = () => {
    setLocation("");
    setProcedure("");
    setHospitalType("");
    setBedType("");
    setCostRange([0]);
    setRating(0);
    setTransparencyBadge(false);
    setInsuranceAccepted("");
    resetFilters();
  };

  const activeFiltersCount = [
    location,
    procedure,
    hospitalType,
    bedType,
    costRange[0] > 0 ? costRange : null,
    rating,
    transparencyBadge,
    insuranceAccepted,
  ].filter(Boolean).length;

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-20 z-50" // Changed from top-4 to top-20 to avoid header
        size="icon"
        variant="outline"
      >
        <Filter className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-background border-r shadow-lg z-40">
      {/* Changed from top-0 to top-16 and adjusted height */}
      <ScrollArea className="h-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Location */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter city or area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Procedure */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Stethoscope className="h-4 w-4" />
                  Procedure/Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={procedure} onValueChange={setProcedure}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select procedure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="surgery">General Surgery</SelectItem>
                    <SelectItem value="emergency">Emergency Care</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Hospital Type */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4" />
                  Hospital Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={hospitalType}
                  onValueChange={setHospitalType}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="government" id="government" />
                    <Label htmlFor="government">Government</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="semi-private" id="semi-private" />
                    <Label htmlFor="semi-private">Semi-Private</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Bed Type */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Bed className="h-4 w-4" />
                  Bed Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={bedType} onValueChange={setBedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any bed type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Ward</SelectItem>
                    <SelectItem value="private">Private Room</SelectItem>
                    <SelectItem value="semi-private">Semi-Private</SelectItem>
                    <SelectItem value="icu">ICU</SelectItem>
                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Cost Range */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4" />
                  Average Cost Range
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="px-3">
                  <Slider
                    value={costRange}
                    onValueChange={setCostRange}
                    max={100000}
                    step={1000}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹0</span>
                  <span>₹{costRange[0].toLocaleString()}</span>
                  <span>₹1L+</span>
                </div>
              </CardContent>
            </Card>

            {/* Rating */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4" />
                  Minimum Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      onClick={() => setRating(star)}
                      className={`p-1 h-auto ${
                        rating >= star
                          ? "text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </Button>
                  ))}
                </div>
                {rating > 0 && (
                  <Badge variant="secondary" className="mt-2">
                    {rating}+ stars
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Transparency Badge */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="transparency"
                    checked={transparencyBadge}
                    onCheckedChange={setTransparencyBadge}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="transparency"
                      className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <Shield className="h-4 w-4 text-green-600" />
                      Transparency Badge
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Hospitals with verified pricing and quality data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insurance Accepted */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4" />
                  Insurance Accepted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={insuranceAccepted}
                  onValueChange={setInsuranceAccepted}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any insurance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cashless">Cashless Available</SelectItem>
                    <SelectItem value="mediclaim">Mediclaim</SelectItem>
                    <SelectItem value="esic">ESIC</SelectItem>
                    <SelectItem value="cghs">CGHS</SelectItem>
                    <SelectItem value="ayushman">Ayushman Bharat</SelectItem>
                    <SelectItem value="private">Private Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-6" />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={applyFilters} className="w-full" size="lg">
              Apply Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Reset All
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
