"use client";

import { useState, useEffect } from "react";
import { EstimateResult, Policy, PolicyInput } from "../types/insurance";
import { getPolicies } from "../actions/getPolicies";
import { getPolicyById } from "../actions/getPolicyById";
import { calculateEstimate } from "../actions/calculatedEstimated";
import { deletePolicy } from "../actions/deletePolicy";
import { uploadPolicy } from "../actions/uploadPolicy";
// 👈 yaha tum index file me export kar do

export function useInsurance() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [estimates, setEstimates] = useState<EstimateResult[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all policies
  async function fetchPolicies() {
    setLoading(true);
    try {
      const data = await getPolicies();
      setPolicies(data);
    } catch (err) {
      console.error("❌ Error fetching policies:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Fetch single policy
  async function fetchPolicy(id: string) {
    setLoading(true);
    try {
      const data = await getPolicyById(id);
      setSelectedPolicy(data);
    } catch (err) {
      console.error("❌ Error fetching policy:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Upload policy
  async function addPolicy(userId: string, data: PolicyInput) {
    setLoading(true);
    try {
      await uploadPolicy(userId, data);
      await fetchPolicies();
    } catch (err) {
      console.error("❌ Error uploading policy:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Delete policy
  async function removePolicy(id: string) {
    setLoading(true);
    try {
      await deletePolicy(id);
      setPolicies((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("❌ Error deleting policy:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Calculate estimate
  async function getEstimate(
    policyId: string,
    procedureId: string,
    hospitalId: string
  ) {
    setLoading(true);
    try {
      const data = await calculateEstimate(policyId, procedureId, hospitalId);
      setEstimates(data);
    } catch (err) {
      console.error("❌ Error calculating estimate:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPolicies();
  }, []);

  return {
    policies,
    selectedPolicy,
    estimates,
    loading,
    fetchPolicies,
    fetchPolicy,
    addPolicy,
    removePolicy,
    getEstimate,
  };
}
