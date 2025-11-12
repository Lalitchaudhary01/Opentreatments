"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { MedicalProfile } from "../server/types";
// import { updateMedicalProfile, deleteHealthRecord } from "../server/actions";
import {
  Shield,
  ChevronDown,
  Edit3,
  Save,
  X,
  Upload,
  Eye,
  Trash2,
  FileText,
} from "lucide-react";
import { MedicalProfile } from "../types/medical-profile";
import { deleteHealthRecord, updateMedicalProfile } from "../actions/actions";

interface InsuranceRecordsSectionProps {
  profile: MedicalProfile;
  onUpdate: () => void;
}

export default function InsuranceRecordsSection({
  profile,
  onUpdate,
}: InsuranceRecordsSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    insuranceProvider: profile.insuranceProvider || "",
    policyNumber: profile.policyNumber || "",
    policyExpiry: profile.policyExpiry?.split("T")[0] || "",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateMedicalProfile(profile.userId, formData);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating insurance info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteHealthRecord(recordId);
      onUpdate();
    } catch (error) {
      console.error("Error deleting health record:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Insurance Card */}
      <Card className="rounded-xl p-5 bg-gradient-to-br from-primary/80 to-primary dark:from-primary/50 dark:to-primary/70 shadow-lg shadow-primary/30 backdrop-blur-md relative overflow-hidden border-0">
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full bg-white/10"></div>
        <CardContent className="relative z-10 p-0">
          <div className="flex justify-between items-start mb-4">
            <p className="text-white font-bold text-xl">
              {isEditing ? (
                <Input
                  value={formData.insuranceProvider}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      insuranceProvider: e.target.value,
                    })
                  }
                  className="text-white font-bold text-xl bg-white/20 border-white/30"
                  placeholder="Insurance Provider"
                />
              ) : (
                profile.insuranceProvider || "Add Insurance Provider"
              )}
            </p>
            <Shield className="text-white h-8 w-8" />
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-white text-sm opacity-80">
                  Policy Number
                </Label>
                <Input
                  value={formData.policyNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, policyNumber: e.target.value })
                  }
                  className="text-white font-semibold bg-white/20 border-white/30"
                  placeholder="Policy Number"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white text-sm opacity-80">
                  Policy Expiry
                </Label>
                <Input
                  type="date"
                  value={formData.policyExpiry}
                  onChange={(e) =>
                    setFormData({ ...formData, policyExpiry: e.target.value })
                  }
                  className="text-white font-semibold bg-white/20 border-white/30"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="text-white space-y-1">
                <p className="text-sm opacity-80">Policy Number</p>
                <p className="font-semibold tracking-wider">
                  {profile.policyNumber || "Not provided"}
                </p>
              </div>
              <div className="text-white mt-3">
                <p className="text-sm opacity-80">Policy Expiry</p>
                <p className="font-semibold tracking-wider">
                  {profile.policyExpiry
                    ? new Date(profile.policyExpiry).toLocaleDateString()
                    : "Not provided"}
                </p>
              </div>
            </>
          )}

          <div className="flex justify-end mt-4">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      insuranceProvider: profile.insuranceProvider || "",
                      policyNumber: profile.policyNumber || "",
                      policyExpiry: profile.policyExpiry?.split("T")[0] || "",
                    });
                  }}
                  className="text-white border-white"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="text-white border-white"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Medical Reports List */}
      <Card className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm shadow-primary/5">
        <CardContent className="p-0">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-dark-blue dark:text-white font-bold">
              Medical Reports
            </h4>
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </div>

          <div className="space-y-3">
            {profile.healthRecords.length > 0 ? (
              profile.healthRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-dark-blue dark:text-white text-sm font-medium">
                        {record.fileName}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {new Date(record.uploadDate).toLocaleDateString()} •
                        {(record.fileSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => window.open(record.fileUrl, "_blank")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteRecord(record.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No medical reports uploaded yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
