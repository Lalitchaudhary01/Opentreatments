"use client";

import { useEffect, useState } from "react";
import { getApprovedInsuranceCompanies } from "@/features/user-insurance-companies/actions/getApprovedInsuranceCompanies";

import UserInsuranceCompanyList from "@/features/user-insurance-companies/components/UserInsuranceCompanyList";
import { UserCompany } from "@/features/user-insurance-companies/types/userInsuranceCompany";

const UserInsuranceCompaniesPage = () => {
  const [companies, setCompanies] = useState<UserCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApprovedInsuranceCompanies()
      .then((data) => setCompanies(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="py-10 text-center">Loading companies...</div>;
  if (companies.length === 0)
    return <div className="py-10 text-center">No companies found.</div>;

  return <UserInsuranceCompanyList companies={companies} />;
};

export default UserInsuranceCompaniesPage;
