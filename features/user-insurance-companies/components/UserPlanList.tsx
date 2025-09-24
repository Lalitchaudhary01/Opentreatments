"use client";

import { InsurancePlan } from "@/features/panel/insurance/insurance-plans/types/insurancePlan";
import { FC } from "react";

interface Props {
  plans: InsurancePlan[];
}

const UserPlanList: FC<Props> = ({ plans }) => {
  if (plans.length === 0) return <p className="mt-2 text-gray-500">No plans available.</p>;

  return (
    <div className="mt-4 grid grid-cols-1 gap-3">
      {plans.map((plan) => (
        <div key={plan.id} className="border p-3 rounded shadow-sm">
          <h3 className="font-semibold">{plan.name}</h3>
          {plan.description && <p className="text-gray-600 text-sm">{plan.description}</p>}
          <p className="text-sm text-gray-700">Premium: ₹{plan.premium}</p>
          <p className="text-sm text-gray-700">
            Coverage: {JSON.stringify(plan.coverageDetails)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserPlanList;
