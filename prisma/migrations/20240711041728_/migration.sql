/*
  Warnings:

  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Vehicle";

-- CreateTable
CREATE TABLE "Vehiculo" (
    "descripcion" TEXT NOT NULL,
    "costoDeNeumaticos" DOUBLE PRECISION NOT NULL,
    "costeDeMantenimiento" DOUBLE PRECISION NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "parametroId" INTEGER NOT NULL,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("descripcion")
);

-- CreateTable
CREATE TABLE "Parametro" (
    "id" SERIAL NOT NULL,
    "kilometros" DOUBLE PRECISION NOT NULL,
    "horas" DOUBLE PRECISION NOT NULL,
    "valorVehiculo" DOUBLE PRECISION NOT NULL,
    "vidaUtilVehiculo" DOUBLE PRECISION NOT NULL,
    "valorResidualVehiculo" DOUBLE PRECISION NOT NULL,
    "valorRemolque" DOUBLE PRECISION NOT NULL,
    "vidaUtilRemolque" DOUBLE PRECISION NOT NULL,
    "valorResidualRemolque" DOUBLE PRECISION NOT NULL,
    "conductor" DOUBLE PRECISION NOT NULL,
    "dieta" DOUBLE PRECISION NOT NULL,
    "costeSeguros" DOUBLE PRECISION NOT NULL,
    "costeFiscal" DOUBLE PRECISION NOT NULL,
    "carburante" DOUBLE PRECISION NOT NULL,
    "consumo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Parametro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_parametroId_fkey" FOREIGN KEY ("parametroId") REFERENCES "Parametro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
