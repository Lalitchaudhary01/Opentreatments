"use client";

import { useState } from "react";
import { useConsultationBooking } from "../hooks/useConsultationBooking";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ConsultationBookingForm({
  doctorId,
  userId,
}: {
  doctorId: string;
  userId: string;
}) {
  const [slot, setSlot] = useState("");
  const [notes, setNotes] = useState("");

  const { book, loading, error, success } = useConsultationBooking({
    doctorId,
    userId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await book(new Date(slot), notes);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
      <div>
        <label className="block text-sm font-medium">Choose Slot</label>
        <Input
          type="datetime-local"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
          className="border rounded w-full p-2 mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Notes (optional)</label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border rounded w-full p-2 mt-1"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Booking..." : "Book Consultation"}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm">✅ Booking successful!</p>
      )}
    </form>
  );
}
