/*
  Warnings:

  - The primary key for the `Vehiculo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `consumoMedio` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `costeDeMantenimientoPorKmSinIva` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `costeFiscalTotalAnual` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `costeTotalAnualDeLosSeguros` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `costeTotalAnualDelConductorIncluidosCostesDeEmpresaSegSocYOtros` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `costoNeumaticosPorKm` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `dietasAnualesDelConductor` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `horasTrabajadasAlAno` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `kmRecorridosAnualmente` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `precioCarburanteSinIva` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `tipoInteres` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `totalCostesAnualesIndirectosRepercutiblesAEsteVehiculo` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `valorAdquisicionVehiculoSinIvaSinNeumaticos` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `valorResidualDelRemolqueSemirremolqueSinIva` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `valorResidualSinIvaDelVehiculo` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `vidaUtilDelRemolqueSemirremolque` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `vidaUtilDelVehiculo` on the `Vehiculo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parametrosId]` on the table `Vehiculo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `interes` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mantenimiento` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neumaticos` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parametrosId` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.
  - Made the column `nombre` on table `Vehiculo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vehiculo" DROP CONSTRAINT "Vehiculo_pkey",
DROP COLUMN "consumoMedio",
DROP COLUMN "costeDeMantenimientoPorKmSinIva",
DROP COLUMN "costeFiscalTotalAnual",
DROP COLUMN "costeTotalAnualDeLosSeguros",
DROP COLUMN "costeTotalAnualDelConductorIncluidosCostesDeEmpresaSegSocYOtros",
DROP COLUMN "costoNeumaticosPorKm",
DROP COLUMN "descripcion",
DROP COLUMN "dietasAnualesDelConductor",
DROP COLUMN "horasTrabajadasAlAno",
DROP COLUMN "id",
DROP COLUMN "kmRecorridosAnualmente",
DROP COLUMN "precioCarburanteSinIva",
DROP COLUMN "tipoInteres",
DROP COLUMN "totalCostesAnualesIndirectosRepercutiblesAEsteVehiculo",
DROP COLUMN "valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos",
DROP COLUMN "valorAdquisicionVehiculoSinIvaSinNeumaticos",
DROP COLUMN "valorResidualDelRemolqueSemirremolqueSinIva",
DROP COLUMN "valorResidualSinIvaDelVehiculo",
DROP COLUMN "vidaUtilDelRemolqueSemirremolque",
DROP COLUMN "vidaUtilDelVehiculo",
ADD COLUMN     "interes" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mantenimiento" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "neumaticos" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "parametrosId" INTEGER NOT NULL,
ALTER COLUMN "nombre" SET NOT NULL,
ADD CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("nombre");

-- CreateTable
CREATE TABLE "Parametros" (
    "id" SERIAL NOT NULL,
    "km" INTEGER NOT NULL,
    "horas" INTEGER NOT NULL,
    "adquisicion" DOUBLE PRECISION NOT NULL,
    "vidaUtil" INTEGER NOT NULL,
    "residual" DOUBLE PRECISION NOT NULL,
    "adquisicionRemolque" DOUBLE PRECISION NOT NULL,
    "vidaUtilRemolque" INTEGER NOT NULL,
    "residualRemolque" DOUBLE PRECISION NOT NULL,
    "conductor" DOUBLE PRECISION NOT NULL,
    "dietas" DOUBLE PRECISION NOT NULL,
    "seguros" DOUBLE PRECISION NOT NULL,
    "fiscal" DOUBLE PRECISION NOT NULL,
    "carburante" DOUBLE PRECISION NOT NULL,
    "consumo" DOUBLE PRECISION NOT NULL,
    "indirectos" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Parametros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicio" (
    "id" SERIAL NOT NULL,
    "denominacion" TEXT NOT NULL,
    "kmCarga" DOUBLE PRECISION NOT NULL,
    "kmVacio" DOUBLE PRECISION NOT NULL,
    "consumo" DOUBLE PRECISION NOT NULL,
    "horasCarga" DOUBLE PRECISION NOT NULL,
    "horasVacio" DOUBLE PRECISION NOT NULL,
    "horasParalizacion" DOUBLE PRECISION NOT NULL,
    "peajes" DOUBLE PRECISION NOT NULL,
    "otros" DOUBLE PRECISION NOT NULL,
    "dolar" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "vehiculoNombre" TEXT NOT NULL,
    "parametrosId" INTEGER,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_parametrosId_key" ON "Vehiculo"("parametrosId");

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_parametrosId_fkey" FOREIGN KEY ("parametrosId") REFERENCES "Parametros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_vehiculoNombre_fkey" FOREIGN KEY ("vehiculoNombre") REFERENCES "Vehiculo"("nombre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_parametrosId_fkey" FOREIGN KEY ("parametrosId") REFERENCES "Parametros"("id") ON DELETE SET NULL ON UPDATE CASCADE;
