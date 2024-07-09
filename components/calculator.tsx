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
import { useEffect, useState } from "react";
import { calculate } from "@/actions";
import { Vehicle as PrismaVehicle } from "@prisma/client";
import {
  calculateAnnualFuelExpense,
  calculateAnnualMaintenanceExpense,
  calculateAnnualTireExpense,
} from "@/lib/utils";
import { CalculatorFormData, calculatorFormSchema } from "@/schema";

type Vehicle = Omit<PrismaVehicle, "interestRate">;

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
  const name = form.watch("name");
  const kilometersTraveledAnnualy = form.watch("kilometersTraveledAnnualy");
  const fuelPrice = form.watch("fuelPrice");
  const averageConsumption = form.watch("averageConsumption");
  const [annualFuelExpense, setAnnualFuelExpense] = useState(
    calculateAnnualFuelExpense(
      kilometersTraveledAnnualy,
      fuelPrice,
      averageConsumption
    )
  );
  const [annualMaintenanceExpense, setAnnualMaintenanceExpense] = useState(0);
  const [annualTireExpense, setAnnualTireExpense] = useState(0);
  useEffect(() => {
    setAnnualFuelExpense(
      calculateAnnualFuelExpense(
        kilometersTraveledAnnualy,
        fuelPrice,
        averageConsumption
      )
    );
  }, [kilometersTraveledAnnualy, fuelPrice, averageConsumption]);
  useEffect(() => {
    const vehicle = vehicles.find((vehicle) => vehicle.name === name);
    if (vehicle) {
      setAnnualTireExpense(
        calculateAnnualTireExpense(
          kilometersTraveledAnnualy,
          vehicle.costPerTirePerKm
        )
      );
      setAnnualMaintenanceExpense(
        calculateAnnualMaintenanceExpense(
          kilometersTraveledAnnualy,
          vehicle.maintenanceCostPerKm
        )
      );
    }
  }, [vehicles, name, kilometersTraveledAnnualy]);
  const fillFormWithDefaultValues = () => {
    const vehicle = vehicles.find((vehicle) => vehicle.name === name);
    if (vehicle) {
      form.reset({ ...vehicle });
    }
  };
  const onSubmit = async () => {
    await calculate(form.getValues());
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
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
            fillFormWithDefaultValues();
          }}
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
            <Input disabled value={annualFuelExpense} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Gasto total anual en neumáticos</FormLabel>
          <FormControl>
            <Input disabled value={annualTireExpense} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Gasto total anual en mantenimiento</FormLabel>
          <FormControl>
            <Input disabled value={annualMaintenanceExpense} />
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
        <Button type="submit">Calcular</Button>
      </form>
    </Form>
  );
}
