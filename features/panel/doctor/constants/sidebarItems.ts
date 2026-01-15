// features/doctor/constants/sidebarItems.ts
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Users,
  ClipboardCheck,
  Settings,
  Calendar,
  FileText,
  Bell,
  HelpCircle,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    href: "/doctor",
    icon: LayoutDashboard,
    active: false,
  },
  {
    label: "Profile",
    href: "/doctor/profile",
    icon: User,
    active: true,
  },
  {
    label: "Appointments",
    href: "/doctor/appointments",
    icon: Calendar,
    active: false,
  },
  {
    label: "Consultations",
    href: "/doctor/consultations",
    icon: MessageSquare,
    active: false,
  },
  {
    label: "Patients",
    href: "/doctor/patients",
    icon: Users,
    active: false,
  },
  {
    label: "Approvals",
    href: "/doctor/approvals",
    icon: ClipboardCheck,
    active: false,
  },
  {
    label: "Documents",
    href: "/doctor/documents",
    icon: FileText,
    active: false,
  },
  {
    label: "Settings",
    href: "/doctor/settings",
    icon: Settings,
    active: false,
  },
];

export const SIDEBAR_BOTTOM_ITEMS = [
  {
    label: "Notifications",
    href: "/doctor/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    label: "Help & Support",
    href: "/doctor/help",
    icon: HelpCircle,
  },
];
