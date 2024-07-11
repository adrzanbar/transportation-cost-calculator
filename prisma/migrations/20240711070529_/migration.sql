/*
  Warnings:

  - You are about to drop the column `costoAnualFiscal` on the `Parametro` table. All the data in the column will be lost.
  - Added the required column `costoFiscalAnual` to the `Parametro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parametro" DROP COLUMN "costoAnualFiscal",
ADD COLUMN     "costoFiscalAnual" DOUBLE PRECISION NOT NULL;
