import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import InsurancePlanList from "@/features/panel/insurance/insurance-plans/components/InsurancePlanList";

export default async function PlansPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "INSURANCE_COMPANY") {
    return <p>Please login as an insurance company to manage plans.</p>;
  }

  const company = await prisma.insuranceCompany.findUnique({
    where: { userId: session.user.id },
  });

  if (!company) {
    return <p>No insurance company profile found.</p>;
  }

  const plans = await prisma.plan.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Insurance Plans</h1>
      <InsurancePlanList
        plans={plans as any}
        onAdd={async (data: any) => {
          "use server";
          // Handle add action
        }}
        onUpdate={async (id: string, data: any) => {
          "use server";
          // Handle update action
        }}
        onDelete={async (id: string) => {
          "use server";
          // Handle delete action
        }}
      />
    </div>
  );
}
