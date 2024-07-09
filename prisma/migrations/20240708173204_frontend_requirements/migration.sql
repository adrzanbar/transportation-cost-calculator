/*
  Warnings:

  - Added the required column `fuelPrice` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestRate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailerUsefulLife` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleUsefulLife` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "fuelPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "interestRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "trailerUsefulLife" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vehicleUsefulLife" DOUBLE PRECISION NOT NULL;
