"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateConsultationStatus } from "../actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Stethoscope,
  AlertCircle,
} from "lucide-react";
import { DoctorConsultation } from "../types";
import { ConsultationStatus } from "@prisma/client";

interface DoctorConsultationCardProps {
  consultation: DoctorConsultation;
}

export default function DoctorConsultationCard({
  consultation,
}: DoctorConsultationCardProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = (status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      await updateConsultationStatus(consultation.id, status);

      if (status === "APPROVED") {
        const consultationDate = new Date(consultation.slot);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isToday =
          consultationDate >= today &&
          consultationDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);

        router.push(
          isToday
            ? "/doctor/consultations/today"
            : "/doctor/consultations/approved"
        );
      } else {
        router.push("/doctor/consultations/rejected");
      }

      router.refresh();
    });
  };

  const statusConfig: Record<
    ConsultationStatus,
    {
      icon: any;
      color: string;
      bgGradient: string;
      iconBg: string;
      iconColor: string;
    }
  > = {
    PENDING: {
      icon: Clock,
      color: "bg-orange-100 text-orange-700 border-orange-200",
      bgGradient: "from-orange-50 to-amber-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    APPROVED: {
      icon: CheckCircle,
      color: "bg-teal-100 text-teal-700 border-teal-200",
      bgGradient: "from-teal-50 to-cyan-50",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    REJECTED: {
      icon: XCircle,
      color: "bg-red-100 text-red-700 border-red-200",
      bgGradient: "from-red-50 to-pink-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },

    // Extra statuses handled safely
    COMPLETED: {
      icon: CheckCircle,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      bgGradient: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    CANCELLED: {
      icon: XCircle,
      color: "bg-gray-100 text-gray-700 border-gray-200",
      bgGradient: "from-gray-50 to-slate-50",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  };

  const config = statusConfig[consultation.status];
  const StatusIcon = config.icon;

  return (
    <Card className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-cyan-300">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
            >
              <StatusIcon className={`w-7 h-7 ${config.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {consultation.userName || "Anonymous User"}
              </h3>
              <a
                href={`mailto:${consultation.userEmail}`}
                className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 font-medium"
              >
                <Mail className="w-4 h-4" />
                {consultation.userEmail}
              </a>
            </div>
          </div>
          <Badge className={`${config.color} border font-semibold px-3 py-1`}>
            {consultation.status}
          </Badge>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div
            className={`p-4 rounded-xl bg-gradient-to-r ${config.bgGradient} border-2`}
          >
            <div className="flex items-start gap-3">
              <Calendar className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1">
                  Scheduled Slot
                </p>
                <p className="text-slate-800 font-medium">
                  {new Date(consultation.slot).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-slate-600">
                  {new Date(consultation.slot).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-0.5 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1">
                  Request Date
                </p>
                <p className="text-slate-800 font-medium">
                  {new Date(consultation.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {consultation.status === "PENDING" && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-5 h-5 mt-0.5 text-orange-600" />
              <div>
                <p className="text-sm font-semibold text-orange-900">
                  Action Required
                </p>
                <p className="text-sm text-orange-700">
                  Please review and respond to this consultation request
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => handleAction("APPROVED")}
                disabled={isPending}
                className="flex items-center gap-2 font-semibold bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                <CheckCircle className="w-4 h-4" />
                {isPending ? "Processing..." : "Accept"}
              </Button>
              <Button
                onClick={() => handleAction("REJECTED")}
                disabled={isPending}
                className="flex items-center gap-2 font-semibold bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
              >
                <XCircle className="w-4 h-4" />
                {isPending ? "Processing..." : "Reject"}
              </Button>
            </div>
          </div>
        )}

        {consultation.status !== "PENDING" && (
          <div className={`p-4 rounded-xl border-2 ${config.color}`}>
            <div className="flex items-center gap-3">
              <Stethoscope className={`w-5 h-5 ${config.iconColor}`} />
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Consultation {consultation.status.toLowerCase()}
                </p>
                <p className="text-sm text-slate-600">
                  {consultation.status === "APPROVED"
                    ? "This consultation has been approved and scheduled."
                    : "This consultation request has been rejected."}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
