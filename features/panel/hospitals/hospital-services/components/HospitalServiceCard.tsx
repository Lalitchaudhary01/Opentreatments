"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HospitalService } from "../types/hospitalServices";

interface HospitalServiceCardProps {
  service: HospitalService;
  onEdit: (service: HospitalService) => void;
  onDelete: (id: string) => void;
}

export default function HospitalServiceCard({
  service,
  onEdit,
  onDelete,
}: HospitalServiceCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{service.name}</span>
          <span className="text-sm text-gray-600">₹{service.cost ?? 0}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          {service.description || "No description"}
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button size="sm" variant="outline" onClick={() => onEdit(service)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(service.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
