/*
  Warnings:

  - A unique constraint covering the columns `[country_code]` on the table `Emissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Emissions_country_code_key" ON "Emissions"("country_code");
