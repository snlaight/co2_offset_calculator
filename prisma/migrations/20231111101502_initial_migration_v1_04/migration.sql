-- AlterTable
ALTER TABLE "CarbonFootprint" ALTER COLUMN "calculationDate" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "TreePurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "treeCount" INTEGER NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TreePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffsetSimulation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "simulationDate" TIMESTAMP(3) NOT NULL,
    "totalTreesPlanted" INTEGER NOT NULL,
    "totalCO2Offset" DOUBLE PRECISION NOT NULL,
    "projectedOffsetYears" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OffsetSimulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminConfigurations" (
    "id" TEXT NOT NULL,
    "treeCost" DOUBLE PRECISION NOT NULL,
    "inflationRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AdminConfigurations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TreePurchase" ADD CONSTRAINT "TreePurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ClerkUserReference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffsetSimulation" ADD CONSTRAINT "OffsetSimulation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ClerkUserReference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
