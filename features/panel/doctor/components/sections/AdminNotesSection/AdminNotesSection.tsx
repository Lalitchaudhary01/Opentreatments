"use client";

import { DoctorProfile } from "@/features/panel/doctor/types";
import { Shield, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminNotesSection({
  profile,
}: {
  profile: DoctorProfile;
}) {
  // Future me yahan adminNotes / remarks DB se aa sakte hain
  const notes =
    (profile as any)?.adminNotes ||
    "No admin notes available for this profile.";

  return (
    <Card className="p-6 rounded-2xl shadow-sm border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-orange-800">
          <Shield className="w-5 h-5" />
          Admin Notes
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-orange-900 leading-relaxed">{notes}</p>
        </div>

        <p className="text-xs text-orange-700">
          This section is visible only to administrators.
        </p>
      </CardContent>
    </Card>
  );
}
