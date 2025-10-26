/*
  Warnings:

  - You are about to drop the column `availability` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `form` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `packSize` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `rxRequired` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `therapeuticClass` on the `Medicine` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Pharmacy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseNumber` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerName` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Pharmacy` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."PharmacyStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."StockType" AS ENUM ('INCOMING', 'OUTGOING');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PACKED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."InventoryChangeType" AS ENUM ('SALE', 'DAMAGE', 'EXPIRE', 'MANUAL_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "public"."InsuranceStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."ClaimStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Role" ADD VALUE 'PHARMACY';
ALTER TYPE "public"."Role" ADD VALUE 'INSURANCE_COMPANY';

-- DropIndex
DROP INDEX "public"."Medicine_slug_key";

-- AlterTable
ALTER TABLE "public"."Medicine" DROP COLUMN "availability",
DROP COLUMN "form",
DROP COLUMN "packSize",
DROP COLUMN "rxRequired",
DROP COLUMN "slug",
DROP COLUMN "therapeuticClass",
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "dosageForm" TEXT,
ADD COLUMN     "gst" DOUBLE PRECISION,
ADD COLUMN     "manufacturer" TEXT,
ADD COLUMN     "mrp" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Pharmacy" ADD COLUMN     "country" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gstNumber" TEXT,
ADD COLUMN     "licenseNumber" TEXT NOT NULL,
ADD COLUMN     "ownerName" TEXT NOT NULL,
ADD COLUMN     "status" "public"."PharmacyStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."StockEntry" (
    "id" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "batchNumber" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "purchasePrice" DOUBLE PRECISION,
    "sellingPrice" DOUBLE PRECISION,
    "type" "public"."StockType" NOT NULL DEFAULT 'INCOMING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pharmacyId" TEXT NOT NULL,

    CONSTRAINT "StockEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InventoryLog" (
    "id" TEXT NOT NULL,
    "stockEntryId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "changeType" "public"."InventoryChangeType" NOT NULL,
    "quantityChanged" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InsuranceCompany" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactPhone" TEXT,
    "registrationNumber" TEXT,
    "logoUrl" TEXT,
    "description" TEXT,
    "provider" TEXT,
    "profile" JSONB,
    "address" TEXT,
    "website" TEXT,
    "status" "public"."InsuranceStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plan" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverageDetails" JSONB NOT NULL,
    "premium" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Claim" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "billDetails" JSONB NOT NULL,
    "status" "public"."ClaimStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_userId_key" ON "public"."InsuranceCompany"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_email_key" ON "public"."InsuranceCompany"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacy_userId_key" ON "public"."Pharmacy"("userId");

-- AddForeignKey
ALTER TABLE "public"."Pharmacy" ADD CONSTRAINT "Pharmacy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockEntry" ADD CONSTRAINT "StockEntry_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "public"."Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockEntry" ADD CONSTRAINT "StockEntry_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "public"."Pharmacy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InventoryLog" ADD CONSTRAINT "InventoryLog_stockEntryId_fkey" FOREIGN KEY ("stockEntryId") REFERENCES "public"."StockEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InventoryLog" ADD CONSTRAINT "InventoryLog_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "public"."Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InventoryLog" ADD CONSTRAINT "InventoryLog_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "public"."Pharmacy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "public"."Pharmacy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "public"."Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InsuranceCompany" ADD CONSTRAINT "InsuranceCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plan" ADD CONSTRAINT "Plan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."InsuranceCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Claim" ADD CONSTRAINT "Claim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Claim" ADD CONSTRAINT "Claim_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."InsuranceCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Claim" ADD CONSTRAINT "Claim_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
