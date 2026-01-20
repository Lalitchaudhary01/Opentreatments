import { BaseCard } from "../../cards";
import { MedicineRow } from "./MedicineRow";

interface Item {
  id: string;
  medicine: { name: string };
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
}

interface Props {
  items: Item[];
}

export function InventorySection({ items }: Props) {
  return (
    <div className="p-6">
      <BaseCard title="Inventory">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-muted-foreground border-b">
              <th className="py-2">Medicine</th>
              <th className="py-2">Batch</th>
              <th className="py-2">Qty</th>
              <th className="py-2">Expiry</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <MedicineRow
                key={i.id}
                name={i.medicine.name}
                batch={i.batchNumber}
                quantity={i.quantity}
                expiry={i.expiryDate}
              />
            ))}
          </tbody>
        </table>
      </BaseCard>
    </div>
  );
}
