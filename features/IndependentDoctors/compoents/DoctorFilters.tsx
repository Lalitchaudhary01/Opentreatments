// /features/doctors/components/DoctorFilters.tsx
import React from "react";
import { Filters } from "../hooks/useFilters";

interface DoctorFiltersProps {
  filters: Filters;
  updateFilter: (key: keyof Filters, value: string | undefined) => void;
}

const DoctorFilters: React.FC<DoctorFiltersProps> = ({
  filters,
  updateFilter,
}) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Specialization
        </label>
        <input
          type="text"
          value={filters.specialization || ""}
          onChange={(e) =>
            updateFilter("specialization", e.target.value || undefined)
          }
          placeholder="Enter specialization"
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Language
        </label>
        <input
          type="text"
          value={filters.language || ""}
          onChange={(e) =>
            updateFilter("language", e.target.value || undefined)
          }
          placeholder="Enter language"
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          value={filters.city || ""}
          onChange={(e) => updateFilter("city", e.target.value || undefined)}
          placeholder="Enter city"
          className="w-full mt-1 p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default DoctorFilters;
