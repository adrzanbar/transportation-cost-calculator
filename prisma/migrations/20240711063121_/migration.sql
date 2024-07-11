/*
  Warnings:

  - You are about to drop the column `costoFiscal` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `costoSeguros` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `costosConductorEmpresaSegurosSociosOtros` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `dietasConductor` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `horasTrabajadas` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `kilometrosRecorridos` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `precioCarburante` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `costoMantenimiento` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `costoNeumaticos` on the `Vehiculo` table. All the data in the column will be lost.
  - Added the required column `costoAnualConductorEmpresaSegurosSociosOtros` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoAnualFiscal` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoAnualSeguros` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietasAnualesConductor` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horasTrabajadasAlAno` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kilometrosRecorridosAnualmente` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioCarburanteSinIva` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoMantenimientoPorKmSinIva` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoNeumaticosPorKm` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parametro" DROP COLUMN "costoFiscal",
DROP COLUMN "costoSeguros",
DROP COLUMN "costosConductorEmpresaSegurosSociosOtros",
DROP COLUMN "dietasConductor",
DROP COLUMN "horasTrabajadas",
DROP COLUMN "kilometrosRecorridos",
DROP COLUMN "precioCarburante",
ADD COLUMN     "costoAnualConductorEmpresaSegurosSociosOtros" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "costoAnualFiscal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "costoAnualSeguros" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dietasAnualesConductor" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "horasTrabajadasAlAno" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "kilometrosRecorridosAnualmente" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "precioCarburanteSinIva" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Vehiculo" DROP COLUMN "costoMantenimiento",
DROP COLUMN "costoNeumaticos",
ADD COLUMN     "costoMantenimientoPorKmSinIva" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "costoNeumaticosPorKm" DOUBLE PRECISION NOT NULL;
