import AdminInsuranceCompanyList from "@/features/admin/insurance/components/AdminInsuranceCompanyList";

export default function AdminInsuranceCompaniesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Insurance Companies</h1>
      <AdminInsuranceCompanyList />
    </div>
  );
}
