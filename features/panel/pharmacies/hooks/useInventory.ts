"use client";

import { useEffect, useState } from "react";
// import {
//   getInventory,
//   addStockEntry,
//   deleteStockEntry,
//   reduceStockOnSale,
// } from "@/features/panel/pharmacy/actions";
import { StockEntryInput } from "../types";
import { addStockEntry, deleteStockEntry, getInventory, reduceStockOnSale } from "../actions";

export function useInventory(pharmacyId: string) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!pharmacyId) return;
    setLoading(true);
    const data = await getInventory(pharmacyId);
    setItems(data as any);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [pharmacyId]);

  const add = async (data: StockEntryInput) => {
    const res = await addStockEntry(pharmacyId, data);
    await refresh();
    return res;
  };

  const remove = async (id: string) => {
    await deleteStockEntry(id);
    await refresh();
  };

  const reduce = async (stockEntryId: string, qty: number) => {
    const res = await reduceStockOnSale(pharmacyId, stockEntryId, qty);
    await refresh();
    return res;
  };

  return {
    items,
    loading,
    refresh,
    add,
    remove,
    reduce,
  };
}
