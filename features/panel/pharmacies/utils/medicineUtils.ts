export function calculateDiscountedPrice(
  mrp: number,
  discountPercent: number
) {
  return mrp - (mrp * discountPercent) / 100
}

export function formatCurrency(value: number) {
  return `₹${value.toFixed(2)}`
}

export function normalizeSearchQuery(query: string) {
  return query.trim().toLowerCase()
}