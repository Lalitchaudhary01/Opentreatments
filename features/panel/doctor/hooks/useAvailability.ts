"use client";

import { useState } from "react";

export type AvailabilityMap = Record<string, string>;

export function useAvailability(initial?: AvailabilityMap) {
  const [availability, setAvailability] = useState<AvailabilityMap>(
    initial || {}
  );

  const setDay = (day: string, time: string) => {
    setAvailability((prev) => {
      const next = { ...prev };
      if (time.trim()) {
        next[day.toLowerCase()] = time;
      } else {
        delete next[day.toLowerCase()];
      }
      return next;
    });
  };

  const clearAll = () => setAvailability({});

  const setAllDays = (time: string) => {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    const map: AvailabilityMap = {};
    days.forEach((d) => (map[d] = time));
    setAvailability(map);
  };

  return {
    availability,
    setDay,
    clearAll,
    setAllDays,
    hasAny: Object.keys(availability).length > 0,
  };
}
