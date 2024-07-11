/*
  Warnings:

  - A unique constraint covering the columns `[parametroId]` on the table `Vehiculo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Calculo" (
    "id" SERIAL NOT NULL,
    "vehiculoDescripcion" TEXT NOT NULL,
    "parametroId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calculo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calculo_vehiculoDescripcion_key" ON "Calculo"("vehiculoDescripcion");

-- CreateIndex
CREATE UNIQUE INDEX "Calculo_parametroId_key" ON "Calculo"("parametroId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_parametroId_key" ON "Vehiculo"("parametroId");

-- AddForeignKey
ALTER TABLE "Calculo" ADD CONSTRAINT "Calculo_vehiculoDescripcion_fkey" FOREIGN KEY ("vehiculoDescripcion") REFERENCES "Vehiculo"("descripcion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculo" ADD CONSTRAINT "Calculo_parametroId_fkey" FOREIGN KEY ("parametroId") REFERENCES "Parametro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
