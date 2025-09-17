"use client";

import { useState, useTransition } from "react";
import { bookConsultation } from "../actions/bookConsultation";

export default function BookConsultationForm({
  doctorId,
}: {
  doctorId: string;
}) {
  const [slot, setSlot] = useState("");
  const [duration, setDuration] = useState(30);
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await bookConsultation({ doctorId, slot, duration, mode, notes });
      setSuccess(true);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-4 rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold">Book a Consultation</h3>

      {success && (
        <p className="text-green-600 text-sm">
          ✅ Consultation booked successfully!
        </p>
      )}

      <div>
        <label className="block text-sm font-medium">Select Date & Time</label>
        <input
          type="datetime-local"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "online" | "offline")}
          className="mt-1 w-full border rounded px-3 py-2"
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Booking..." : "Book Consultation"}
      </button>
    </form>
  );
}
