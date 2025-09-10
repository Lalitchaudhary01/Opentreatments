"use server";

import prisma from "@/lib/prisma";
import { PolicyInput, Policy } from "../types/insurance";
import fs from "fs";
import path from "path";

export async function uploadPolicy(
  userId: string,
  data: PolicyInput,
  file?: File
): Promise<Policy> {
  try {
    console.log("✅ uploadPolicy called with:", { userId, data, file });

    let pdfUrl = data.pdfUrl || null;

    // 🔹 Save file locally if file exists
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

      const safeFileName = file.name.replace(/\s+/g, "_"); // spaces to underscores
      const filePath = path.join(uploadsDir, safeFileName);
      fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
      pdfUrl = `/uploads/${safeFileName}`;
      console.log("✅ File saved at:", pdfUrl);
    }

    const policy = await prisma.policy.create({
      data: {
        userId,
        name: data.name,
        provider: data.provider,
        policyNumber: data.policyNumber,
        sumInsured: data.sumInsured,
        deductible: data.deductible ?? 0,
        coPay: data.coPay ?? 0,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        cashless: data.cashless ?? false,
        pdfUrl,
      },
    });

    return {
      ...policy,
      startDate: policy.startDate.toISOString(),
      endDate: policy.endDate.toISOString(),
      createdAt: policy.createdAt.toISOString(),
      updatedAt: policy.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("❌ uploadPolicy error:", error);
    throw new Error("Failed to upload policy");
  }
}
