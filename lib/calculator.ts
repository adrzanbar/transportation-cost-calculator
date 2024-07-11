import { z } from "zod";
import {
  Vehiculo as PrismaVehiculo,
  Parametro as PrismaParametro,
} from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import { createContext } from "react";

export type Parametro = Omit<PrismaParametro, "id">;

export type Vehiculo = Omit<PrismaVehiculo, "parametroId"> & {
  parametro: Parametro;
};

export const numberNonNegative = z.number().nonnegative();

export const calculatorFormSchema = z.object({
  descripcion: z.string().min(1),
  kilometrosRecorridosAnualmente: numberNonNegative,
  horasTrabajadasAlAno: numberNonNegative,
  valorAdquisicionVehiculoSinIvaSinNeumaticos: numberNonNegative,
  vidaUtilVehiculo: numberNonNegative,
  valorResidualVehiculoSinIva: numberNonNegative,
  valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos: numberNonNegative,
  vidaUtilRemolqueSemirremolque: numberNonNegative,
  valorResidualRemolqueSemirremolqueSinIva: numberNonNegative,
  costoAnualConductorEmpresaSegurosSociosOtros: numberNonNegative,
  dietasAnualesConductor: numberNonNegative,
  costoAnualSeguros: numberNonNegative,
  costoFiscalAnual: numberNonNegative,
  precioCarburanteSinIva: numberNonNegative,
  consumoMedio: numberNonNegative,
  costosAnualesIndirectos: numberNonNegative,
});

export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;

const getGastoAnualCarburanteSinIva = (parametro: Parametro) =>
  (parametro.kilometrosRecorridosAnualmente / 100) *
  parametro.consumoMedio *
  parametro.precioCarburanteSinIva;

const getGastoAnualNeumaticos = (vehiculo: Vehiculo, parametro: Parametro) =>
  vehiculo.costoNeumaticosPorKm * parametro.kilometrosRecorridosAnualmente;

const getGastoAnualMantenimientoSinIva = (
  vehiculo: Vehiculo,
  parametro: Parametro
) =>
  parametro.kilometrosRecorridosAnualmente *
  vehiculo.costoMantenimientoPorKmSinIva;

const getAmortizacionYGastosFinancieros = (
  vehiculo: Vehiculo,
  parametro: Parametro
) =>
  (parametro.valorAdquisicionVehiculoSinIvaSinNeumaticos -
    parametro.valorResidualVehiculoSinIva) /
    parametro.vidaUtilVehiculo +
    (parametro.valorAdquisicionVehiculoSinIvaSinNeumaticos -
      parametro.valorResidualVehiculoSinIva) *
      (-1 / parametro.vidaUtilVehiculo +
        vehiculo.tipoInteres /
          (1 -
            Math.pow(1 + vehiculo.tipoInteres, -parametro.vidaUtilVehiculo))) +
    ((parametro.valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos -
      parametro.valorResidualRemolqueSemirremolqueSinIva) /
      parametro.vidaUtilRemolqueSemirremolque +
      (parametro.valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos -
        parametro.valorResidualRemolqueSemirremolqueSinIva) *
        (-1 / parametro.vidaUtilRemolqueSemirremolque +
          vehiculo.tipoInteres /
            (1 -
              Math.pow(
                1 + vehiculo.tipoInteres,
                -parametro.vidaUtilRemolqueSemirremolque
              )))) || 0;

const getPersonal = (parametro: Parametro) =>
  parametro.costoAnualConductorEmpresaSegurosSociosOtros +
  parametro.dietasAnualesConductor;

const getSegurosCostosFiscalesGestionComercializacion = (
  parametro: Parametro
) =>
  parametro.costoAnualSeguros +
  parametro.costoFiscalAnual +
  parametro.precioCarburanteSinIva +
  parametro.costosAnualesIndirectos;

