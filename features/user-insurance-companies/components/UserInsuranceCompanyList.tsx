"use client";

import { FC, useEffect, useState } from "react";
import { UserCompany } from "../types/userInsuranceCompany";
import { getApprovedInsuranceCompanies } from "../actions/getApprovedInsuranceCompanies";
import UserInsuranceCompanyCard from "./UserInsuranceCompanyCard";

const UserInsuranceCompanyList: FC = () => {
  const [companies, setCompanies] = useState<UserCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApprovedInsuranceCompanies()
      .then((data) => setCompanies(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading companies...</div>;
  if (companies.length === 0) return <div className="text-center py-10">No approved companies found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <UserInsuranceCompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default UserInsuranceCompanyList;
