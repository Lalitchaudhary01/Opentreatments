// /features/doctors/components/AvailabilityCalendar.tsx
import React from "react";
import { AvailabilitySlot } from "../types/IndependentDoctor";

interface AvailabilityCalendarProps {
  availability: AvailabilitySlot[];
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  availability,
}) => {
  if (!availability || availability.length === 0) {
    return (
      <p className="text-gray-500">No availability information provided.</p>
    );
  }

  return (
    <div className="space-y-2">
      {availability.map((slot, index) => (
        <div
          key={index}
          className="flex justify-between bg-gray-100 p-2 rounded"
        >
          <span>{slot.day}</span>
          <span>
            {slot.startTime} - {slot.endTime}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AvailabilityCalendar;
