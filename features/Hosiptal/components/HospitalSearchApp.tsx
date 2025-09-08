"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Shield,
  Calendar,
  Filter,
  X,
  CheckCircle,
  Phone,
} from "lucide-react"; // Import your Header component
import Header from "@/components/layout/Header";

// Type Definitions
interface Hospital {
  id: number;
  name: string;
  location: string;
  rating: number;
  priceRange: string;
  priceConfidence: number;
  logo: string;
  type: "Government" | "Private";
  badges: string[];
  hasTransparencyBadge: boolean;
  features: string[];
  phone: string;
}

interface Procedure {
  value: string;
  label: string;
}

interface Filters {
  location: string;
  procedure: string;
  hospitalType: string[];
  bedType: string;
  priceRange: [number, number];
  rating: number;
  transparencyBadge: boolean;
  insurance: string[];
}

type BedType = "general-ward" | "private-room" | "semi-private" | "icu";
type HospitalType = "government" | "private";

interface FilterSectionProps {
  className?: string;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  showMobileFilters: boolean;
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>;
  procedures: Procedure[];
  locations: string[];
  insuranceOptions: string[];
}

interface HospitalCardProps {
  hospital: Hospital;
  selectedProcedure: string;
  procedures: Procedure[];
  onCompareToggle: (hospital: Hospital) => void;
  isSelected: boolean;
}

interface CompareDrawerProps {
  selectedHospitals: Hospital[];
  onRemoveHospital: (hospital: Hospital) => void;
}

