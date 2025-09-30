"use client";
import { useState, useEffect } from "react";
import { getApprovedPharmacies } from "../actions/getApprovedPharmacies";
import UserPharmacyCard from "./UserPharmacyCard";

interface UserPharmacyListProps {
  searchQuery?: string;
  selectedLocation?: string;
  selectedType?: string;
}

export default function UserPharmacyList({
  searchQuery = "",
  selectedLocation = "all",
  selectedType = "All",
}: UserPharmacyListProps) {
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPharmacies() {
      setLoading(true);
      try {
        const data = await getApprovedPharmacies();
        setPharmacies(data);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPharmacies();
  }, []);

  // Filter pharmacies based on search and filters
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesSearch =
      searchQuery === "" ||
      pharmacy.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      selectedLocation === "all" ||
      pharmacy.address?.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesType =
      selectedType === "All" ||
      (selectedType === "24/7 Open" && pharmacy.isOpen24x7) ||
      (selectedType === "Home Delivery" && pharmacy.hasHomeDelivery) ||
      (selectedType === "Emergency" && pharmacy.isEmergency) ||
      (selectedType === "Prescription" && pharmacy.hasPrescription);

    return matchesSearch && matchesLocation && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  if (filteredPharmacies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
          No pharmacies found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredPharmacies.map((pharmacy) => (
        <UserPharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
      ))}
    </div>
  );
}
