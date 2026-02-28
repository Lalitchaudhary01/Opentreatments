// app/doctor/components/DoctorConsultationCard.tsx
"use client";

import { useState } from "react";
import { DoctorConsultation } from "../types";
import { CheckCircle, Eye } from "lucide-react";
import { updateConsultationStatus } from "../actions";
import { useRouter } from "next/navigation";

interface DoctorConsultationCardProps {
  consultation: DoctorConsultation;
}

// Status configuration exactly like screenshot
const statusConfig = {
  "In Progress": {
    label: "In Progress",
    bgColor: "bg-blue-100 dark:bg-blue-500/20",
    textColor: "text-blue-700 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
    dotColor: "bg-blue-500",
  },
  Confirmed: {
    label: "Confirmed",
    bgColor: "bg-teal-100 dark:bg-teal-500/20",
    textColor: "text-teal-700 dark:text-teal-400",
    borderColor: "border-teal-200 dark:border-teal-800",
    dotColor: "bg-teal-500",
  },
  Waiting: {
    label: "Waiting",
    bgColor: "bg-orange-100 dark:bg-orange-500/20",
    textColor: "text-orange-700 dark:text-orange-400",
    borderColor: "border-orange-200 dark:border-orange-800",
    dotColor: "bg-orange-500",
  },
  Completed: {
    label: "Completed",
    bgColor: "bg-purple-100 dark:bg-purple-500/20",
    textColor: "text-purple-700 dark:text-purple-400",
    borderColor: "border-purple-200 dark:border-purple-800",
    dotColor: "bg-purple-500",
  },
  Cancelled: {
    label: "Cancelled",
    bgColor: "bg-red-100 dark:bg-red-500/20",
    textColor: "text-red-700 dark:text-red-400",
    borderColor: "border-red-200 dark:border-red-800",
    dotColor: "bg-red-500",
  },
};

export default function DoctorConsultationCard({ consultation }: DoctorConsultationCardProps) {
  const [isPending, setIsPending] = useState(false);
  const [localStatus, setLocalStatus] = useState<string | null>(null);
  const router = useRouter();
  
  // Map API status to display status
  const effectiveStatus = localStatus || consultation.status;
  const displayStatus = 
    effectiveStatus === "APPROVED" ? "Confirmed" :
    effectiveStatus === "PENDING" ? "Waiting" :
    effectiveStatus === "IN_PROGRESS" ? "In Progress" :
    effectiveStatus === "COMPLETED" ? "Completed" :
    effectiveStatus === "CANCELLED" || effectiveStatus === "REJECTED" ? "Cancelled" :
    "Waiting";

  const config = statusConfig[displayStatus as keyof typeof statusConfig] || statusConfig.Waiting;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getPatientId = () => {
    // Generate PT-XXXX format ID
    const num = consultation.id?.slice(-4) || Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `#PT-${num}`;
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "9:00AM";
    try {
      const date = new Date(timeStr);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "9:00AM";
    }
  };

  const handleDone = async () => {
    try {
      setIsPending(true);
      await updateConsultationStatus(consultation.id, "APPROVED");
      setLocalStatus("APPROVED");
      router.refresh();
    } catch (error) {
      console.error("Failed to mark consultation as approved:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleView = () => {
    console.log("View details:", consultation.id);
  };

  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      {/* Patient Column */}
      <div className="col-span-3">
        <div className="flex items-center gap-3">
          {/* Avatar with initials */}
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bgColor} border ${config.borderColor}`}>
              <span className={`text-sm font-bold ${config.textColor}`}>
                {getInitials(consultation.userName || "Anonymous")}
              </span>
            </div>
            {/* Status dot */}
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${config.dotColor}`} />
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {consultation.userName || "Anonymous User"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {getPatientId()}
            </p>
          </div>
        </div>
      </div>

      {/* Time Column */}
      <div className="col-span-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2}/>
            <path strokeLinecap="round" strokeWidth={2} d="M12 6v6l4 2" />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatTime(consultation.slot)}
          </span>
        </div>
      </div>

      {/* Service Column */}
      <div className="col-span-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Consultation
        </span>
      </div>

      {/* Status Column */}
      <div className="col-span-2">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} mr-1.5`} />
          {config.label}
        </span>
      </div>

      {/* Action Column */}
      <div className="col-span-3">
        <div className="flex items-center gap-2">
          {/* Done button - only show if not completed/cancelled */}
          {displayStatus !== "Completed" &&
            displayStatus !== "Cancelled" &&
            displayStatus !== "Confirmed" && (
            <button
              onClick={handleDone}
              disabled={isPending}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${isPending 
                  ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20'
                }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {isPending ? "..." : "Done"}
            </button>
          )}
          
          {/* View button */}
          <button
            onClick={handleView}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </button>

          {/* More options menu (optional) */}
          <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="12" cy="5" r="1" fill="currentColor" />
              <circle cx="12" cy="19" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
