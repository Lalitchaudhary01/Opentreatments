"use client";

import { FC, useState } from "react";
import { UserCompany } from "../types/userInsuranceCompany";
import UserPlanList from "./UserPlanList";

interface Props {
  company: UserCompany;
}

const UserInsuranceCompanyCard: FC<Props> = ({ company }) => {
  const [showPlans, setShowPlans] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{company.name}</h2>
      <p className="text-sm text-gray-600">{company.address}</p>
      <p className="text-sm text-gray-600">
        {company.email} | {company.phone}
      </p>
      <button
        onClick={() => setShowPlans(!showPlans)}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
      >
        {showPlans ? "Hide Plans" : "View Plans"}
      </button>

      {showPlans && company.plans && <UserPlanList plans={company.plans} />}
    </div>
  );
};

export default UserInsuranceCompanyCard;
