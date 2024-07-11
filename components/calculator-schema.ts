import { z } from "zod";

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
