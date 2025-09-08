// lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + clsx classnames
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a string to a slug
 * Example: "Apollo Hospital Delhi" -> "apollo-hospital-delhi"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces -> dashes
    .replace(/[^\w\-]+/g, "") // remove non-word chars
    .replace(/\-\-+/g, "-"); // collapse multiple dashes
}

/**
 * Capitalize first letter of string
 * Example: "hello" -> "Hello"
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Generate random string (for temp IDs etc.)
 */
export function randomString(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * ===== Hospital-specific Helpers =====
 */

/**
 * Validate 10-digit phone number
 */
export function isValidPhone(phone?: string): boolean {
  if (!phone) return false;
  return /^[0-9]{10}$/.test(phone);
}

/**
 * Validate email format
 */
export function isValidEmail(email?: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Format number as currency
 */
export function formatCurrency(amount?: number, currency = "INR"): string {
  if (amount == null) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Availability status for beds or slots
 */
export function availabilityStatus(count?: number): string {
  if (!count || count === 0) return "Not Available";
  if (count < 5) return "Limited";
  return "Available";
}

/**
 * Shorten long text (e.g., descriptions)
 */
export function truncateText(text: string, maxLength = 100): string {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
