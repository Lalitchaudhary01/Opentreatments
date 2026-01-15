// features/doctor/constants/onboardingSteps.ts
import {
  User,
  Stethoscope,
  MapPin,
  Calendar,
  CheckCircle,
  FileText,
} from "lucide-react";

export const ONBOARDING_STEPS = [
  {
    id: "personal",
    label: "Personal Information",
    description: "Basic personal details",
    icon: User,
    fields: ["name", "email", "phone", "gender", "profilePic"],
  },
  {
    id: "professional",
    label: "Professional Details",
    description: "Qualifications and experience",
    icon: Stethoscope,
    fields: ["specialization", "specialties", "experience", "qualifications"],
  },
  {
    id: "clinic",
    label: "Clinic Information",
    description: "Practice location and fees",
    icon: MapPin,
    fields: ["city", "state", "country", "address", "fees"],
  },
  {
    id: "availability",
    label: "Availability",
    description: "Working hours and schedule",
    icon: Calendar,
    fields: ["availability"],
  },
  {
    id: "documents",
    label: "Documents",
    description: "License and certificates",
    icon: FileText,
    fields: ["licenseNumber", "licenseExpiry", "certificates"],
  },
  {
    id: "verification",
    label: "Verification",
    description: "Review and submit",
    icon: CheckCircle,
    fields: [],
  },
];

export const ONBOARDING_PROGRESS = {
  personal: 0,
  professional: 20,
  clinic: 40,
  availability: 60,
  documents: 80,
  verification: 100,
};
