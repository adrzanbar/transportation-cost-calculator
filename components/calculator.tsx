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
import { Vehicle } from "@prisma/client";
import {
  calculateAmortizationAndFinancialExpenses,
  calculateAnnualFuelExpense,
  calculateAnnualMaintenanceExpense,
  calculateAnnualTireExpense,
  calculateInsuranceTaxesManagementAndMarketing,
  calculatePersonnel,
} from "@/lib/utils";
import { CalculatorFormData, calculatorFormSchema } from "@/schema";

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
  const vehicleAcquisitionValue = form.watch("vehicleAcquisitionValue");
  const vehicleUsefulLife = form.watch("vehicleUsefulLife");
  const vehicleResidualValue = form.watch("vehicleResidualValue");
  const trailerAcquisitionValue = form.watch("trailerAcquisitionValue");
  const trailerUsefulLife = form.watch("trailerUsefulLife");
  const trailerResidualValue = form.watch("trailerResidualValue");
  const otherCosts = form.watch("otherCosts");
  const driversAnnualPerDiem = form.watch("driversAnnualPerDiem");
  const annualInsuranceCosts = form.watch("annualInsuranceCosts");
  const annualFiscalCost = form.watch("annualFiscalCost");
  const fuelPrice = form.watch("fuelPrice");
  const averageConsumption = form.watch("averageConsumption");
  const indirectCosts = form.watch("indirectCosts");
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <Input
                disabled
                value={
                  calculateAnnualFuelExpense(
                    kilometersTraveledAnnualy,
                    fuelPrice,
                    averageConsumption
                  ) || 0
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Gasto total anual en neumáticos</FormLabel>
            <FormControl>
              <Input
                disabled
                value={
                  calculateAnnualTireExpense(
                    kilometersTraveledAnnualy,
                    vehicles.find((vehicle) => vehicle.name === name)
                      ?.costPerTirePerKm || 0
                  ) || 0
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Gasto total anual en mantenimiento</FormLabel>
            <FormControl>
              <Input
                disabled
                value={
                  calculateAnnualMaintenanceExpense(
                    kilometersTraveledAnnualy,
                    vehicles.find((vehicle) => vehicle.name === name)
                      ?.maintenanceCostPerKm || 0
                  ) || 0
                }
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
          <Button type="submit">Calcular</Button>
        </form>
      </Form>
      <div></div>
    </div>
  );
}
