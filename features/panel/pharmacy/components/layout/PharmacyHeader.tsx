"use client";

import { useMemo } from "react";
import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { pharmacyRoutes } from "@/features/panel/pharmacy/constants";

type HeaderPageKey =
  | "dashboard"
  | "inventory"
  | "catalog"
  | "orders"
  | "store"
  | "settings"
  | "default";

function getHeaderPageKey(pathname: string): HeaderPageKey {
  if (
    pathname === "/pharmacy" ||
    pathname.startsWith("/pharmacy/dashboard") ||
    pathname.startsWith("/pharmacy/overview")
  ) {
    return "dashboard";
  }
  if (pathname.startsWith("/pharmacy/inventory")) return "inventory";
  if (pathname.startsWith("/pharmacy/catalog") || pathname.startsWith("/pharmacy/medicines")) return "catalog";
  if (pathname.startsWith("/pharmacy/orders")) return "orders";
  if (pathname.startsWith("/pharmacy/store") || pathname.startsWith("/pharmacy/profile")) return "store";
  if (pathname.startsWith("/pharmacy/settings")) return "settings";
  return "default";
}

export default function PharmacyHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const pageKey = useMemo(() => getHeaderPageKey(pathname), [pathname]);

  const title = useMemo(() => {
    if (pageKey === "dashboard") return "Pharmacy Overview";
    if (pageKey === "inventory") return "Stock & Inventory";
    if (pageKey === "catalog") return "Catalog";
    if (pageKey === "orders") return "Customer Orders";
    if (pageKey === "store") return "Store Profile";
    if (pageKey === "settings") return "Settings";
    return "Pharmacy Panel";
  }, [pageKey]);

  const subtitle = useMemo(() => {
    const today = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (pageKey === "dashboard") return `${today} · Live pharmacy operations`;
    if (pageKey === "inventory") return "Track low stock, expiry and inward batches";
    if (pageKey === "catalog") return "Manage listed medicines and pricing";
    if (pageKey === "orders") return "Review online and in-store orders";
    if (pageKey === "store") return "Business and compliance details";
    if (pageKey === "settings") return "Panel and account preferences";
    return today;
  }, [pageKey]);

  const actionLabel = useMemo(() => {
    if (pageKey === "catalog") return "Add Medicine";
    if (pageKey === "inventory") return "Add Stock";
    return "New Order";
  }, [pageKey]);

  const handlePrimaryAction = () => {
    if (pageKey === "catalog") {
      router.push(pharmacyRoutes.addMedicine);
      return;
    }

    if (pageKey === "inventory") {
      router.push(pharmacyRoutes.inventory);
      return;
    }

    router.push(pharmacyRoutes.orders);
  };

  return (
    <header className="flex items-center justify-between px-7 py-3.5 bg-[#111827] border-b border-white/[0.07]">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-[17px] font-semibold tracking-tight text-white">{title}</h1>
        <p className="text-sm text-[#94A3B8]">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center w-[230px] h-[34px] rounded-lg bg-white/[0.05] border border-white/[0.07]">
          <div className="pl-3 text-[#475569]">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            className="flex-1 h-full px-3 text-sm bg-transparent outline-none text-white placeholder:text-[#64748B]"
            placeholder="Search..."
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-[41px] h-[29px] rounded-lg hover:bg-white/5 text-white"
        >
          <Bell className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          onClick={handlePrimaryAction}
          className="h-[29px] px-3 rounded-lg bg-[#3b82f6] hover:bg-blue-600 text-white text-sm font-normal gap-2"
        >
          <Plus className="w-3.5 h-3.5" />
          {actionLabel}
        </Button>
      </div>
    </header>
  );
}
