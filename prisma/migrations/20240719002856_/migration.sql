/*
  Warnings:

  - Made the column `parametrosId` on table `Servicio` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Servicio" DROP CONSTRAINT "Servicio_parametrosId_fkey";

-- AlterTable
ALTER TABLE "Servicio" ALTER COLUMN "parametrosId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_parametrosId_fkey" FOREIGN KEY ("parametrosId") REFERENCES "Parametros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
