import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const vehiculos = [
  {
    descripcion: "Vehículo articulado de 5 ejes (Larga distancia)",
    costoNeumaticosPorKm: 0.2475,
    costoMantenimientoPorKmSinIva: 0.02,
    tipoInteres: 0.05,
    parametro: {
      create: {
        kilometrosRecorridosAnualmente: 175000,
        horasTrabajadasAlAno: 2800,
        valorAdquisicionVehiculoSinIvaSinNeumaticos: 119400,
        vidaUtilVehiculo: 10,
        valorResidualVehiculoSinIva: 14000,
        valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos: 13800,
        vidaUtilRemolqueSemirremolque: 10,
        valorResidualRemolqueSemirremolqueSinIva: 3000,
        costoAnualConductorEmpresaSegurosSociosOtros: 9300,
        dietasAnualesConductor: 2512,
        costoAnualSeguros: 2980,
        costoFiscalAnual: 3830,
        precioCarburanteSinIva: 0.81,
        consumoMedio: 42,
        costosAnualesIndirectos: 9101.29,
      },
    },
  },
  {
    descripcion: "Camión con caja volcadora (Corta distancia)",
    costoNeumaticosPorKm: 0.825,
    costoMantenimientoPorKmSinIva: 0.02,
    tipoInteres: 0.05,
    parametro: {
      create: {
        kilometrosRecorridosAnualmente: 35000,
        horasTrabajadasAlAno: 1800,
        valorAdquisicionVehiculoSinIvaSinNeumaticos: 74400,
        vidaUtilVehiculo: 10,
        valorResidualVehiculoSinIva: 9000,
        valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos: 0,
        vidaUtilRemolqueSemirremolque: 0,
        valorResidualRemolqueSemirremolqueSinIva: 0,
        costoAnualConductorEmpresaSegurosSociosOtros: 8700,
        dietasAnualesConductor: 2104.8,
        costoAnualSeguros: 2580,
        costoFiscalAnual: 2466,
        precioCarburanteSinIva: 0.81,
        consumoMedio: 35,
        costosAnualesIndirectos: 2459.07,
      },
    },
  },
  {
    descripcion: "Minitruck pick-up (Corta distancia)",
    costoNeumaticosPorKm: 0.216,
    costoMantenimientoPorKmSinIva: 0.01,
    tipoInteres: 0.05,
    parametro: {
      create: {
        kilometrosRecorridosAnualmente: 20000,
        horasTrabajadasAlAno: 2100,
        valorAdquisicionVehiculoSinIvaSinNeumaticos: 28620,
        vidaUtilVehiculo: 10,
        valorResidualVehiculoSinIva: 3300,
        valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos: 0,
        vidaUtilRemolqueSemirremolque: 0,
        valorResidualRemolqueSemirremolqueSinIva: 0,
        costoAnualConductorEmpresaSegurosSociosOtros: 8500,
        dietasAnualesConductor: 2104.8,
        costoAnualSeguros: 1070,
        costoFiscalAnual: 920,
        precioCarburanteSinIva: 0.81,
        consumoMedio: 17,
        costosAnualesIndirectos: 1251,
      },
    },
  },
];

async function main() {
  vehiculos.forEach(async (vehiculo) => {
    await prisma.vehiculo.create({
      data: vehiculo,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
