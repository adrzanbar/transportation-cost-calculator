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
import { Vehicle } from "@prisma/client";
import {
  calculateAnnualCostStructure,
  calculateAnnualFuelExpense,
  calculateAnnualMaintenanceExpense,
  calculateAnnualTireExpense,
} from "@/lib/utils";
import { CalculatorFormData, calculatorFormSchema } from "@/schema";
import { AnnualCostPieChart } from "./pie-chart";
import { useMemo } from "react";

const defaultVehicle = {
  name: "",
  kilometersTraveledAnnualy: 0,
  hoursWorkedPerYear: 0,
  vehicleAcquisitionValue: 0,
  vehicleUsefulLife: 0,
  vehicleResidualValue: 0,
  trailerAcquisitionValue: 0,
  trailerUsefulLife: 0,
  trailerResidualValue: 0,
  otherCosts: 0,
  driversAnnualPerDiem: 0,
  annualInsuranceCosts: 0,
  annualFiscalCost: 0,
  fuelPrice: 0,
  averageConsumption: 0,
  indirectCosts: 0,
  costPerTirePerKm: 0,
  maintenanceCostPerKm: 0,
  interestRate: 0,
};

export default function Calculator({ vehicles }: { vehicles: Vehicle[] }) {
  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      name: "",
      kilometersTraveledAnnualy: 0,
      hoursWorkedPerYear: 0,
      vehicleAcquisitionValue: 0,
      vehicleUsefulLife: 0,
      vehicleResidualValue: 0,
      trailerAcquisitionValue: 0,
      trailerUsefulLife: 0,
      trailerResidualValue: 0,
      otherCosts: 0,
      driversAnnualPerDiem: 0,
      annualInsuranceCosts: 0,
      annualFiscalCost: 0,
      fuelPrice: 0,
      averageConsumption: 0,
      indirectCosts: 0,
    },
  });

  const params = form.watch();

  const vehicle = useMemo(
    () =>
      vehicles.find((vehicle) => vehicle.name === params.name) ||
      defaultVehicle,
    [vehicles, params.name]
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => console.log(form.getValues()))}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="name"
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
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.name} value={vehicle.name}>
                        {vehicle.name}
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
              form.reset({ ...vehicle });
            }}
            className="self-end"
          >
            Valores por defecto
          </Button>
          <FormField
            control={form.control}
            name="kilometersTraveledAnnualy"
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
            name="hoursWorkedPerYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horas trabajadas por año</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicleAcquisitionValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor de adquisición del vehículo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicleUsefulLife"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vida útil del vehículo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicleResidualValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor residual del vehículo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trailerAcquisitionValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor de adquisición del remolque</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trailerUsefulLife"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vida útil del remolque</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trailerResidualValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor residual del remolque</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otherCosts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Otros costos</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driversAnnualPerDiem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Viáticos anuales de los conductores</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="annualInsuranceCosts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costos anuales de seguro</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="annualFiscalCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costos fiscales anuales</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuelPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio del combustible</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="averageConsumption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consumo promedio</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Gasto total anual en carburante</FormLabel>
            <FormControl>
              <Input
                disabled
                value={calculateAnnualFuelExpense({ ...params })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Gasto total anual en neumáticos</FormLabel>
            <FormControl>
              <Input
                disabled
                value={calculateAnnualTireExpense({ ...vehicle, ...params })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Gasto total anual en mantenimiento</FormLabel>
            <FormControl>
              <Input
                disabled
                value={calculateAnnualMaintenanceExpense({
                  ...vehicle,
                  ...params,
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="indirectCosts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costos indirectos</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-2">
            Calcular
          </Button>
        </form>
      </Form>
      <div className="space-y-4">
        <h2 className="text-center text-lg">Estructura de costes anuales</h2>
        <div className="grid grid-cols-2 gap-4">
          <AnnualCostPieChart
            costData={Object.values(
              calculateAnnualCostStructure({
                ...vehicle,
                ...params,
              })
            )}
            label="Mis datos"
          />
          <AnnualCostPieChart
            costData={Object.values(
              calculateAnnualCostStructure({ ...vehicle })
            )}
            label="Datos estadísticos"
          />
        </div>
      </div>
    </div>
  );
}
