"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StepPersonalInfo({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Personal Information</h2>
      <p className="text-muted-foreground">Tell us a little about yourself.</p>

      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            placeholder="Dr. John Doe"
            value={data.name || ""}
            onChange={(e) =>
              setData((prev: any) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select
            value={data.gender || ""}
            onValueChange={(val) =>
              setData((prev: any) => ({ ...prev, gender: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Profile Pic */}
        <div className="space-y-2">
          <Label>Profile Picture URL</Label>
          <Input
            placeholder="https://example.com/photo.jpg"
            value={data.profilePic || ""}
            onChange={(e) =>
              setData((prev: any) => ({
                ...prev,
                profilePic: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
