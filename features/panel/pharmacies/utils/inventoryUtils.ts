export function isExpired(expiry: Date) {
  return new Date(expiry).getTime() < Date.now();
}

export function daysToExpire(expiry: Date) {
  const diff = new Date(expiry).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function stockStatus(qty: number) {
  if (qty <= 0) return "out";
  if (qty <= 10) return "low";
  return "ok";
}
