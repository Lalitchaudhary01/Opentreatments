// import { isExpired, stockStatus } from "@/features/panel/pharmacy/utils";

import { isExpired, stockStatus } from "../../../utils";

interface Props {
  name: string;
  batch: string;
  quantity: number;
  expiry: Date;
}

export function MedicineRow({ name, batch, quantity, expiry }: Props) {
  const expired = isExpired(expiry);
  const status = stockStatus(quantity);

  return (
    <tr className="border-b text-sm">
      <td className="py-2">{name}</td>
      <td className="py-2">{batch}</td>
      <td className="py-2">{quantity}</td>
      <td className="py-2">
        {new Date(expiry).toLocaleDateString()}
        {expired && <span className="ml-2 text-red-500">(Expired)</span>}
      </td>
      <td className="py-2 capitalize">{status}</td>
    </tr>
  );
}
