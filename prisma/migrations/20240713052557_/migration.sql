-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "descripcion" TEXT,
    "kmRecorridosAnualmente" INTEGER NOT NULL DEFAULT 0,
    "horasTrabajadasAlAno" INTEGER NOT NULL DEFAULT 0,
    "valorAdquisicionVehiculoSinIvaSinNeumaticos" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "vidaUtilDelVehiculo" INTEGER NOT NULL DEFAULT 0,
    "valorResidualSinIvaDelVehiculo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "vidaUtilDelRemolqueSemirremolque" INTEGER NOT NULL DEFAULT 0,
    "valorResidualDelRemolqueSemirremolqueSinIva" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "costeTotalAnualDelConductorIncluidosCostesDeEmpresaSegSocYOtros" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dietasAnualesDelConductor" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "costeTotalAnualDeLosSeguros" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "costeFiscalTotalAnual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "precioCarburanteSinIva" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "consumoMedio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCostesAnualesIndirectosRepercutiblesAEsteVehiculo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tipoInteres" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "costoNeumaticosPorKm" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "costeDeMantenimientoPorKmSinIva" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id")
);
