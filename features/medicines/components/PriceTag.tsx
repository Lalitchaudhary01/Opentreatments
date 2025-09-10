"use client";

import { Badge } from "@/components/ui/badge";

interface PriceTagProps {
  price: number;
  highlight?: boolean;
}

export function PriceTag({ price, highlight }: PriceTagProps) {
  return (
    <span className="flex items-center gap-2">
      ₹{price.toFixed(2)}
      {highlight && <Badge className="bg-green-500">Best price</Badge>}
    </span>
  );
}
