import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// model Vehiculo {
//   descripcion String @id

//   parametroId Int @unique

//   costoNeumaticosPorKm          Float
//   costoMantenimientoPorKmSinIva Float
//   tipoInteres                   Float
//   parametro                     Parametro @relation(fields: [parametroId], references: [id])
//   calculo                       Calculo[]
// }

// model Parametro {
//   id Int @id @default(autoincrement())

//   kilometrosRecorridosAnualmente                           Float
//   horasTrabajadasAlAno                                     Float
//   valorAdquisicionVehiculoSinIvaSinNeumaticos              Float
//   vidaUtilVehiculo                                         Float
//   valorResidualVehiculoSinIva                              Float
//   valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos Float
//   vidaUtilRemolqueSemirremolque                            Float
//   valorResidualRemolqueSemirremolqueSinIva                 Float
//   costoAnualConductorEmpresaSegurosSociosOtros             Float
//   dietasAnualesConductor                                   Float
//   costoAnualSeguros                                        Float
//   costoFiscalAnual                                         Float
//   precioCarburanteSinIva                                   Float
//   consumoMedio                                             Float
//   costosAnualesIndirectos                                  Float

//   vehiculo Vehiculo?
//   calculo  Calculo?
// }

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
    descripcion: "Vehículo articulado de 3 ejes (Larga distancia)",
    costoNeumaticosPorKm: 0.165,
    costoMantenimientoPorKmSinIva: 0.02,
    tipoInteres: 0.05,
    parametro: {
      create: {
        kilometrosRecorridosAnualmente: 175000,
        horasTrabajadasAlAno: 2800,
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
        costosAnualesIndirectos: 2459,
      },
    },
  },
  {
    descripcion: "Vehículo articulado de 2 ejes (Larga distancia)",
    costoNeumaticosPorKm: 0.165,
    costoMantenimientoPorKmSinIva: 0.02,
    tipoInteres: 0.05,
    parametro: {
      create: {
        kilometrosRecorridosAnualmente: 175000,
        horasTrabajadasAlAno: 2800,
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
        costosAnualesIndirectos: 2459,
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
