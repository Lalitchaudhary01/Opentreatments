import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BadgeIndianRupee,
  Star,
  LineChart,
  Settings,
  BriefcaseMedical,
  Building2,
} from "lucide-react";
import type { ComponentType } from "react";
import { hospitalRoutes } from "./routes";

export type HospitalSidebarGroup = {
  section?: string;
  items: {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
    badge?: string;
    badgeTone?: "default" | "red" | "amber" | "green";
  }[];
};

export const hospitalSidebarItems: HospitalSidebarGroup[] = [
  {
    items: [
      {
        label: "Overview",
        href: hospitalRoutes.overview,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    section: "Patient Care",
    items: [
      {
        label: "Appointments",
        href: hospitalRoutes.appointments,
        icon: CalendarDays,
        badge: "18",
        badgeTone: "amber",
      },
      {
        label: "Patients",
        href: hospitalRoutes.patients,
        icon: Users,
      },
    ],
  },
  {
    section: "Operations",
    items: [
      {
        label: "Services & Pricing",
        href: hospitalRoutes.services,
        icon: BriefcaseMedical,
      },
    ],
  },
  {
    section: "Finance",
    items: [
      {
        label: "Billing & Payments",
        href: hospitalRoutes.billing,
        icon: BadgeIndianRupee,
        badge: "7",
        badgeTone: "green",
      },
    ],
  },
  {
    section: "Platform",
    items: [
      {
        label: "Reviews & Ratings",
        href: hospitalRoutes.reviews,
        icon: Star,
        badge: "4",
        badgeTone: "red",
      },
      {
        label: "Analytics",
        href: hospitalRoutes.analytics,
        icon: LineChart,
      },
      {
        label: "Settings",
        href: hospitalRoutes.settings,
        icon: Settings,
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        label: "Profile",
        href: hospitalRoutes.profile,
        icon: Building2,
      },
    ],
  },
];
