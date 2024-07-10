import { z } from "zod";

export const zodNumber = z.coerce
  .number({
    required_error: "Este campo es requerido",
    invalid_type_error: "Este campo debe ser un número",
  })
  .nonnegative({ message: "Este campo no puede ser negativo" });

export const vehicleSchema = z.object({
  name: z.string({ required_error: "Este campo es requerido" }),
  kilometersTraveledAnnualy: zodNumber,
  hoursWorkedPerYear: zodNumber,
  vehicleAcquisitionValue: zodNumber,
  vehicleUsefulLife: zodNumber,
  vehicleResidualValue: zodNumber,
  trailerAcquisitionValue: zodNumber,
  trailerUsefulLife: zodNumber,
  trailerResidualValue: zodNumber,
  otherCosts: zodNumber,
  driversAnnualPerDiem: zodNumber,
  annualInsuranceCosts: zodNumber,
  annualFiscalCost: zodNumber,
  fuelPrice: zodNumber,
  averageConsumption: zodNumber,
  indirectCosts: zodNumber,
  costPerTirePerKm: zodNumber,
  maintenanceCostPerKm: zodNumber,
  interestRate: zodNumber,
});

export const calculatorFormSchema = vehicleSchema.omit({
  interestRate: true,
  costPerTirePerKm: true,
  maintenanceCostPerKm: true,
});
export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;