export const getAggregateData = (vehiculo: Vehiculo, parametro: Parametro) => {
  const gastoAnualCarburanteSinIva = getGastoAnualCarburanteSinIva(parametro);
  const gastoAnualNeumaticos = getGastoAnualNeumaticos(vehiculo, parametro);
  const gastoAnualMantenimientoSinIva = getGastoAnualMantenimientoSinIva(
    vehiculo,
    parametro
  );
  const amortizacionYGastosFinancieros = getAmortizacionYGastosFinancieros(
    vehiculo,
    parametro
  );
  const personal = getPersonal(parametro);
  const segurosCostosFiscalesGestionComercializacion =
    getSegurosCostosFiscalesGestionComercializacion(parametro);
  const combustibleNeumaticosReparacionesMantenimiento =
    gastoAnualCarburanteSinIva +
    gastoAnualNeumaticos +
    gastoAnualMantenimientoSinIva;
  const costosPorTiempo =
    amortizacionYGastosFinancieros +
    personal +
    segurosCostosFiscalesGestionComercializacion;
  const costosPorDistancia = combustibleNeumaticosReparacionesMantenimiento;
  const costosTotales = costosPorTiempo + costosPorDistancia;
  const costoTotalMedioPorKmFacturado =
    costosTotales / parametro.kilometrosRecorridosAnualmente;
  const costoTotalMedioPorHoraFacturada =
    costosTotales / parametro.horasTrabajadasAlAno;
  const costoPorDistanciaMediaPorKm =
    costosPorDistancia / parametro.horasTrabajadasAlAno;
  const costoPorTiempoMedioPorHora =
    costosPorTiempo / parametro.valorResidualVehiculoSinIva;
  const costosTotalesPorViajeroKilometro =
    costosTotales /
    parametro.kilometrosRecorridosAnualmente /
    parametro.valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos;
  return {
    gastoAnualCarburanteSinIva,
    gastoAnualNeumaticos,
    gastoAnualMantenimientoSinIva,
    amortizacionYGastosFinancieros,
    personal,
    segurosCostosFiscalesGestionComercializacion,
    combustibleNeumaticosReparacionesMantenimiento,
    costosPorTiempo,
    costosPorDistancia,
    costoTotalMedioPorKmFacturado,
    costoTotalMedioPorHoraFacturada,
    costoPorDistanciaMediaPorKm,
    costoPorTiempoMedioPorHora,
    costosTotalesPorViajeroKilometro,
  };
};

export const defaultValues = {
  descripcion: "",
  kilometrosRecorridosAnualmente: 0,
  horasTrabajadasAlAno: 0,
  valorAdquisicionVehiculoSinIvaSinNeumaticos: 0,
  vidaUtilVehiculo: 0,
  valorResidualVehiculoSinIva: 0,
  valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos: 0,
  vidaUtilRemolqueSemirremolque: 0,
  valorResidualRemolqueSemirremolqueSinIva: 0,
  costoAnualConductorEmpresaSegurosSociosOtros: 0,
  dietasAnualesConductor: 0,
  costoAnualSeguros: 0,
  costoFiscalAnual: 0,
  precioCarburanteSinIva: 0,
  consumoMedio: 0,
  costosAnualesIndirectos: 0,
};

export const CalculatorContext = createContext({
  form: {} as UseFormReturn<CalculatorFormData>,
  formData: defaultValues,
  vehiculo: {} as Vehiculo,
  vehiculos: [] as Vehiculo[],
  aggregateData: {} as ReturnType<typeof getAggregateData>,
  aggregateDataDatosEstadisticos: {} as ReturnType<typeof getAggregateData>,
});

export const defaultVehiculo = {
  descripcion: "",
  costoNeumaticosPorKm: 0,
  costoMantenimientoPorKmSinIva: 0,
  tipoInteres: 0,
  parametro: {
    kilometrosRecorridosAnualmente: 0,
    horasTrabajadasAlAno: 0,
    valorAdquisicionVehiculoSinIvaSinNeumaticos: 0,
    vidaUtilVehiculo: 0,
    valorResidualVehiculoSinIva: 0,
    valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos: 0,
    vidaUtilRemolqueSemirremolque: 0,
    valorResidualRemolqueSemirremolqueSinIva: 0,
    costoAnualConductorEmpresaSegurosSociosOtros: 0,
    dietasAnualesConductor: 0,
    costoAnualSeguros: 0,
    costoFiscalAnual: 0,
    precioCarburanteSinIva: 0,
    consumoMedio: 0,
    costosAnualesIndirectos: 0,
  },
};
