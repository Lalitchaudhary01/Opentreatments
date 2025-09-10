import PolicyUploadForm from "@/features/insurance/components/PolicyUploadForm";

export default function UploadPolicyPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Upload a Policy</h1>
      <PolicyUploadForm />
    </div>
  );
}
