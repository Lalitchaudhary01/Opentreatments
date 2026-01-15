"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Video } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button className="bg-[#00C6D2] text-white px-6 py-3">
        <Calendar className="w-5 h-5 mr-2" />
        Book Appointment
      </Button>

      <Button
        variant="outline"
        className="border-[#00C6D2] text-[#00C6D2] px-6 py-3"
      >
        <Video className="w-5 h-5 mr-2" />
        Video Consult
      </Button>
    </div>
  );
}
