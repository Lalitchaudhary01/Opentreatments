export function formatMedicineLabel(m: {
  name: string;
  strength?: string | null;
}) {
  return m.strength ? `${m.name} ${m.strength}` : m.name;
}

export function priceWithGst(price: number, gst?: number | null) {
  if (!gst) return price;
  return Math.round(price + price * (gst / 100));
}
