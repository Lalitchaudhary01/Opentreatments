"use client";
import { useState } from "react";

export function useDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return { isOpen, openDrawer, closeDrawer };
}
