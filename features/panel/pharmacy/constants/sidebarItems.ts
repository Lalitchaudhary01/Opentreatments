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
import { pharmacyRoutes } from "./routes";

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
      { label: "Overview", href: pharmacyRoutes.overview, icon: LayoutDashboard },
      {
        label: "Prescriptions",
        href: pharmacyRoutes.prescriptions,
        icon: FileCheck2,
        badge: "12",
        badgeTone: "amber",
      },
    ],
  },
  {
    section: "Dispensing",
    items: [{ label: "Billing / POS", href: pharmacyRoutes.billing, icon: ShoppingCart }],
  },
  {
    section: "Inventory",
    items: [
      {
        label: "Stock & Inventory",
        href: pharmacyRoutes.inventory,
        icon: Boxes,
        badge: "2",
        badgeTone: "amber",
      },
      { label: "Catalog", href: pharmacyRoutes.catalog, icon: BookOpenText },
    ],
  },
  {
    section: "Orders",
    items: [{ label: "Customer Orders", href: pharmacyRoutes.orders, icon: PackageCheck, badge: "7", badgeTone: "teal" }],
  },
  {
    section: "Customers",
    items: [
      { label: "Customers", href: pharmacyRoutes.customers, icon: Users },
      { label: "Reviews", href: pharmacyRoutes.reviews, icon: Star, badge: "4", badgeTone: "amber" },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Deliveries", href: pharmacyRoutes.deliveries, icon: Truck, badge: "8" },
      { label: "Multi-store", href: pharmacyRoutes.multistore, icon: Store },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Earnings", href: pharmacyRoutes.earnings, icon: Wallet },
      { label: "Pricing & Offers", href: pharmacyRoutes.pricing, icon: Tag },
      { label: "Analytics", href: pharmacyRoutes.analytics, icon: LineChart },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Store Profile", href: pharmacyRoutes.store, icon: Building2 },
      { label: "Settings", href: pharmacyRoutes.settings, icon: Settings },
    ],
  },
];
