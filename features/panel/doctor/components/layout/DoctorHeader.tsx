"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DoctorHeader() {
  return (
    <header className="flex items-center p-6 pb-4">
      <div className="flex-1 max-w-xl">
        <div className="flex w-full items-stretch rounded-2xl h-12">
          <div className="flex items-center justify-center pl-4 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <input
            className="flex-1 h-full px-4 outline-none bg-transparent"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="w-12 h-12 rounded-full">
          <Bell className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
