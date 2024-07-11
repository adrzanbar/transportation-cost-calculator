"use client";

import { useContext } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CalculatorContext } from "@/lib/calculator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CalculatotForm() {
  const { form, vehiculos, vehiculo, aggregateData } =
    useContext(CalculatorContext);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => console.log(form.getValues()))}>
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehículo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                Valor de adquisición del vehículo sin IVA y sin neumáticos (US$)
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
              <FormLabel>Vida útil del remolque-semirremolque (años)</FormLabel>
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
          <FormLabel>Gasto total anual en carburante, sin IVA (US$)</FormLabel>
          <FormControl>
            <Input disabled value={aggregateData.gastoAnualCarburanteSinIva} />
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
  );
}
