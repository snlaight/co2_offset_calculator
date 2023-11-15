-- AlterTable
ALTER TABLE "ClerkUserReference" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'User';

-- CreateTable
CREATE TABLE "Emissions" (
    "id" TEXT NOT NULL,
    "country_name" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "emissions_per_capita" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Emissions_pkey" PRIMARY KEY ("id")
);
