import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";

interface Procedure {
  name: string;
  description?: string;
  cost?: number;
  duration?: string;
}

interface Insurance {
  name: string;
  provider?: string;
  cashless: boolean;
}

interface HospitalFormData {
  procedures: Procedure[];
  insurances: Insurance[];
}

interface Step6Props {
  formData: HospitalFormData;
  onArrayAdd: (field: "procedures" | "insurances") => void;
  onArrayUpdate: (
    field: "procedures" | "insurances",
    index: number,
    key: string,
    value: any
  ) => void;
  onArrayRemove: (field: "procedures" | "insurances", index: number) => void;
}

export default function Step6ProceduresInsurance({
  formData,
  onArrayAdd,
  onArrayUpdate,
  onArrayRemove,
}: Step6Props) {
  return (
    <div className="space-y-8">
      {/* Procedures */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Medical Procedures</h3>
            <p className="text-sm text-muted-foreground">
              Available medical procedures
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onArrayAdd("procedures")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Procedure
          </Button>
        </div>

        <div className="space-y-4">
          {formData.procedures.map((procedure, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  value={procedure.name}
                  onChange={(e) =>
                    onArrayUpdate("procedures", index, "name", e.target.value)
                  }
                  placeholder="Procedure name"
                />
                <Input
                  type="number"
                  value={procedure.cost || ""}
                  onChange={(e) =>
                    onArrayUpdate(
                      "procedures",
                      index,
                      "cost",
                      parseInt(e.target.value) || null
                    )
                  }
                  placeholder="Cost (₹)"
                />
                <div className="flex gap-2">
                  <Input
                    value={procedure.duration || ""}
                    onChange={(e) =>
                      onArrayUpdate(
                        "procedures",
                        index,
                        "duration",
                        e.target.value
                      )
                    }
                    placeholder="Duration (e.g., 2 hours)"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onArrayRemove("procedures", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={procedure.description || ""}
                onChange={(e) =>
                  onArrayUpdate(
                    "procedures",
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Procedure description (optional)"
                rows={2}
              />
            </div>
          ))}
          {formData.procedures.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No procedures added yet.
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Insurance */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Insurance Partners</h3>
            <p className="text-sm text-muted-foreground">
              Accepted insurance providers
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onArrayAdd("insurances")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Insurance
          </Button>
        </div>

        <div className="space-y-4">
          {formData.insurances.map((insurance, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={insurance.name}
                  onChange={(e) =>
                    onArrayUpdate("insurances", index, "name", e.target.value)
                  }
                  placeholder="Insurance company name"
                />
                <div className="flex gap-2">
                  <Input
                    value={insurance.provider || ""}
                    onChange={(e) =>
                      onArrayUpdate(
                        "insurances",
                        index,
                        "provider",
                        e.target.value
                      )
                    }
                    placeholder="Provider/Network"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onArrayRemove("insurances", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={insurance.cashless}
                  onCheckedChange={(checked) =>
                    onArrayUpdate("insurances", index, "cashless", checked)
                  }
                />
                <Label>Cashless treatment available</Label>
              </div>
            </div>
          ))}
          {formData.insurances.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No insurance partners added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
