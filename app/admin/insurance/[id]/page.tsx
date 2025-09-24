// import { getInsuranceCompanyById } from "@/features/admin-insurance-companies/actions/getInsuranceCompanyById";
// import { updateInsuranceCompanyStatus } from "@/features/admin-insurance-companies/actions/updateInsuranceCompanyStatus";
// import { InsuranceProfile } from "@/features/insurance-company-profile/types/insuranceProfile";

import { getInsuranceCompanyById } from "@/features/admin/insurance/actions/getInsuranceCompanyById";
import { updateInsuranceCompanyStatus } from "@/features/admin/insurance/actions/updateInsuranceCompanyStatus";
import { InsuranceProfileInput } from "@/features/panel/insurance/insurance-company-profile/types/insuranceProfile";

type Props = {
  params: { id: string };
};

export default async function AdminInsuranceCompanyPage({ params }: Props) {
  const company: InsuranceProfileInput | null = await getInsuranceCompanyById(
    params.id
  );

  if (!company) {
    return <p className="p-6 text-red-500">Company not found.</p>;
  }

  async function handleStatusUpdate(
    status: "APPROVED" | "REJECTED" | "PENDING"
  ) {
    "use server";
    await updateInsuranceCompanyStatus(company.id, status);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{company.name}</h1>

      <div className="bg-white border rounded-lg p-4 shadow-sm space-y-2">
        <p>
          <strong>📍 Address:</strong> {company.address}
        </p>
        <p>
          <strong>📧 Email:</strong> {company.email}
        </p>
        <p>
          <strong>📞 Phone:</strong> {company.phone}
        </p>
        <p>
          <strong>Status:</strong> {company.status}
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <form action={async () => handleStatusUpdate("APPROVED")}>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Approve
          </button>
        </form>
        <form action={async () => handleStatusUpdate("REJECTED")}>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Reject
          </button>
        </form>
        <form action={async () => handleStatusUpdate("PENDING")}>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
