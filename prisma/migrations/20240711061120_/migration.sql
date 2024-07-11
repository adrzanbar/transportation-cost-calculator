/*
  Warnings:

  - You are about to drop the column `carburante` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `conductor` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `consumo` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `costeFiscal` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `costeSeguros` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `dieta` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `horas` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `kilometros` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `valorRemolque` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `valorResidualRemolque` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `valorResidualVehiculo` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `valorVehiculo` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `vidaUtilRemolque` on the `Parametro` table. All the data in the column will be lost.
  - You are about to drop the column `costeDeMantenimiento` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `costoDeNeumaticos` on the `Vehiculo` table. All the data in the column will be lost.
  - Added the required column `consumoMedio` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoFiscal` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoSeguros` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costosConductorEmpresaSegurosSociosOtros` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietasConductor` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horasTrabajadas` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kilometrosRecorridos` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioCarburante` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorAdquisicionVehiculoSinIvaSinNeumaticos` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorResidualRemolqueSemirremolqueSinIva` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorResidualVehiculoSinIva` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vidaUtilRemolqueSemirremolque` to the `Parametro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoMantenimiento` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoNeumaticos` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parametro" DROP COLUMN "carburante",
DROP COLUMN "conductor",
DROP COLUMN "consumo",
DROP COLUMN "costeFiscal",
DROP COLUMN "costeSeguros",
DROP COLUMN "dieta",
DROP COLUMN "horas",
DROP COLUMN "kilometros",
DROP COLUMN "valorRemolque",
DROP COLUMN "valorResidualRemolque",
DROP COLUMN "valorResidualVehiculo",
DROP COLUMN "valorVehiculo",
DROP COLUMN "vidaUtilRemolque",
ADD COLUMN     "consumoMedio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "costoFiscal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "costoSeguros" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "costosConductorEmpresaSegurosSociosOtros" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dietasConductor" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "horasTrabajadas" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "kilometrosRecorridos" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "precioCarburante" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorAdquisicionVehiculoSinIvaSinNeumaticos" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorResidualRemolqueSemirremolqueSinIva" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorResidualVehiculoSinIva" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vidaUtilRemolqueSemirremolque" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Vehiculo" DROP COLUMN "costeDeMantenimiento",
DROP COLUMN "costoDeNeumaticos",
ADD COLUMN     "costoMantenimiento" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "costoNeumaticos" DOUBLE PRECISION NOT NULL;
