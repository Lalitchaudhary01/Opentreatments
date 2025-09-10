// /features/medicines/types/medicine.ts

/**
 * Core ID alias
 */
export type ID = string;

/**
 * Pharmacy (basic)
 */
export interface Pharmacy {
  id: ID;
  name: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  // optional geo coords for map
  latitude?: number | null;
  longitude?: number | null;
}

/**
 * A single price datapoint (price history)
 */
export interface PricePoint {
  id: ID;
  medicineId: ID;
  price: number;
  date: string; // ISO date string (or Date on server-side)
}

/**
 * Represents a substitute relation (link to another medicine)
 */
export interface Substitute {
  id: ID;
  medicineId: ID; // original medicine
  substituteMedicineId: ID; // substitute medicine id
  // optional expanded object if joined
  substituteMedicine?: MedicineSummary | null;
}

/**
 * Basic medicine model (summary used in lists/tables)
 */
export interface MedicineBase {
  id: ID;
  name: string; // Brand name
  genericName?: string | null;
  form?: string | null; // e.g., Tablet, Syrup
  strength?: string | null; // e.g., 500 mg
  packSize?: string | null; // e.g., 10 tablets
  price: number; // current or representative price
  slug?: string | null;
  pharmacyId?: ID | null; // pharmacy that provided this record
  availability?: boolean;
  createdAt?: string; // ISO string
  updatedAt?: string;
}

/**
 * Medicine used in lists with joined pharmacy and light extras
 */
export interface MedicineSummary extends MedicineBase {
  pharmacy?: Pharmacy | null;
  // the single most recent price point (if needed)
  latestPricePoint?: PricePoint | null;
  // computed field useful in UI (e.g. isBestPrice)
  isBestPrice?: boolean;
}

/**
 * Detailed medicine object for detail drawer / detail page
 */
export interface MedicineDetail extends MedicineSummary {
  description?: string | null;
  substitutes?: MedicineSummary[]; // expanded substitutes
  priceTrends?: PricePoint[]; // historical price points
  nearbyPharmacies?: Pharmacy[]; // pharmacies that stock this medicine
  // additional metadata
  therapeuticClass?: string | null;
  rxRequired?: boolean | null;
}

/**
 * Pagination & search result wrapper
 */
export interface MedicineSearchResult {
  items: MedicineSummary[];
  total: number;
  page: number;
  perPage: number;
}

/**
 * Parameters used for searching / listing medicines (server action input)
 */
export interface GetMedicinesParams {
  query?: string; // search by brand/generic
  city?: string;
  pharmacyId?: ID;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  form?: string; // filter by form
  page?: number;
  perPage?: number;
  sort?: MedicineSortOption;
}

/**
 * Sorting options
 */
export type MedicineSortOption =
  | "price_asc"
  | "price_desc"
  | "relevance"
  | "latest";

/**
 * Input for creating a medicine (server-side)
 */
export interface CreateMedicineInput {
  name: string;
  genericName?: string | null;
  form?: string | null;
  strength?: string | null;
  packSize?: string | null;
  price: number;
  pharmacyId: ID;
  availability?: boolean;
  slug?: string | null;
  description?: string | null;
  rxRequired?: boolean | null;
}

/**
 * Input for updating medicine
 */
export interface UpdateMedicineInput extends Partial<CreateMedicineInput> {
  id: ID;
}

/**
 * Generic server action result wrapper
 */
export interface ServerActionResult<T = any> {
  success: boolean;
  data?: T | null;
  error?: string | null;
}

/**
 * UI specific types
 */
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string; // e.g. "120px" or "20%"
}

export interface CompareItem {
  id: ID;
  name: string;
  genericName?: string | null;
  price: number;
  pharmacyName?: string | null;
  form?: string | null;
  strength?: string | null;
  packSize?: string | null;
  availability?: boolean;
}

/**
 * Hook return types
 */
export interface UseMedicineSearchResult {
  medicines: MedicineSummary[];
  total: number;
  page: number;
  perPage: number;
  loading: boolean;
  error?: string | null;
  // actions
  runSearch: (params?: Partial<GetMedicinesParams>) => Promise<void>;
  loadMore: () => Promise<void>;
}

/**
 * Small util type for price comparison
 */
export interface PriceCompareRow {
  medicineId: ID;
  price: number;
  pharmacyId?: ID | null;
}
