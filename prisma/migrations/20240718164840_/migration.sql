/*
  Warnings:

  - You are about to drop the column `adquisicionRemolque` on the `Parametros` table. All the data in the column will be lost.
  - Added the required column `remolque` to the `Parametros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parametros" DROP COLUMN "adquisicionRemolque",
ADD COLUMN     "remolque" DOUBLE PRECISION NOT NULL;
