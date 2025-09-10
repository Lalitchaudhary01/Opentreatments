import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Users } from "lucide-react";

interface Doctor {
  name: string;
  specialization: string;
  experience?: number;
  profilePic?: string;
}

interface HospitalFormData {
  doctors: Doctor[];
}

interface Step5Props {
  formData: HospitalFormData;
  onArrayAdd: (field: "doctors") => void;
  onArrayUpdate: (
    field: "doctors",
    index: number,
    key: string,
    value: any
  ) => void;
  onArrayRemove: (field: "doctors", index: number) => void;
}

export default function Step5MedicalStaff({
  formData,
  onArrayAdd,
  onArrayUpdate,
  onArrayRemove,
}: Step5Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium">Medical Staff</h3>
          <p className="text-sm text-muted-foreground">
            Doctors and specialists at the hospital
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onArrayAdd("doctors")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Doctor
        </Button>
      </div>

      <div className="space-y-4">
        {formData.doctors.map((doctor, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Doctor Name</Label>
                <Input
                  value={doctor.name}
                  onChange={(e) =>
                    onArrayUpdate("doctors", index, "name", e.target.value)
                  }
                  placeholder="Dr. John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label>Specialization</Label>
                <Input
                  value={doctor.specialization}
                  onChange={(e) =>
                    onArrayUpdate(
                      "doctors",
                      index,
                      "specialization",
                      e.target.value
                    )
                  }
                  placeholder="Cardiology, Neurology, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Experience (Years)</Label>
                <Input
                  type="number"
                  value={doctor.experience || ""}
                  onChange={(e) =>
                    onArrayUpdate(
                      "doctors",
                      index,
                      "experience",
                      parseInt(e.target.value) || null
                    )
                  }
                  placeholder="10"
                />
              </div>
              <div className="space-y-2">
                <Label>Profile Picture URL</Label>
                <Input
                  value={doctor.profilePic || ""}
                  onChange={(e) =>
                    onArrayUpdate(
                      "doctors",
                      index,
                      "profilePic",
                      e.target.value
                    )
                  }
                  placeholder="https://example.com/doctor.jpg"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onArrayRemove("doctors", index)}
              >
                <X className="h-4 w-4 mr-2" />
                Remove Doctor
              </Button>
            </div>
          </div>
        ))}
        {formData.doctors.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No doctors added yet. Click "Add Doctor" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
