"use server";

import prisma from "@/lib/prisma";
import { EstimateInput, EstimateResult } from "../types/insurance";

export async function calculateEstimate(
  input: EstimateInput
): Promise<EstimateResult> {
  try {
    const policy = await prisma.policy.findUnique({
      where: { id: input.policyId },
    });

    if (!policy) {
      throw new Error("Policy not found");
    }

    const deductible = policy.deductible ?? 0;
    const coPay = policy.coPay ?? 0;

    // Step 1: Apply deductible
    let remainingCost = input.procedureCost - deductible;
    if (remainingCost < 0) remainingCost = 0;

    // Step 2: Insurance coverage (up to sumInsured)
    let insuranceCover = Math.min(remainingCost, policy.sumInsured);

    // Step 3: Apply co-pay (patient pays this % of covered cost)
    const coPayAmount = (insuranceCover * coPay) / 100;

    // Final out-of-pocket cost
    const outOfPocket =
      deductible + coPayAmount + (remainingCost - insuranceCover);

    return {
      policyId: input.policyId,
      hospitalId: input.hospitalId,
      procedureCost: input.procedureCost,
      coveredAmount: insuranceCover - coPayAmount,
      outOfPocket,
      breakdown: {
        deductible,
        coPayAmount,
        insuranceCover,
      },
    };
  } catch (error) {
    console.error("❌ calculateEstimate error:", error);
    throw new Error("Failed to calculate estimate");
  }
}
