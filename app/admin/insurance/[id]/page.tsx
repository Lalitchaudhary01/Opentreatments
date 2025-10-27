import { getInsuranceCompanyById } from "@/features/admin/insurance/actions/getInsuranceCompanyById"
import { updateInsuranceCompanyStatus } from "@/features/admin/insurance/actions/updateInsuranceCompanyStatus"

type Props = {
  params: Promise<{ id: string }>
}

export default async function AdminInsuranceCompanyPage({ params }: Props) {
  const { id } = await params

  if (!id)
    return <p className="p-6 text-red-500">Invalid company ID</p>

  const company = await getInsuranceCompanyById(id)

  if (!company)
    return <p className="p-6 text-red-500">Company not found</p>

  // Pass the id directly to avoid null issues
  async function handleStatusUpdate(companyId: string, status: "APPROVED" | "REJECTED" | "PENDING") {
    "use server"
    await updateInsuranceCompanyStatus(companyId, status)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
      <div className="bg-white border rounded-lg p-4 shadow-sm space-y-2">
        <p><strong>📍 Address:</strong> {company.address}</p>
        <p><strong>📧 Email:</strong> {company.email}</p>
        <p><strong>📞 Phone:</strong> {company.phone}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              company.status === "APPROVED"
                ? "text-green-600 font-semibold"
                : company.status === "REJECTED"
                ? "text-red-600 font-semibold"
                : "text-gray-600 font-semibold"
            }
          >
            {company.status}
          </span>
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <form action={async () => handleStatusUpdate(company.id, "APPROVED")}>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Approve
          </button>
        </form>

        <form action={async () => handleStatusUpdate(company.id, "REJECTED")}>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Reject
          </button>
        </form>

        <form action={async () => handleStatusUpdate(company.id, "PENDING")}>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  )
}