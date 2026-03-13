import Link from "next/link";
import type { ComponentType } from "react";
import {
  Bell,
  BookOpen,
  Boxes,
  CreditCard,
  Gift,
  MapPin,
  MessageSquare,
  Package,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

type Props = {
  moduleTitle: string;
  moduleDescription: string;
};

type Feature = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  iconTone: string;
};

type Action = {
  label: string;
  href?: string;
  primary?: boolean;
};

type ModuleState = {
  icon: ComponentType<{ className?: string }>;
  iconTone: string;
  title: string;
  description: string;
  actions: Action[];
  features: Feature[];
};

const defaultState: ModuleState = {
  icon: Package,
  iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
  title: "Module is Ready",
  description:
    "This module will show live records once your pharmacy starts receiving real operational data.",
  actions: [
    { label: "Go to Overview", href: "/pharmacy/overview", primary: true },
    { label: "Load Demo Data" },
  ],
  features: [
    {
      title: "Live Records",
      description: "Data appears automatically after first transactions.",
      icon: Boxes,
      iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
    },
    {
      title: "Guided Setup",
      description: "Use setup checklists to enable each workflow.",
      icon: Sparkles,
      iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
    },
    {
      title: "Admin Review",
      description: "Your profile status is tracked from approvals module.",
      icon: ShieldCheck,
      iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
    },
  ],
};

