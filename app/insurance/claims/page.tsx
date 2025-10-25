import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import InsuranceClaimList from "@/features/panel/insurance/insurance-claims/components/InsuranceClaimList";

export default async function ClaimsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "INSURANCE_COMPANY") {
    return <p>Please login as an insurance company to view claims.</p>;
  }

  const company = await prisma.insuranceCompany.findUnique({
    where: { userId: session.user.id },
  });

  if (!company) {
    return <p>No insurance company profile found.</p>;
  }

  const claims = await prisma.claim.findMany({
    where: { companyId: company.id },
    include: {
      plan: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submitted Claims</h1>
      <InsuranceClaimList
        claims={claims as any}
        onApprove={async (id: string) => {
          "use server";
          // Handle approve action
        }}
        onReject={async (id: string) => {
          "use server";
          // Handle reject action
        }}
      />
    </div>
  );
}
