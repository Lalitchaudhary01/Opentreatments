import {
  User,
  MessageCircle,
  Users,
  ClipboardCheck,
  Settings,
} from "lucide-react";

export const doctorSidebarItems = [
  {
    label: "Dashboard",
    href: "/doctor",
    icon: User,
  },
  {
    label: "Profile",
    href: "/doctor/profile",
    icon: User,
  },
  {
    label: "Consultations",
    href: "/doctor/consultations",
    icon: MessageCircle,
  },
  {
    label: "Patients",
    href: "/doctor/patients",
    icon: Users,
  },
  {
    label: "Approvals",
    href: "/doctor/approvals",
    icon: ClipboardCheck,
  },
  {
    label: "Settings",
    href: "/doctor/settings",
    icon: Settings,
  },
];
