import React from "react";
import { Filters } from "../hooks/useFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Filter, Stethoscope, Globe, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorFiltersProps {
  filters: Filters;
  updateFilter: (key: keyof Filters, value: string | undefined) => void;
}

const DoctorFilters: React.FC<DoctorFiltersProps> = ({
  filters,
  updateFilter,
}) => {
  const clearFilter = (key: keyof Filters) => {
    updateFilter(key, undefined);
  };

  const hasActiveFilters = Object.values(filters).some((value) => value);

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="w-5 h-5" />
          Filter Doctors
        </CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              updateFilter("specialization", undefined);
              updateFilter("language", undefined);
              updateFilter("city", undefined);
            }}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            Clear All
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="specialization"
            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <Stethoscope className="w-4 h-4 text-purple-600" />
            Specialization
          </Label>
          <div className="relative">
            <Input
              id="specialization"
              type="text"
              value={filters.specialization || ""}
              onChange={(e) =>
                updateFilter("specialization", e.target.value || undefined)
              }
              placeholder="e.g., Cardiology, Dermatology..."
              className="pl-4 pr-10 border-gray-200 focus:border-purple-400 focus:ring-purple-400 transition-colors"
            />
            {filters.specialization && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearFilter("specialization")}
                className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          {filters.specialization && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700"
            >
              {filters.specialization}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="language"
            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <Globe className="w-4 h-4 text-blue-600" />
            Language
          </Label>
          <div className="relative">
            <Input
              id="language"
              type="text"
              value={filters.language || ""}
              onChange={(e) =>
                updateFilter("language", e.target.value || undefined)
              }
              placeholder="e.g., English, Hindi, Spanish..."
              className="pl-4 pr-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-colors"
            />
            {filters.language && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearFilter("language")}
                className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          {filters.language && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {filters.language}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="city"
            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <MapPin className="w-4 h-4 text-green-600" />
            City
          </Label>
          <div className="relative">
            <Input
              id="city"
              type="text"
              value={filters.city || ""}
              onChange={(e) =>
                updateFilter("city", e.target.value || undefined)
              }
              placeholder="e.g., Mumbai, Delhi, Bangalore..."
              className="pl-4 pr-10 border-gray-200 focus:border-green-400 focus:ring-green-400 transition-colors"
            />
            {filters.city && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearFilter("city")}
                className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          {filters.city && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {filters.city}
            </Badge>
          )}
        </div>

        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Filter className="w-3 h-3" />
              <span>Active filters applied</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorFilters;
