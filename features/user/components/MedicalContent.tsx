"use client";

import { useState } from "react";
import { Patient, Medication } from "../types/patient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  TrendingUp,
  FileText,
  Plus,
  Trash2,
  Edit3,
  Pill,
  AlertTriangle,
  Heart,
  Stethoscope,
  Users,
} from "lucide-react";

interface MedicalContentProps {
  patient: Patient;
  onUpdate: (data: any) => Promise<boolean>;
}

export default function MedicalContent({
  patient,
  onUpdate,
}: MedicalContentProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "Once daily",
    forCondition: "",
  });
  const [loading, setLoading] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const startEditing = (section: string) => {
    setEditingSection(section);
    setNewItem("");
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "Once daily",
      forCondition: "",
    });
  };

  const stopEditing = () => {
    setEditingSection(null);
    setNewItem("");
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "Once daily",
      forCondition: "",
    });
  };

  const addItem = async (section: keyof Patient) => {
    if (section === "medications") {
      if (newMedication.name.trim()) {
        setLoading(true);
        const newMed: Medication = {
          id: Date.now().toString(),
          name: newMedication.name,
          dosage: newMedication.dosage,
          frequency: newMedication.frequency,
          forCondition: newMedication.forCondition,
        };

        const success = await onUpdate({
          medications: [...patient.medications, newMed],
        });

        setLoading(false);
        if (success) {
          stopEditing();
        }
      }
    } else {
      if (newItem.trim()) {
        setLoading(true);
        const success = await onUpdate({
          [section]: [...(patient[section] as string[]), newItem],
        });

        setLoading(false);
        if (success) {
          setNewItem("");
          stopEditing();
        }
      }
    }
  };

  const removeItem = async (section: keyof Patient, index: number) => {
    setLoading(true);

    let updateData = {};
    if (section === "medications") {
      updateData = {
        medications: patient.medications.filter((_, i) => i !== index),
      };
    } else {
      updateData = {
        [section]: (patient[section] as string[]).filter((_, i) => i !== index),
      };
    }

    await onUpdate(updateData);
    setLoading(false);
  };

  const updateMedication = async (
    index: number,
    field: keyof Medication,
    value: string
  ) => {
    const updatedMedications = patient.medications.map((med, i) =>
      i === index ? { ...med, [field]: value } : med
    );

    setLoading(true);
    await onUpdate({ medications: updatedMedications });
    setLoading(false);
  };

  const sections = [
    {
      key: "conditions" as const,
      title: "Current Conditions",
      icon: TrendingUp,
      data: patient.conditions,
      description: "Chronic illnesses, diseases, or health conditions",
    },
    {
      key: "medications" as const,
      title: "Current Medications",
      icon: Pill,
      data: patient.medications,
      description: "Prescription and over-the-counter medications",
    },
    {
      key: "allergies" as const,
      title: "Allergies",
      icon: AlertTriangle,
      data: patient.allergies,
      description: "Drug, food, and environmental allergies",
    },
    {
      key: "pastSurgeries" as const,
      title: "Past Surgeries",
      icon: Stethoscope,
      data: patient.pastSurgeries,
      description: "Previous surgical procedures and operations",
    },
    {
      key: "familyHistory" as const,
      title: "Family History",
      icon: Users,
      data: patient.familyHistory,
      description: "Hereditary conditions and family medical history",
    },
  ];

  const frequencyOptions = [
    "Once daily",
    "Twice daily",
    "Three times daily",
    "Four times daily",
    "As needed",
    "Weekly",
    "Monthly",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Medical History
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage your complete medical profile and history
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={() => setExpandedSections(sections.map((s) => s.key))}
        >
          <Plus className="w-4 h-4 mr-2" />
          Expand All
        </Button>
      </div>

      {sections.map(({ key, title, icon: Icon, data, description }) => (
        <Card key={key} className="overflow-hidden">
          <CardContent className="p-0">
            {/* Section Header */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <button
                onClick={() => toggleSection(key)}
                className="flex items-center gap-3 text-left flex-1 group"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {title}
                    </span>
                    <Badge variant="secondary" className="ml-2">
                      {data.length}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
              </button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(key)}
                  disabled={loading}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSections.includes(key) ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Expanded Content */}
            {expandedSections.includes(key) && (
              <div className="border-t border-gray-200">
                {/* Add New Item Form */}
                {editingSection === key && (
                  <div className="p-4 bg-blue-50 border-b border-blue-100">
                    {key === "medications" ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                              Medication Name
                            </label>
                            <Input
                              value={newMedication.name}
                              onChange={(e) =>
                                setNewMedication((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              placeholder="e.g., Metformin 500mg"
                              disabled={loading}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                              Dosage
                            </label>
                            <Input
                              value={newMedication.dosage}
                              onChange={(e) =>
                                setNewMedication((prev) => ({
                                  ...prev,
                                  dosage: e.target.value,
                                }))
                              }
                              placeholder="e.g., 500mg"
                              disabled={loading}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                              Frequency
                            </label>
                            <Select
                              value={newMedication.frequency}
                              onValueChange={(value) =>
                                setNewMedication((prev) => ({
                                  ...prev,
                                  frequency: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {frequencyOptions.map((freq) => (
                                  <SelectItem key={freq} value={freq}>
                                    {freq}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                              For Condition
                            </label>
                            <Input
                              value={newMedication.forCondition}
                              onChange={(e) =>
                                setNewMedication((prev) => ({
                                  ...prev,
                                  forCondition: e.target.value,
                                }))
                              }
                              placeholder="e.g., Diabetes"
                              disabled={loading}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => addItem(key)}
                            disabled={loading || !newMedication.name.trim()}
                            size="sm"
                          >
                            {loading ? "Adding..." : "Add Medication"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={stopEditing}
                            disabled={loading}
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          value={newItem}
                          onChange={(e) => setNewItem(e.target.value)}
                          placeholder={`Add new ${title.toLowerCase()}`}
                          className="flex-1"
                          disabled={loading}
                        />
                        <Button
                          onClick={() => addItem(key)}
                          disabled={loading || !newItem.trim()}
                          size="sm"
                        >
                          {loading ? "Adding..." : "Add"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={stopEditing}
                          disabled={loading}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Items List */}
                <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group"
                      >
                        <div className="flex-1">
                          {key === "medications" ? (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">
                                  Name
                                </label>
                                <Input
                                  value={(item as Medication).name}
                                  onChange={(e) =>
                                    updateMedication(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Medication name"
                                  disabled={loading}
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">
                                  Dosage
                                </label>
                                <Input
                                  value={(item as Medication).dosage}
                                  onChange={(e) =>
                                    updateMedication(
                                      index,
                                      "dosage",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Dosage"
                                  disabled={loading}
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">
                                  Frequency
                                </label>
                                <Select
                                  value={(item as Medication).frequency}
                                  onValueChange={(value) =>
                                    updateMedication(index, "frequency", value)
                                  }
                                >
                                  <SelectTrigger className="h-8 text-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {frequencyOptions.map((freq) => (
                                      <SelectItem key={freq} value={freq}>
                                        {freq}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">
                                  For Condition
                                </label>
                                <Input
                                  value={(item as Medication).forCondition}
                                  onChange={(e) =>
                                    updateMedication(
                                      index,
                                      "forCondition",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Condition"
                                  disabled={loading}
                                  className="h-8 text-sm"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">
                                {item as string}
                              </span>
                            </div>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(key, index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        No {title.toLowerCase()} added yet.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Click the edit button to add new items
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Quick Actions */}
      <div className="flex gap-2 justify-center pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpandedSections([])}
          disabled={loading}
        >
          Collapse All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpandedSections(sections.map((s) => s.key))}
          disabled={loading}
        >
          Expand All
        </Button>
      </div>
    </div>
  );
}
