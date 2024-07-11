/*
  Warnings:

  - You are about to drop the column `interestRate` on the `Vehiculo` table. All the data in the column will be lost.
  - Added the required column `tipoInteres` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehiculo" DROP COLUMN "interestRate",
ADD COLUMN     "tipoInteres" DOUBLE PRECISION NOT NULL;
