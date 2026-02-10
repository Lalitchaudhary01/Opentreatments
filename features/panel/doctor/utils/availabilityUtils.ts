export function normalizeAvailability(
  value?: string | Record<string, any>
): Record<string, string> {
  if (!value) return {};

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return {};
    }
  }

  return value as Record<string, string>;
}

export function hasAvailability(map?: Record<string, any>) {
  return !!map && Object.keys(map).length > 0;
}
