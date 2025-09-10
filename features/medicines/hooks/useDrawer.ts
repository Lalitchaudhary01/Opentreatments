"use client";

import { useState, useCallback } from "react";

export function useDrawer<T = unknown>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openDrawer = useCallback((payload?: T) => {
    setData(payload ?? null);
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return { isOpen, data, openDrawer, closeDrawer };
}
