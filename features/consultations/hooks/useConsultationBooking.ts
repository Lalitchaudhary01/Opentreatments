"use client";

import { useState } from "react";
import { bookConsultation } from "../actions/bookConsultation";

interface UseConsultationBookingOptions {
  doctorId: string;
  userId: string;
}

export function useConsultationBooking({
  doctorId,
  userId,
}: UseConsultationBookingOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const book = async (slot: Date, notes?: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await bookConsultation({
        doctorId,
        userId,
        slot,
        notes,
      });

      if (!res.success) {
        setError(res.message || "Booking failed");
        return;
      }

      setSuccess(true);
      return res.consultation;
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return { book, loading, error, success };
}
