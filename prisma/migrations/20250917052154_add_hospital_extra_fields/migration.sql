/*
  Warnings:

  - You are about to drop the column `availableBeds` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `bedCount` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyAvailable` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `totalReviews` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Hospital` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."HospitalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'HOSPITAL';

-- AlterTable
ALTER TABLE "public"."Hospital" DROP COLUMN "availableBeds",
DROP COLUMN "bedCount",
DROP COLUMN "description",
DROP COLUMN "emergencyAvailable",
DROP COLUMN "rating",
DROP COLUMN "totalReviews",
DROP COLUMN "type",
ADD COLUMN     "status" "public"."HospitalStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_userId_key" ON "public"."Hospital"("userId");

-- AddForeignKey
ALTER TABLE "public"."Hospital" ADD CONSTRAINT "Hospital_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
