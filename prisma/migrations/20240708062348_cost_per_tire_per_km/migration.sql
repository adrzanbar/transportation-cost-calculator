/*
  Warnings:

  - Added the required column `costPerTirePerKm` to the `Parameters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parameters" ADD COLUMN     "costPerTirePerKm" DOUBLE PRECISION NOT NULL;
