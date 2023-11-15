/*
  Warnings:

  - You are about to drop the `ClerkUserReference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "CarbonFootprint" DROP CONSTRAINT "CarbonFootprint_userId_fkey";

-- DropForeignKey
ALTER TABLE "OffsetSimulation" DROP CONSTRAINT "OffsetSimulation_userId_fkey";

-- DropForeignKey
ALTER TABLE "TreePurchase" DROP CONSTRAINT "TreePurchase_userId_fkey";

-- DropTable
DROP TABLE "ClerkUserReference";
