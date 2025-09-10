import { Badge } from "@/components/ui/badge";

interface PriceTagProps {
  price: number;
}

export default function PriceTag({ price }: PriceTagProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-green-600 font-semibold">₹{price}</span>
      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
        Best Price
      </Badge>
    </div>
  );
}