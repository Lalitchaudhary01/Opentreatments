import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";

interface Facility {
  name: string;
  description?: string;
}

interface Service {
  name: string;
  description?: string;
  cost?: number;
}

interface HospitalFormData {
  facilities: Facility[];
  services: Service[];
}

interface Step4Props {
  formData: HospitalFormData;
  onArrayAdd: (field: "facilities" | "services") => void;
  onArrayUpdate: (
    field: "facilities" | "services",
    index: number,
    key: string,
    value: any
  ) => void;
  onArrayRemove: (field: "facilities" | "services", index: number) => void;
}

export default function Step4FacilitiesServices({
  formData,
  onArrayAdd,
  onArrayUpdate,
  onArrayRemove,
}: Step4Props) {
  return (
    <div className="space-y-8">
      {/* Facilities */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Facilities</h3>
            <p className="text-sm text-muted-foreground">
              Available facilities at the hospital
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onArrayAdd("facilities")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Facility
          </Button>
        </div>

        <div className="space-y-3">
          {formData.facilities.map((facility, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={facility.name}
                  onChange={(e) =>
                    onArrayUpdate("facilities", index, "name", e.target.value)
                  }
                  placeholder="Facility name (e.g., ICU, Emergency Room)"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => onArrayRemove("facilities", index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={facility.description || ""}
                onChange={(e) =>
                  onArrayUpdate(
                    "facilities",
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Facility description (optional)"
                rows={2}
              />
            </div>
          ))}
          {formData.facilities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No facilities added yet. Click "Add Facility" to get started.
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Services</h3>
            <p className="text-sm text-muted-foreground">
              Medical services offered
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onArrayAdd("services")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>

        <div className="space-y-4">
          {formData.services.map((service, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={service.name}
                  onChange={(e) =>
                    onArrayUpdate("services", index, "name", e.target.value)
                  }
                  placeholder="Service name"
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={service.cost || ""}
                  onChange={(e) =>
                    onArrayUpdate(
                      "services",
                      index,
                      "cost",
                      parseInt(e.target.value) || null
                    )
                  }
                  placeholder="Cost (₹)"
                  className="w-32"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => onArrayRemove("services", index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={service.description || ""}
                onChange={(e) =>
                  onArrayUpdate(
                    "services",
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Service description (optional)"
                rows={2}
              />
            </div>
          ))}
          {formData.services.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No services added yet. Click "Add Service" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
