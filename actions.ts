"use server";
import { calculateAnnualCostStructure } from "@/lib/utils";
import db from "@/db";
import { redirect } from "next/navigation";
import { CalculatorFormData, calculatorFormSchema } from "@/schema";

export async function calculate(formData: CalculatorFormData) {
  const validation = await calculatorFormSchema.safeParseAsync(formData);
  if (!validation.success) {
    return { error: "There was an error" };
  }
  const vehicle = await db.vehicle.findUnique({
    select: {
      kilometersTraveledAnnualy: true,
      vehicleAcquisitionValue: true,
      vehicleUsefulLife: true,
      vehicleResidualValue: true,
      trailerAcquisitionValue: true,
      trailerUsefulLife: true,
      trailerResidualValue: true,
      otherCosts: true,
      driversAnnualPerDiem: true,
      annualInsuranceCosts: true,
      annualFiscalCost: true,
      fuelPrice: true,
      averageConsumption: true,
      indirectCosts: true,
      costPerTirePerKm: true,
      maintenanceCostPerKm: true,
      interestRate: true,
    },
    where: {
      name: validation.data.name,
    },
  });
  if (!vehicle) {
    return { error: "Vehicle not found" };
  }
  console.log("vehicle", vehicle);
  console.log("data", validation.data);
  console.log("result", calculateAnnualCostStructure({ ...vehicle, ...validation.data }));
  console.log("statistics", calculateAnnualCostStructure({ ...vehicle }))
  const path = [
    ...Object.values(
      calculateAnnualCostStructure({
        ...vehicle,
        ...validation.data,
      })
    ),
    ...Object.values(
      calculateAnnualCostStructure({
        ...vehicle,
      })
    ),
  ].join("/");
  return redirect(`/results/${path}`);
}
