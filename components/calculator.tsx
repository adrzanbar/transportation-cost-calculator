"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AnnualCostPieChart } from "./category-pie-chart";
import { TimeDistanceCostPieChart } from "./time-distance-pie-chart";
import { CostTable } from "./table";
import { z } from "zod";
import { calculatorFormSchema } from "./calculator-schema";
import {
  Vehiculo as PrismaVehiculo,
  Parametro as PrismaParametro,
} from "@prisma/client";

type Parametro = Omit<PrismaParametro, "id">;

type Vehiculo = Omit<PrismaVehiculo, "parametroId"> & {
  parametro: Parametro;
};

type CalculatorFormData = z.infer<typeof calculatorFormSchema>;

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
) => {
  let amortizacionYGastosFinancierosVehiculo = 0;
  let amortizacionYGastosFinancierosRemolqueSemirremolque = 0;

  if (parametro.vidaUtilVehiculo !== 0)
    amortizacionYGastosFinancierosVehiculo =
      (parametro.valorAdquisicionVehiculoSinIvaSinNeumaticos -
        parametro.valorResidualVehiculoSinIva) /
        parametro.vidaUtilVehiculo +
      (parametro.valorAdquisicionVehiculoSinIvaSinNeumaticos -
        parametro.valorResidualVehiculoSinIva) *
        (-1 / parametro.vidaUtilVehiculo +
          vehiculo.tipoInteres /
            (1 -
              Math.pow(1 + vehiculo.tipoInteres, -parametro.vidaUtilVehiculo)));
  if (parametro.vidaUtilRemolqueSemirremolque !== 0)
    amortizacionYGastosFinancierosRemolqueSemirremolque =
      (parametro.valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos -
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
              )));

  return (
    amortizacionYGastosFinancierosVehiculo +
    amortizacionYGastosFinancierosRemolqueSemirremolque
  );
};

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

const getAggregateData = (vehiculo: Vehiculo, parametro: Parametro) => {
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

export default function Calculator({ vehiculos }: { vehiculos: Vehiculo[] }) {
  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
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
    },
  });

  const formData = form.watch();

  const vehiculo = vehiculos.find(
    (vehiculo) => vehiculo.descripcion === formData.descripcion
  ) || {
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

  const aggregateData = getAggregateData(vehiculo, formData);
  const aggregateDataDatosEstadisticos = getAggregateData(
    vehiculo,
    vehiculo.parametro
  );

  return (
    <div className="flex flex-row gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => console.log(form.getValues()))}>
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehículo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un vehículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehiculos.map((vehiculo) => (
                      <SelectItem
                        key={vehiculo.descripcion}
                        value={vehiculo.descripcion}
                      >
                        {vehiculo.descripcion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              form.reset({ ...vehiculo, ...vehiculo.parametro });
            }}
            className="w-full my-4"
          >
            Valores por defecto
          </Button>
          <FormField
            control={form.control}
            name="kilometrosRecorridosAnualmente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kilómetros recorridos anualmente</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="horasTrabajadasAlAno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horas trabajadas al año</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valorAdquisicionVehiculoSinIvaSinNeumaticos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Valor de adquisición del vehículo sin IVA y sin neumáticos
                  (US$)
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vidaUtilVehiculo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vida útil del vehículo (años)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valorResidualVehiculoSinIva"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor residual sin IVA del vehículo (US$)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Valor de adquisición del remolque-semirremolque sin IVA y sin
                  neumáticos (US$)
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vidaUtilRemolqueSemirremolque"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Vida útil del remolque-semirremolque (años)
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valorResidualRemolqueSemirremolqueSinIva"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Valor residual del remolque-semirremolque sin IVA (US$)
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costoAnualConductorEmpresaSegurosSociosOtros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Costo total anual del conductor, incluidos costos de empresa,
                  Seg. Soc y otros (US$)
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietasAnualesConductor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietas anuales del conductor (US$)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costoAnualSeguros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo total anual de los seguros (US$)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costoFiscalAnual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo fiscal total anual (US$)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="precioCarburanteSinIva"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio carburante sin IVA (US$/litro)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="consumoMedio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consumo medio (litros/100km)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>
              Gasto total anual en carburante, sin IVA (US$)
            </FormLabel>
            <FormControl>
              <Input
                disabled
                value={aggregateData.gastoAnualCarburanteSinIva}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Gasto total anual en neumáticos (US$)</FormLabel>
            <FormControl>
              <Input disabled value={aggregateData.gastoAnualNeumaticos} />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Gasto anual en mantenimiento sin IVA (US$)</FormLabel>
            <FormControl>
              <Input
                disabled
                value={aggregateData.gastoAnualMantenimientoSinIva}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="costosAnualesIndirectos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Total costos anuales indirectos repercutibles a este vehículo
                  (US$)
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="space-y-4 min-w-[50vw]">
        <h2 className="text-center text-lg">Estructura de costos anuales</h2>
        <div className="grid grid-cols-2 gap-4">
          <AnnualCostPieChart
            costData={[
              aggregateData.amortizacionYGastosFinancieros,
              aggregateData.personal,
              aggregateData.segurosCostosFiscalesGestionComercializacion,
              aggregateData.combustibleNeumaticosReparacionesMantenimiento,
            ]}
            label="Usuario"
          />
          <AnnualCostPieChart
            costData={[
              aggregateDataDatosEstadisticos.amortizacionYGastosFinancieros,
              aggregateDataDatosEstadisticos.personal,
              aggregateDataDatosEstadisticos.segurosCostosFiscalesGestionComercializacion,
              aggregateDataDatosEstadisticos.combustibleNeumaticosReparacionesMantenimiento,
            ]}
            label="Datos estadísticos"
          />
        </div>
        <h2 className="text-center text-lg">Costos: Tiempo vs Distancia</h2>
        <div className="grid grid-cols-2 gap-4">
          <TimeDistanceCostPieChart
            costData={[
              aggregateData.costosPorTiempo,
              aggregateData.costosPorDistancia,
            ]}
            label="Usuario"
          />
          <TimeDistanceCostPieChart
            costData={[
              aggregateDataDatosEstadisticos.costosPorTiempo,
              aggregateDataDatosEstadisticos.costosPorDistancia,
            ]}
            label="Datos estadísticos"
          />
        </div>
        <div>
          <CostTable
            user={[
              aggregateData.costoTotalMedioPorKmFacturado,
              aggregateData.costoTotalMedioPorHoraFacturada,
              aggregateData.costosPorDistancia,
              aggregateData.costoPorDistanciaMediaPorKm,
              aggregateData.costosPorTiempo,
              aggregateData.costoPorTiempoMedioPorHora,
              aggregateData.costosTotalesPorViajeroKilometro,
            ]}
            stats={[
              aggregateDataDatosEstadisticos.costoTotalMedioPorKmFacturado,
              aggregateDataDatosEstadisticos.costoTotalMedioPorHoraFacturada,
              aggregateDataDatosEstadisticos.costosPorDistancia,
              aggregateDataDatosEstadisticos.costoPorDistanciaMediaPorKm,
              aggregateDataDatosEstadisticos.costosPorTiempo,
              aggregateDataDatosEstadisticos.costoPorTiempoMedioPorHora,
              aggregateDataDatosEstadisticos.costosTotalesPorViajeroKilometro,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
