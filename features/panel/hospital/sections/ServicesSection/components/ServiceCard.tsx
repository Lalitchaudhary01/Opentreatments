"use client";

import { Service } from "../types";

export default function ServiceCard({
  service,
  onEdit,
}: {
  service: Service;
  onEdit?: (s: Service) => void;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{service.name}</h3>
          {service.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {service.description}
            </p>
          )}
        </div>
        {service.cost != null && (
          <span className="text-sm font-medium">₹{service.cost}</span>
        )}
      </div>

      {onEdit && (
        <button
          onClick={() => onEdit(service)}
          className="mt-3 text-sm text-cyan-600 hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}
