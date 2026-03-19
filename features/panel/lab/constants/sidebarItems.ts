import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  FlaskConical,
  FileText,
  Users,
  BookOpenText,
  CreditCard,
  RefreshCw,
  LineChart,
  Settings,
  UserCircle2,
} from "lucide-react";
import type { ComponentType } from "react";
import { labRoutes } from "./routes";

export type LabSidebarGroup = {
  section: string;
  items: {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
    badge?: string;
    badgeTone?: "default" | "amber" | "teal" | "red";
  }[];
};

export const labSidebarItems: LabSidebarGroup[] = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", href: labRoutes.overview, icon: LayoutDashboard },
    ],
  },
  {
    section: "Test Orders",
    items: [{ label: "All Orders", href: labRoutes.orders, icon: ClipboardList, badge: "124", badgeTone: "default" }],
  },
  {
    section: "Lab Workflow",
    items: [
      { label: "Sample Collection", href: labRoutes.collection, icon: Truck, badge: "9", badgeTone: "amber" },
      { label: "Sample Processing", href: labRoutes.processing, icon: FlaskConical, badge: "23", badgeTone: "teal" },
      { label: "Reports", href: labRoutes.reports, icon: FileText, badge: "7", badgeTone: "amber" },
    ],
  },
  {
    section: "Patients & Tests",
    items: [
      { label: "Patients", href: labRoutes.patients, icon: Users },
      { label: "Test Catalog", href: labRoutes.catalog, icon: BookOpenText },
    ],
  },
  {
    section: "Finance & Ops",
    items: [
      { label: "Billing & Payments", href: labRoutes.billing, icon: CreditCard },
      { label: "Logistics", href: labRoutes.logistics, icon: RefreshCw },
    ],
  },
  {
    section: "Insights & Admin",
    items: [
      { label: "Reports & Analytics", href: labRoutes.analytics, icon: LineChart },
      { label: "Settings", href: labRoutes.settings, icon: Settings },
    ],
  },
  {
    section: "Account",
    items: [{ label: "Profile", href: labRoutes.profile, icon: UserCircle2 }],
  },
];
