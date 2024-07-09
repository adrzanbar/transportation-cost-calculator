"use server";
import { calculateAnnualCostStructure } from "@/lib/utils";
import db from "@/db";
import { redirect } from "next/navigation";
import {
  CalculatorFormData,
  calculatorFormSchema,
} from "@/schema";

export async function calculate(formData: CalculatorFormData) {
  const validation = await calculatorFormSchema.safeParseAsync(formData);
  if (!validation.success) {
    return { error: "There was an error" };
  }
  const vehicle = await db.vehicle.findUnique({
    select: {
      interestRate: true,
      costPerTirePerKm: true,
      maintenanceCostPerKm: true,
    },
    where: {
      name: validation.data.name,
    },
  });
  if (!vehicle) {
    return { error: "Vehicle not found" };
  }
  const params = calculateAnnualCostStructure({
    ...validation.data,
    ...vehicle,
  });
  const searchParams = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    )
  );
  return redirect(`/results?${searchParams.toString()}`);
}