const HospitalSearchApp: React.FC = () => {
  const [selectedHospitals, setSelectedHospitals] = useState<Hospital[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    location: "",
    procedure: "knee-replacement",
    hospitalType: [],
    bedType: "general-ward",
    priceRange: [0, 500000],
    rating: 0,
    transparencyBadge: false,
    insurance: [],
  });

  const hospitals: Hospital[] = [
    {
      id: 1,
      name: "Global Health Hospital",
      location: "Jubilee Hills, Hyderabad",
      rating: 4.8,
      priceRange: "₹1,80,000 - ₹2,50,000",
      priceConfidence: 95,
      logo: "GH",
      type: "Private",
      badges: ["Transparency Badge"],
      hasTransparencyBadge: true,
      features: ["Cashless available", "ICU", "24×7"],
      phone: "+91 40 1234 5678",
    },
    {
      id: 2,
      name: "Citycare Medical Center",
      location: "Banjara Hills, Hyderabad",
      rating: 4.6,
      priceRange: "₹2,00,000 - ₹2,70,000",
      priceConfidence: 92,
      logo: "CM",
      type: "Private",
      badges: [],
      hasTransparencyBadge: false,
      features: ["Cashless available", "ICU", "24×7"],
      phone: "+91 40 2345 6789",
    },
    {
      id: 3,
      name: "Apollo Healthcare",
      location: "HITEC City, Hyderabad",
      rating: 4.9,
      priceRange: "₹2,50,000 - ₹3,20,000",
      priceConfidence: 98,
      logo: "AH",
      type: "Private",
      badges: ["Transparency Badge"],
      hasTransparencyBadge: true,
      features: ["Cashless available", "ICU", "24×7"],
      phone: "+91 40 3456 7890",
    },
  ];

  const procedures: Procedure[] = [
    { value: "knee-replacement", label: "Knee Replacement" },
    { value: "heart-surgery", label: "Heart Surgery" },
    { value: "cataract", label: "Cataract Surgery" },
    { value: "hip-replacement", label: "Hip Replacement" },
  ];

  const locations: string[] = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
  ];

  const insuranceOptions: string[] = [
    "Star Health",
    "HDFC Ergo",
    "ICICI Lombard",
    "Max Bupa",
    "Bajaj Allianz",
  ];

  const bedTypes: Array<{ value: BedType; label: string }> = [
    { value: "general-ward", label: "General Ward" },
    { value: "private-room", label: "Private Room" },
    { value: "semi-private", label: "Semi Private" },
    { value: "icu", label: "ICU" },
  ];

  const handleCompareToggle = (hospital: Hospital): void => {
    setSelectedHospitals((prev) => {
      const exists = prev.find((h) => h.id === hospital.id);
      if (exists) {
        return prev.filter((h) => h.id !== hospital.id);
      } else if (prev.length < 3) {
        return [...prev, hospital];
      }
      return prev;
    });
  };

  const handleRemoveFromCompare = (hospital: Hospital): void => {
    setSelectedHospitals((prev) => prev.filter((h) => h.id !== hospital.id));
  };

  const handleFilterChange = <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ): void => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const FilterSection: React.FC<FilterSectionProps> = ({
    className = "",
    filters,
    setFilters,
    showMobileFilters,
    setShowMobileFilters,
    procedures,
    locations,
    insuranceOptions,
  }) => (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-sky-600" />
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        </div>
        {showMobileFilters && (
          <button
            onClick={() => setShowMobileFilters(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        >
          <option value="">Select City</option>
          {locations.map((city) => (
            <option key={city} value={city.toLowerCase()}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Procedure Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Procedure
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          value={filters.procedure}
          onChange={(e) => handleFilterChange("procedure", e.target.value)}
        >
          {procedures.map((proc) => (
            <option key={proc.value} value={proc.value}>
              {proc.label}
            </option>
          ))}
        </select>
      </div>

      {/* Hospital Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Hospital Type
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              onChange={(e) => {
                const newTypes = e.target.checked
                  ? [...filters.hospitalType, "government"]
                  : filters.hospitalType.filter(
                      (type) => type !== "government"
                    );
                handleFilterChange("hospitalType", newTypes);
              }}
            />
            <span className="ml-2 text-sm text-gray-600">Government</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              defaultChecked
              onChange={(e) => {
                const newTypes = e.target.checked
                  ? [...filters.hospitalType, "private"]
                  : filters.hospitalType.filter((type) => type !== "private");
                handleFilterChange("hospitalType", newTypes);
              }}
            />
            <span className="ml-2 text-sm text-gray-600">Private</span>
          </label>
        </div>
      </div>

      {/* Bed Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bed Type
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          value={filters.bedType}
          onChange={(e) =>
            handleFilterChange("bedType", e.target.value as BedType)
          }
        >
          {bedTypes.map((bed) => (
            <option key={bed.value} value={bed.value}>
              {bed.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Avg Cost Range
        </label>
        <div className="px-3 py-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}+</span>
          </div>
          <input
            type="range"
            min="0"
            max="500000"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange("priceRange", [
                filters.priceRange[0],
                parseInt(e.target.value),
              ])
            }
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Ratings
        </label>
        <div className="flex gap-1 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer hover:scale-110 transition-transform ${
                star <= filters.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
              onClick={() => handleFilterChange("rating", star)}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {filters.rating > 0 ? `${filters.rating}.0 Up` : "Any"}
          </span>
        </div>
      </div>

      {/* Transparency Badge */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
            checked={filters.transparencyBadge}
            onChange={(e) =>
              handleFilterChange("transparencyBadge", e.target.checked)
            }
          />
          <Shield className="w-4 h-4 ml-2 text-blue-500" />
          <span className="ml-1 text-sm text-gray-600">Transparency Badge</span>
        </label>
      </div>

      {/* Insurance */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Insurance Accepted
        </label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {insuranceOptions.map((insurance) => (
            <label key={insurance} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                onChange={(e) => {
                  const newInsurance = e.target.checked
                    ? [...filters.insurance, insurance]
                    : filters.insurance.filter((ins) => ins !== insurance);
                  handleFilterChange("insurance", newInsurance);
                }}
              />
              <span className="ml-2 text-sm text-gray-600">{insurance}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const HospitalCard: React.FC<HospitalCardProps> = ({
    hospital,
    selectedProcedure,
    procedures,
    onCompareToggle,
    isSelected,
  }) => {
    const selectedProcedureLabel =
      procedures.find((p) => p.value === selectedProcedure)?.label ||
      "Treatment";

    return (
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
        <div className="p-6">
          {/* Hospital Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {hospital.logo}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {hospital.name}
              </h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {hospital.location}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(hospital.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-1 text-sm font-medium text-gray-700">
                {hospital.rating}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-1">
              Avg. cost for {selectedProcedureLabel}:
            </div>
            <div className="text-2xl font-bold text-emerald-700 mb-2">
              {hospital.priceRange}
            </div>

            {/* Transparency Badge & Price Confidence */}
            <div className="flex items-center gap-3 mb-3">
              {hospital.hasTransparencyBadge && (
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-blue-600 font-medium">
                    Transparency Badge
                  </span>
                </div>
              )}
              <div className="flex items-center text-sm text-emerald-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                {hospital.priceConfidence}% price confidence
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {hospital.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-200"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
              View Details
            </button>
            <button
              onClick={() => onCompareToggle(hospital)}
              className={`px-4 py-3 rounded-lg font-medium border-2 transition-colors duration-200 ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {isSelected ? "✓ Added" : "Add to Compare"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Compare Drawer
  const CompareDrawer: React.FC<CompareDrawerProps> = ({
    selectedHospitals,
    onRemoveHospital,
  }) => {
    if (selectedHospitals.length === 0) return null;

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">
                Compare Hospitals ({selectedHospitals.length}/3)
              </span>
              <div className="flex gap-2">
                {selectedHospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-sky-400 to-sky-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      {hospital.logo}
                    </div>
                    <span className="text-sm font-medium">
                      {hospital.name.split(" ")[0]}
                    </span>
                    <button
                      onClick={() => onRemoveHospital(hospital)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label={`Remove ${hospital.name} from comparison`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedHospitals.length >= 2
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={selectedHospitals.length < 2}
            >
              Compare Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getFilteredHospitals = (): Hospital[] => {
    return hospitals.filter((hospital) => {
      // Apply filters here based on the filters state
      if (filters.transparencyBadge && !hospital.hasTransparencyBadge) {
        return false;
      }
      if (filters.rating > 0 && hospital.rating < filters.rating) {
        return false;
      }
      // Add more filter logic as needed
      return true;
    });
  };

  const filteredHospitals = getFilteredHospitals();
  const selectedProcedureLabel =
    procedures.find((p) => p.value === filters.procedure)?.label || "Treatment";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hospitals, procedures, or locations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 text-sky-600 border border-sky-600 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white overflow-y-auto">
            <FilterSection
              filters={filters}
              setFilters={setFilters}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
              procedures={procedures}
              locations={locations}
              insuranceOptions={insuranceOptions}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <FilterSection
              filters={filters}
              setFilters={setFilters}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
              procedures={procedures}
              locations={locations}
              insuranceOptions={insuranceOptions}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedProcedureLabel} in Hyderabad (
                {filteredHospitals.length} hospitals)
              </h2>
              <button className="text-sky-600 hover:text-sky-700 font-medium">
                Modify Search
              </button>
            </div>

            {/* Hospital Cards */}
            {filteredHospitals.length > 0 ? (
              <div className="space-y-6">
                {filteredHospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.id}
                    hospital={hospital}
                    selectedProcedure={filters.procedure}
                    procedures={procedures}
                    onCompareToggle={handleCompareToggle}
                    isSelected={selectedHospitals.some(
                      (h) => h.id === hospital.id
                    )}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  No exact match found
                </p>
                <p className="text-gray-600 mb-6">
                  Widen your location or choose a related procedure to see more
                  results.
                </p>
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium">
                  Modify Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compare Drawer */}
      <CompareDrawer
        selectedHospitals={selectedHospitals}
        onRemoveHospital={handleRemoveFromCompare}
      />

      {/* Bottom padding to account for compare drawer */}
      {selectedHospitals.length > 0 && <div className="h-20"></div>}
    </div>
  );
};

export default HospitalSearchApp;