"use client";
import { addPlan } from "@/features/panel/insurance/insurance-plans/actions/addPlan";
import { deletePlan } from "@/features/panel/insurance/insurance-plans/actions/deletePlan";
import { getPlans } from "@/features/panel/insurance/insurance-plans/actions/getPlans";
import { searchPlans } from "@/features/panel/insurance/insurance-plans/actions/searchPlans";
import { updatePlan } from "@/features/panel/insurance/insurance-plans/actions/updatePlan";
import InsurancePlanList from "@/features/panel/insurance/insurance-plans/components/InsurancePlanList";
import { InsurancePlan } from "@/features/panel/insurance/insurance-plans/types/insurancePlan";
import { useEffect, useState } from "react";
// import { Plan } from "./types/insurancePlan";

// import InsurancePlanList from "./components/InsurancePlanList";

// // actions
// import addPlan from "./actions/addPlan";
// import getPlans from "./actions/getPlans";
// import updatePlan from "./actions/updatePlan";
// import deletePlan from "./actions/deletePlan";
// import searchPlans from "./actions/searchPlans";

export default function PlansPage() {
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // fetch all plans
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  // search plans
  const handleSearch = async () => {
    if (!search.trim()) {
      fetchPlans();
      return;
    }
    try {
      const data = await searchPlans(search);
      setPlans(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // add plan
  const handleAdd = async (
    data: Omit<InsurancePlan, "id" | "createdAt" | "updatedAt" | "claims">
  ) => {
    try {
      await addPlan(data);
      fetchPlans();
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  // update plan
  const handleUpdate = async (id: string, data: Partial<InsurancePlan>) => {
    try {
      await updatePlan(id, data);
      fetchPlans();
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  // delete plan
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      await deletePlan(id);
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Insurance Plans</h1>

      {/* 🔍 Search Box */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name or coverage..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* 📋 Plans List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <InsurancePlanList
          plans={plans}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
