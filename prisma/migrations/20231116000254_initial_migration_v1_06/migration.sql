-- CreateTable
CREATE TABLE "ClerkUserReference" (
    "id" TEXT NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "userType" "UserType" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClerkUserReference_pkey" PRIMARY KEY ("id")
);
