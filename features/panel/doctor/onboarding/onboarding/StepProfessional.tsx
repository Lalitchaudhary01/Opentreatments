"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function StepProfessional({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  const [specialty, setSpecialty] = useState("");
  const [language, setLanguage] = useState("");

  const specialties: string[] = data.specialties || [];
  const languages: string[] = data.languages || [];

  const addSpecialty = () => {
    if (!specialty.trim()) return;
    const updated = [...new Set([...specialties, specialty.trim()])];
    setData((prev: any) => ({ ...prev, specialties: updated }));
    setSpecialty("");
  };

  const removeSpecialty = (s: string) => {
    setData((prev: any) => ({
      ...prev,
      specialties: specialties.filter((x) => x !== s),
    }));
  };

  const addLanguage = () => {
    if (!language.trim()) return;
    const updated = [...new Set([...languages, language.trim()])];
    setData((prev: any) => ({ ...prev, languages: updated }));
    setLanguage("");
  };

  const removeLanguage = (l: string) => {
    setData((prev: any) => ({
      ...prev,
      languages: languages.filter((x) => x !== l),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Professional Details</h2>
      <p className="text-muted-foreground">
        Add your specialization and expertise.
      </p>

      {/* Primary Specialization */}
      <div className="space-y-2">
        <Label>Primary Specialization</Label>
        <Input
          placeholder="Cardiologist, Neurologist..."
          value={data.specialization || ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              specialization: e.target.value,
            }))
          }
        />
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <Label>Years of Experience</Label>
        <Input
          type="number"
          placeholder="5"
          value={data.experience || ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              experience: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
        />
      </div>

      {/* Sub Specialties */}
      <div className="space-y-2">
        <Label>Sub-Specialties</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSpecialty()}
          />
          <Button type="button" variant="outline" onClick={addSpecialty}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {specialties.map((s) => (
            <Badge key={s} variant="secondary">
              {s}
              <Button
                type="button"
                onClick={() => removeSpecialty(s)}
                className="ml-2"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-2">
        <Label>Languages</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addLanguage()}
          />
          <Button type="button" variant="outline" onClick={addLanguage}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {languages.map((l) => (
            <Badge key={l} variant="secondary">
              {l}
              <Button
                type="button"
                onClick={() => removeLanguage(l)}
                className="ml-2"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
