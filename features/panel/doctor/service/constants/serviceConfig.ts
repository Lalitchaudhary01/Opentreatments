import { ServiceCategory } from "../types";

export const SERVICE_CATEGORY_META: Record<
  ServiceCategory,
  { emoji: string; color: string; bg: string }
> = {
  Consultation: { emoji: "🩺", color: "text-blue-400", bg: "bg-blue-500/15" },
  Procedure: { emoji: "🛠️", color: "text-teal-400", bg: "bg-teal-500/15" },
  Diagnostic: { emoji: "🧪", color: "text-violet-400", bg: "bg-violet-500/15" },
  Therapy: { emoji: "💆", color: "text-amber-400", bg: "bg-amber-500/15" },
  Preventive: { emoji: "🛡️", color: "text-green-400", bg: "bg-green-500/15" },
};

export const SERVICE_FILTERS: ("all" | ServiceCategory)[] = [
  "all",
  "Consultation",
  "Procedure",
  "Diagnostic",
  "Therapy",
  "Preventive",
];

export const STARTER_SERVICE_SUGGESTIONS = [
  { name: "General Consultation", cat: "Consultation", price: "₹500" },
  { name: "Follow-up Visit", cat: "Consultation", price: "₹300" },
  { name: "Blood Test Panel", cat: "Diagnostic", price: "₹800" },
] as const;

export const SERVICE_TIPS = [
  {
    icon: "💡",
    tone: "bg-blue-500/15",
    text: "Set a clear duration so patients know what to expect during booking.",
  },
  {
    icon: "📋",
    tone: "bg-teal-500/15",
    text: "Add a short description - it builds patient confidence and reduces pre-visit questions.",
  },
  {
    icon: "💰",
    tone: "bg-amber-500/15",
    text: "Keep pricing transparent. Services with listed prices get 2x more bookings.",
  },
] as const;
