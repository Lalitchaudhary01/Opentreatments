"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPlansByCompany } from "@/features/user-insurance-companies/actions/getPlansByCompany";

import UserPlanList from "@/features/user-insurance-companies/components/UserPlanList";
import { InsurancePlan } from "@/features/panel/insurance/insurance-plans/types/insurancePlan";

const UserInsuranceCompanyPage = () => {
  const { id } = useParams(); // companyId
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getPlansByCompany(id as string)
      .then((data) => setPlans(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-10 text-center">Loading plans...</div>;
  if (plans.length === 0)
    return <div className="py-10 text-center">No plans available.</div>;

  return <UserPlanList plans={plans} />;
};

export default UserInsuranceCompanyPage;
