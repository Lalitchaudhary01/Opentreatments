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
  Plus,
  Trash2,
  Edit3,
  Pill,
  AlertTriangle,
  Heart,
  Stethoscope,
  Users,
  Save,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Ensure arrays are never null
  const safePatient = {
    ...patient,
    conditions: patient.conditions || [],
    allergies: patient.allergies || [],
    medications: patient.medications || [],
    pastSurgeries: patient.pastSurgeries || [],
    familyHistory: patient.familyHistory || [],
  };

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
          medications: [...safePatient.medications, newMed],
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
          [section]: [...(safePatient[section] as string[]), newItem],
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
        medications: safePatient.medications.filter((_, i) => i !== index),
      };
    } else {
      updateData = {
        [section]: (safePatient[section] as string[]).filter(
          (_, i) => i !== index
        ),
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
    const updatedMedications = safePatient.medications.map((med, i) =>
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
      data: safePatient.conditions,
      description: "Chronic illnesses, diseases, or health conditions",
      color: "from-cyan-500 to-teal-500",
    },
    {
      key: "medications" as const,
      title: "Current Medications",
      icon: Pill,
      data: safePatient.medications,
      description: "Prescription and over-the-counter medications",
      color: "from-blue-500 to-cyan-500",
    },
    {
      key: "allergies" as const,
      title: "Allergies",
      icon: AlertTriangle,
      data: safePatient.allergies,
      description: "Drug, food, and environmental allergies",
      color: "from-amber-500 to-orange-500",
    },
    {
      key: "pastSurgeries" as const,
      title: "Past Surgeries",
      icon: Stethoscope,
      data: safePatient.pastSurgeries,
      description: "Previous surgical procedures and operations",
      color: "from-purple-500 to-pink-500",
    },
    {
      key: "familyHistory" as const,
      title: "Family History",
      icon: Users,
      data: safePatient.familyHistory,
      description: "Hereditary conditions and family medical history",
      color: "from-emerald-500 to-teal-500",
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
          <motion.h3
            className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Medical History
          </motion.h3>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your complete medical profile and history
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={() => setExpandedSections(sections.map((s) => s.key))}
          className="border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Expand All
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map(
          ({ key, title, icon: Icon, data, description, color }) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  {/* Section Header */}
                  <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <button
                      onClick={() => toggleSection(key)}
                      className="flex items-center gap-3 text-left flex-1 group"
                    >
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {title}
                          </span>
                          <Badge className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-0">
                            {data.length}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {description}
                        </p>
                      </div>
                    </button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(key)}
                        disabled={loading}
                        className="opacity-60 hover:opacity-100 transition-opacity hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                      >
                        <Edit3 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </Button>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          expandedSections.includes(key) ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedSections.includes(key) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-200/50 dark:border-slate-700/50"
                      >
                        {/* Add New Item Form */}
                        {editingSection === key && (
                          <motion.div
                            className="p-4 bg-cyan-50/50 dark:bg-cyan-900/20 border-b border-cyan-200/50 dark:border-cyan-700/30"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {key === "medications" ? (
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
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
                                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
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
                                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
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
                                      <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-cyan-500">
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
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
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
                                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500"
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                  <Button
                                    onClick={() => addItem(key)}
                                    disabled={
                                      loading || !newMedication.name.trim()
                                    }
                                    size="sm"
                                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                                  >
                                    <Save className="w-4 h-4 mr-2" />
                                    {loading ? "Adding..." : "Add Medication"}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={stopEditing}
                                    disabled={loading}
                                    size="sm"
                                    className="border-slate-300 dark:border-slate-600"
                                  >
                                    <X className="w-4 h-4 mr-2" />
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
                                  className="flex-1 border-slate-300 dark:border-slate-600 focus:border-cyan-500"
                                  disabled={loading}
                                />
                                <Button
                                  onClick={() => addItem(key)}
                                  disabled={loading || !newItem.trim()}
                                  size="sm"
                                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  {loading ? "Adding..." : "Add"}
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={stopEditing}
                                  disabled={loading}
                                  size="sm"
                                  className="border-slate-300 dark:border-slate-600"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* Items List */}
                        <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                          {data.length > 0 ? (
                            data.map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-200 dark:hover:border-cyan-700/50 transition-colors group bg-white/50 dark:bg-slate-800/30"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <div className="flex-1">
                                  {key === "medications" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                      <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
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
                                          className="h-8 text-sm border-slate-200 dark:border-slate-600"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
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
                                          className="h-8 text-sm border-slate-200 dark:border-slate-600"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
                                          Frequency
                                        </label>
                                        <Select
                                          value={(item as Medication).frequency}
                                          onValueChange={(value) =>
                                            updateMedication(
                                              index,
                                              "frequency",
                                              value
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8 text-sm border-slate-200 dark:border-slate-600">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {frequencyOptions.map((freq) => (
                                              <SelectItem
                                                key={freq}
                                                value={freq}
                                              >
                                                {freq}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
                                          For Condition
                                        </label>
                                        <Input
                                          value={
                                            (item as Medication).forCondition
                                          }
                                          onChange={(e) =>
                                            updateMedication(
                                              index,
                                              "forCondition",
                                              e.target.value
                                            )
                                          }
                                          placeholder="Condition"
                                          disabled={loading}
                                          className="h-8 text-sm border-slate-200 dark:border-slate-600"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                      <span className="text-sm text-slate-700 dark:text-slate-300">
                                        {item as string}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(key, index)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  disabled={loading}
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-6">
                              <Icon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                No {title.toLowerCase()} added yet.
                              </p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                Click the edit button to add new items
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="flex gap-2 justify-center pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpandedSections([])}
          disabled={loading}
          className="border-slate-300 dark:border-slate-600"
        >
          Collapse All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpandedSections(sections.map((s) => s.key))}
          disabled={loading}
          className="border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
        >
          Expand All
        </Button>
      </motion.div>
    </div>
  );
}
