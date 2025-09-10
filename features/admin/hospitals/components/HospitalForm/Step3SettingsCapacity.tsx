import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface HospitalFormData {
  verified: boolean;
  emergencyAvailable: boolean;
  bedCount: number;
  availableBeds: number;
  rating: number;
  totalReviews: number;
}

interface Step3Props {
  formData: HospitalFormData;
  onChange: (field: string, value: any) => void;
}

export default function Step3SettingsCapacity({
  formData,
  onChange,
}: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <Label htmlFor="verified" className="text-sm font-medium">
              Verified Hospital
            </Label>
            <p className="text-xs text-muted-foreground">
              Mark as verified and trusted
            </p>
          </div>
          <Switch
            id="verified"
            checked={formData.verified}
            onCheckedChange={(checked) => onChange("verified", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <Label htmlFor="emergency" className="text-sm font-medium">
              24/7 Emergency Services
            </Label>
            <p className="text-xs text-muted-foreground">
              Available for emergency cases
            </p>
          </div>
          <Switch
            id="emergency"
            checked={formData.emergencyAvailable}
            onCheckedChange={(checked) =>
              onChange("emergencyAvailable", checked)
            }
          />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bedCount">Total Beds</Label>
          <Input
            id="bedCount"
            type="number"
            value={formData.bedCount || ""}
            onChange={(e) =>
              onChange("bedCount", parseInt(e.target.value) || 0)
            }
            placeholder="100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="availableBeds">Available Beds</Label>
          <Input
            id="availableBeds"
            type="number"
            value={formData.availableBeds || ""}
            onChange={(e) =>
              onChange("availableBeds", parseInt(e.target.value) || 0)
            }
            placeholder="25"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rating">Average Rating</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating || ""}
            onChange={(e) =>
              onChange("rating", parseFloat(e.target.value) || 0)
            }
            placeholder="4.5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalReviews">Total Reviews</Label>
          <Input
            id="totalReviews"
            type="number"
            value={formData.totalReviews || ""}
            onChange={(e) =>
              onChange("totalReviews", parseInt(e.target.value) || 0)
            }
            placeholder="150"
          />
        </div>
      </div>
    </div>
  );
}
