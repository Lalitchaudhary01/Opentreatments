import Link from "next/link";
import { Button } from "@/components/ui/button";
import PolicyList from "@/features/insurance/components/PolicyList";

export default function InsurancePage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Insurance Policies</h1>
        <Link href="/insurance/upload">
          <Button>Upload Policy</Button>
        </Link>
      </div>

      <PolicyList />
    </div>
  );
}
