import {
  LayoutDashboard,
  FileCheck2,
  ShoppingCart,
  Boxes,
  BookOpenText,
  PackageCheck,
  Users,
  Star,
  Truck,
  Store,
  Wallet,
  Tag,
  LineChart,
  Building2,
  Settings,
} from "lucide-react";
import type { ComponentType } from "react";

export type PharmacySidebarGroup = {
  section: string;
  items: {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
    badge?: string;
    badgeTone?: "default" | "amber" | "teal" | "red";
  }[];
};

export const pharmacySidebarItems: PharmacySidebarGroup[] = [
  {
    section: "Clinical",
    items: [
      { label: "Overview", href: "/pharmacy/overview", icon: LayoutDashboard },
      {
        label: "Prescriptions",
        href: "/pharmacy/prescriptions",
        icon: FileCheck2,
        badge: "12",
        badgeTone: "amber",
      },
    ],
  },
  {
    section: "Dispensing",
    items: [{ label: "Billing / POS", href: "/pharmacy/billing", icon: ShoppingCart }],
  },
  {
    section: "Inventory",
    items: [
      {
        label: "Stock & Inventory",
        href: "/pharmacy/inventory",
        icon: Boxes,
        badge: "2",
        badgeTone: "amber",
      },
      { label: "Catalog", href: "/pharmacy/catalog", icon: BookOpenText },
    ],
  },
  {
    section: "Orders",
    items: [{ label: "Customer Orders", href: "/pharmacy/orders", icon: PackageCheck, badge: "7", badgeTone: "teal" }],
  },
  {
    section: "Customers",
    items: [
      { label: "Customers", href: "/pharmacy/customers", icon: Users },
      { label: "Reviews", href: "/pharmacy/reviews", icon: Star, badge: "4", badgeTone: "amber" },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Deliveries", href: "/pharmacy/deliveries", icon: Truck, badge: "8" },
      { label: "Multi-store", href: "/pharmacy/multistore", icon: Store },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Earnings", href: "/pharmacy/earnings", icon: Wallet },
      { label: "Pricing & Offers", href: "/pharmacy/pricing", icon: Tag },
      { label: "Analytics", href: "/pharmacy/analytics", icon: LineChart },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Store Profile", href: "/pharmacy/store", icon: Building2 },
      { label: "Settings", href: "/pharmacy/settings", icon: Settings },
    ],
  },
];
