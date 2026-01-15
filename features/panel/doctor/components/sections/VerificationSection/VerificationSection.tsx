"use client";

import { DoctorProfile, DoctorStatus } from "@/features/panel/doctor/types/";
import { AlertCircle, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerificationSection({
  profile,
}: {
  profile: DoctorProfile;
}) {
  const status = profile.status;

  const config: Record<
    DoctorStatus,
    {
      title: string;
      message: string;
      icon: React.ReactNode;
      className: string;
    }
  > = {
    APPROVED: {
      title: "Profile Approved",
      message:
        "Your profile is live and visible to patients. You can now receive bookings.",
      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
      className: "border-green-300 bg-green-50",
    },
    PENDING: {
      title: "Profile Under Review",
      message:
        "Our admin team is reviewing your profile. You’ll be notified once it’s approved.",
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      className: "border-orange-300 bg-orange-50",
    },
    REJECTED: {
      title: "Profile Rejected",
      message:
        "Your profile was rejected. Please update the required details and resubmit.",
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      className: "border-red-300 bg-red-50",
    },
    // INACTIVE: {
    //   title: "Profile Inactive",
    //   message:
    //     "Your profile is currently inactive. Contact support to activate it.",
    //   icon: <AlertCircle className="w-6 h-6 text-slate-600" />,
    //   className: "border-slate-300 bg-slate-50",
    // },
  };

  const current = config[status];

  return (
    <Card className={`p-6 rounded-2xl shadow-sm border-2 ${current.className}`}>
      <CardHeader className="p-0 mb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          {current.icon}
          {current.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">{current.message}</p>
      </CardContent>
    </Card>
  );
}
