import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export const doctorSidebarItems = [
  {
    section: "MAIN",
    items: [
      {
        label: "Overview",
        href: "/doctor",
        icon: LayoutDashboard,
      },
      {
        label: "Appointments",
        href: "/doctor/appointments",
        icon: Calendar,
        badge: 12,
        badgeColor: "blue",
      },
      {
        label: "Patients",
        href: "/doctor/patients",
        icon: Users,
      },
    ],
  },
  {
    section: "FINANCE",
    items: [
      {
        label: "Billing",
        href: "/doctor/billing",
        icon: CreditCard,
        badge: 3,
        badgeColor: "orange",
      },
      {
        label: "Revenue",
        href: "/doctor/revenue",
        icon: DollarSign,
      },
      {
        label: "Analytics",
        href: "/doctor/analytics",
        icon: TrendingUp,
      },
    ],
  },
];