"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadPolicy } from "../actions/uploadPolicy";
import { PolicyInput } from "../types/insurance";

export default function PolicyUploadForm({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a PDF file");

    setLoading(true);
    setMessage(null);

    try {
      const policyData: PolicyInput = {
        name: file.name.replace(".pdf", ""),
        provider: "Unknown",
        policyNumber: "N/A",
        sumInsured: 100000,
        deductible: 0,
        coPay: 0,
        startDate: new Date().toISOString(),
        endDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString(),
        cashless: false,
        pdfUrl: "",
      };

      await uploadPolicy(userId, policyData, file);
      setMessage("✅ Policy uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to upload policy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload Insurance Policy</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
          {message && <p className="text-sm mt-2">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
