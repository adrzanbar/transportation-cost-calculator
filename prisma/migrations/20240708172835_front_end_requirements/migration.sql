/*
  Warnings:

  - You are about to drop the column `parametersId` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Parameters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `annualFiscalCost` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `annualInsuranceCosts` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageConsumption` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costPerTirePerKm` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driversAnnualPerDiem` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursWorkedPerYear` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indirectCosts` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kilometersTraveledAnnualy` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintenanceCostPerKm` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherCosts` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailerAcquisitionValue` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailerResidualValue` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleAcquisitionValue` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleResidualValue` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_parametersId_fkey";

-- DropIndex
DROP INDEX "Vehicle_parametersId_key";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "parametersId",
ADD COLUMN     "annualFiscalCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "annualInsuranceCosts" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "averageConsumption" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "costPerTirePerKm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "driversAnnualPerDiem" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hoursWorkedPerYear" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "indirectCosts" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "kilometersTraveledAnnualy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maintenanceCostPerKm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "otherCosts" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "trailerAcquisitionValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "trailerResidualValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vehicleAcquisitionValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vehicleResidualValue" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Parameters";