const moduleStates: Record<string, ModuleState> = {
  Prescriptions: {
    icon: ShieldCheck,
    iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
    title: "No Prescriptions Yet",
    description:
      "Digital prescriptions from doctors and patients will appear here. Verify, dispense, and track every Rx in one place.",
    actions: [{ label: "Upload a Prescription", primary: true }, { label: "Load Demo Data" }],
    features: [
      {
        title: "Doctor Uploads",
        description: "Receive digital Rx directly from linked doctors or clinics",
        icon: MessageSquare,
        iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
      },
      {
        title: "One-click Verify",
        description: "Verify and queue medicines for dispensing instantly",
        icon: ShieldCheck,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "Schedule Tracking",
        description: "Auto Schedule H & H1 compliance checks on every Rx",
        icon: Bell,
        iconTone: "bg-[#ef4444]/13 text-[#ef4444]",
      },
    ],
  },
  "Billing / POS": {
    icon: CreditCard,
    iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
    title: "Your POS is Ready",
    description:
      "Add stock first, then start billing. Every sale syncs to inventory, earnings and customer history automatically.",
    actions: [
      { label: "Go to Inventory", href: "/pharmacy/inventory", primary: true },
      { label: "Load Demo Data" },
    ],
    features: [
      {
        title: "Barcode Scan",
        description: "Search by name or scan to bill in seconds",
        icon: ScanLine,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "GST Invoices",
        description: "Auto GST calculation with print-ready PDF bills",
        icon: BookOpen,
        iconTone: "bg-[#22c55e]/13 text-[#22c55e]",
      },
      {
        title: "Patient Linking",
        description: "Tie every sale to a patient for full purchase history",
        icon: Users,
        iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
      },
    ],
  },
  "Stock & Inventory": {
    icon: Boxes,
    iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
    title: "Your Inventory is Empty",
    description:
      "Add medicines to unlock billing, expiry tracking, and auto reorder alerts. Import in bulk or add one by one.",
    actions: [
      { label: "Add First Product", href: "/pharmacy/medicines/add", primary: true },
      { label: "Import from Excel" },
      { label: "Load Demo Data" },
    ],
    features: [
      {
        title: "Batch Tracking",
        description: "Multiple batches per product with FIFO dispensing",
        icon: Boxes,
        iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
      },
      {
        title: "Expiry Alerts",
        description: "Auto-alerts 30, 15 & 7 days before expiry",
        icon: Bell,
        iconTone: "bg-[#ef4444]/13 text-[#ef4444]",
      },
      {
        title: "Low Stock",
        description: "Set par levels - get warned before you run out",
        icon: Package,
        iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
      },
    ],
  },
  Deliveries: {
    icon: Truck,
    iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
    title: "No Deliveries Yet",
    description:
      "Your home-delivery module is set up. Once orders start arriving, live dispatch tracking will appear here.",
    actions: [{ label: "Set Up Delivery Zone", primary: true }, { label: "Load Demo Data" }],
    features: [
      {
        title: "Live Tracking",
        description: "Real-time GPS for every delivery partner",
        icon: MapPin,
        iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
      },
      {
        title: "Customer SMS",
        description: "Auto ETA alerts sent to customers at each stage",
        icon: MessageSquare,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "Delay Alerts",
        description: "Auto-flag delayed orders and reassign in one tap",
        icon: Bell,
        iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
      },
    ],
  },
  Analytics: {
    icon: Sparkles,
    iconTone: "bg-[#a78bfa]/13 text-[#a78bfa]",
    title: "Analytics Will Load Here",
    description:
      "Make a few sales and we'll generate revenue charts, top medicines, and peak-hour breakdowns automatically.",
    actions: [
      { label: "Go to Billing", href: "/pharmacy/billing", primary: true },
      { label: "Load Demo Data" },
    ],
    features: [
      {
        title: "Revenue Trends",
        description: "Daily, weekly & monthly revenue with growth %",
        icon: Wallet,
        iconTone: "bg-[#22c55e]/13 text-[#22c55e]",
      },
      {
        title: "Top Movers",
        description: "Best-selling medicines ranked by revenue & volume",
        icon: Package,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "GST Reports",
        description: "Auto GSTR-1 and GSTR-3B summaries, export-ready",
        icon: BookOpen,
        iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
      },
    ],
  },
  "Multi-Store": {
    icon: Store,
    iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
    title: "Add Your Second Store",
    description:
      "Manage multiple pharmacy branches from one dashboard - central inventory, transfers, and unified P&L.",
    actions: [{ label: "Add a Branch", href: "/pharmacy/multistore", primary: true }, { label: "Load Demo Data" }],
    features: [
      {
        title: "Central Stock",
        description: "See combined inventory across all branches",
        icon: Boxes,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "Stock Transfers",
        description: "Move medicines between stores in one click",
        icon: Truck,
        iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
      },
      {
        title: "Unified Reports",
        description: "P&L, top movers & revenue across all stores",
        icon: Sparkles,
        iconTone: "bg-[#a78bfa]/13 text-[#a78bfa]",
      },
    ],
  },
  "Customer Orders": {
    icon: Package,
    iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
    title: "No Orders Yet",
    description:
      "Online and phone orders will appear here once customers start placing them. Enable your storefront to begin.",
    actions: [{ label: "Enable Online Store", primary: true }, { label: "Load Demo Data" }],
    features: [
      {
        title: "Order Queue",
        description: "All incoming orders in one prioritised view",
        icon: Package,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "Auto Dispatch",
        description: "Assign to delivery partner after packing in one click",
        icon: Truck,
        iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
      },
      {
        title: "Notifications",
        description: "Automatic WhatsApp/SMS updates at each order stage",
        icon: MessageSquare,
        iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
      },
    ],
  },
  "Medicine Catalog": {
    icon: BookOpen,
    iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
    title: "Build Your Medicine Catalog",
    description:
      "Add products with pricing, categories and compositions. Your storefront is powered directly from this catalog.",
    actions: [
      { label: "Add First Product", href: "/pharmacy/medicines/add", primary: true },
      { label: "Import from Excel" },
      { label: "Load Demo Data" },
    ],
    features: [
      {
        title: "Rich Listings",
        description: "Photos, descriptions, compositions & substitutes",
        icon: BookOpen,
        iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
      },
      {
        title: "Smart Pricing",
        description: "Set category or product-level margins and offers",
        icon: Gift,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "Search Ready",
        description: "Customers find medicines by brand, salt or category",
        icon: ScanLine,
        iconTone: "bg-[#a78bfa]/13 text-[#a78bfa]",
      },
    ],
  },
  Catalog: {
    icon: BookOpen,
    iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
    title: "Build Your Medicine Catalog",
    description:
      "Add products with pricing, categories and compositions. Your storefront is powered directly from this catalog.",
    actions: [
      { label: "Add First Product", href: "/pharmacy/medicines/add", primary: true },
      { label: "Import from Excel" },
      { label: "Load Demo Data" },
    ],
    features: [
      {
        title: "Rich Listings",
        description: "Photos, descriptions, compositions & substitutes",
        icon: BookOpen,
        iconTone: "bg-[#14b8a6]/13 text-[#14b8a6]",
      },
      {
        title: "Smart Pricing",
        description: "Set category or product-level margins and offers",
        icon: Gift,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "Search Ready",
        description: "Customers find medicines by brand, salt or category",
        icon: ScanLine,
        iconTone: "bg-[#a78bfa]/13 text-[#a78bfa]",
      },
    ],
  },
  Customers: {
    icon: Users,
    iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
    title: "No Customers Yet",
    description:
      "Register your first patient to start building purchase history, chronic medication reminders and loyalty profiles.",
    actions: [{ label: "Add First Customer", href: "/pharmacy/customers", primary: true }, { label: "Load Demo Data" }],
    features: [
      {
        title: "Patient Profiles",
        description: "Full history, chronic meds & allergies per patient",
        icon: Users,
        iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
      },
      {
        title: "Refill Reminders",
        description: "Auto WhatsApp reminders before medicines run out",
        icon: Bell,
        iconTone: "bg-[#22c55e]/13 text-[#22c55e]",
      },
      {
        title: "Loyalty Points",
        description: "Reward repeat purchases with points on every sale",
        icon: Star,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
    ],
  },
  "Pricing & Offers": {
    icon: Gift,
    iconTone: "bg-[#22c55e]/13 text-[#22c55e]",
    title: "Set Up Your Pricing",
    description:
      "Configure default margins, GST slabs and welcome offers. Smart rules keep you competitive without hurting margins.",
    actions: [{ label: "Configure Pricing", href: "/pharmacy/pricing", primary: true }, { label: "Load Demo Data" }],
    features: [
      {
        title: "Margin Rules",
        description: "Category or product-wise margin thresholds",
        icon: Wallet,
        iconTone: "bg-[#22c55e]/13 text-[#22c55e]",
      },
      {
        title: "Offers & Coupons",
        description: "Time-limited discounts and loyalty coupons",
        icon: Gift,
        iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
      },
      {
        title: "Subscriptions",
        description: "Monthly medicine packs for chronic patients",
        icon: Bell,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
    ],
  },
  Earnings: {
    icon: Wallet,
    iconTone: "bg-[#22c55e]/13 text-[#22c55e]",
    title: "No Earnings Data Yet",
    description:
      "Process your first sale to see daily P&L, payment method breakdown, GST summaries and margin reports here.",
    actions: [
      { label: "Process First Sale", href: "/pharmacy/billing", primary: true },
      { label: "Load Demo Data" },
    ],
    features: [
      {
        title: "Daily P&L",
        description: "Revenue, COGS and net margin for any date range",
        icon: Wallet,
        iconTone: "bg-[#22c55e]/13 text-[#22c55e]",
      },
      {
        title: "Payment Mix",
        description: "Cash vs UPI vs card vs credit split at a glance",
        icon: CreditCard,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "GST Reports",
        description: "Auto GSTR-1 and GSTR-3B summaries, export-ready",
        icon: BookOpen,
        iconTone: "bg-[#a78bfa]/13 text-[#a78bfa]",
      },
    ],
  },
  "Customer Reviews": {
    icon: Star,
    iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
    title: "No Reviews Yet",
    description:
      "When customers rate their experience, reviews appear here. Responding to feedback builds loyalty and trust.",
    actions: [{ label: "Invite Customers to Review", primary: true }, { label: "Load Demo Data" }],
    features: [
      {
        title: "Star Ratings",
        description: "Average rating and trend over time",
        icon: Star,
        iconTone: "bg-[#f59e0b]/13 text-[#f59e0b]",
      },
      {
        title: "Reply to Reviews",
        description: "Publicly respond to feedback to show you care",
        icon: MessageSquare,
        iconTone: "bg-[#3b82f6]/13 text-[#3b82f6]",
      },
      {
        title: "Auto Thank-You",
        description: "Post-purchase review request sent by SMS automatically",
        icon: Bell,
        iconTone: "bg-[#22c55e]/13 text-[#22c55e]",
      },
    ],
  },
};

export default function PharmacyFirstTimeModuleState({
  moduleTitle,
  moduleDescription,
}: Props) {
  const cfg = moduleStates[moduleTitle] || {
    ...defaultState,
    title: moduleTitle,
    description: moduleDescription || defaultState.description,
  };

  return (
    <div className="min-h-full bg-[#0B1120] px-7 py-[22px]">
      <div className="flex min-h-[calc(100vh-160px)] items-center justify-center">
        <div className="w-full max-w-[1120px] rounded-[14px] border border-white/[0.07] bg-[#161f30] px-7 py-10 text-center">
          <div className={`mx-auto mb-4 flex h-[62px] w-[62px] items-center justify-center rounded-[14px] ${cfg.iconTone}`}>
            <cfg.icon className="h-7 w-7" />
          </div>

          <div className="mb-2 text-[28px] font-bold tracking-[-0.025em] text-slate-100">{cfg.title}</div>
          <p className="mx-auto max-w-[760px] text-[13.5px] leading-relaxed text-[#94A3B8]">{cfg.description}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {cfg.actions.map((action) =>
              action.href ? (
                <Link
                  key={action.label}
                  href={action.href}
                  className={
                    action.primary
                      ? "rounded-[8px] bg-[#3b82f6] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#2563eb]"
                      : "rounded-[8px] border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[12px] font-medium text-[#94A3B8] hover:bg-white/[0.08]"
                  }
                >
                  {action.label}
                </Link>
              ) : (
                <button
                  key={action.label}
                  className={
                    action.primary
                      ? "rounded-[8px] bg-[#3b82f6] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#2563eb]"
                      : "rounded-[8px] border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[12px] font-medium text-[#94A3B8] hover:bg-white/[0.08]"
                  }
                >
                  {action.label}
                </button>
              )
            )}
          </div>

          <div className="mx-auto mt-8 grid max-w-[980px] gap-3 md:grid-cols-3">
            {cfg.features.map((feature) => (
              <div key={feature.title} className="rounded-[12px] border border-white/[0.08] bg-[#111b2d] p-4 text-left">
                <div className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-[8px] ${feature.iconTone}`}>
                  <feature.icon className="h-4 w-4" />
                </div>
                <div className="text-[12.5px] font-semibold text-slate-100">{feature.title}</div>
                <div className="mt-1 text-[11.5px] leading-relaxed text-[#64748B]">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
