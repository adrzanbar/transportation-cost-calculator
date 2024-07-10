import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateAnnualFuelExpense = (
  kilometersTraveledAnnualy: number,
  fuelPrice: number,
  averageConsumption: number
) => (kilometersTraveledAnnualy / 100) * fuelPrice * averageConsumption;

export const calculateAnnualTireExpense = (
  kilometersTraveledAnnualy: number,
  costPerTirePerKm: number
) => kilometersTraveledAnnualy * costPerTirePerKm;

export const calculateAnnualMaintenanceExpense = (
  kilometersTraveledAnnualy: number,
  maintenanceCostPerKm: number
) => kilometersTraveledAnnualy * maintenanceCostPerKm;

export const calculateAmortizationAndFinancialExpenses = (
  interestRate: number,
  vehicleAcquisitionValue: number,
  vehicleUsefulLife: number,
  vehicleResidualValue: number,
  trailerAcquisitionValue: number,
  trailerUsefulLife: number,
  trailerResidualValue: number
) =>
  (vehicleAcquisitionValue - vehicleResidualValue) / vehicleUsefulLife +
  (vehicleAcquisitionValue - vehicleResidualValue) *
    (-1 / vehicleUsefulLife +
      interestRate / (1 - Math.pow(1 + interestRate, -vehicleUsefulLife))) +
  (trailerAcquisitionValue - trailerResidualValue) / trailerUsefulLife +
  (trailerAcquisitionValue - trailerResidualValue) *
    (-1 / trailerUsefulLife +
      interestRate / (1 - Math.pow(1 + interestRate, -trailerUsefulLife)));

export const calculatePersonnel = (
  otherCosts: number,
  driversAnnualPerDiem: number
) => otherCosts + driversAnnualPerDiem;

export const calculateInsuranceTaxesManagementAndMarketing = (
  annualInsuranceCosts: number,
  annualFiscalCost: number,
  fuelPrice: number,
  indirectCosts: number
) => annualInsuranceCosts + annualFiscalCost + fuelPrice + indirectCosts;

export const calculateFuelTireRepairAndMaintenance = (
  kilometersTraveledAnnualy: number,
  fuelPrice: number,
  averageConsumption: number,
  costPerTirePerKm: number,
  maintenanceCostPerKm: number
) => {
  const a = calculateAnnualFuelExpense(
    kilometersTraveledAnnualy,
    fuelPrice,
    averageConsumption
  );
  const b = calculateAnnualTireExpense(
    kilometersTraveledAnnualy,
    costPerTirePerKm
  );
  const c = calculateAnnualMaintenanceExpense(
    kilometersTraveledAnnualy,
    maintenanceCostPerKm
  );
  console.log(a, b, c);
  return a + b + c;
};

export const calculateAnnualCostStructure = ({
  kilometersTraveledAnnualy,
  vehicleAcquisitionValue,
  vehicleUsefulLife,
  vehicleResidualValue,
  trailerAcquisitionValue,
  trailerUsefulLife,
  trailerResidualValue,
  otherCosts,
  driversAnnualPerDiem,
  annualInsuranceCosts,
  annualFiscalCost,
  fuelPrice,
  averageConsumption,
  indirectCosts,
  costPerTirePerKm,
  maintenanceCostPerKm,
  interestRate,
}: {
  kilometersTraveledAnnualy: number;
  vehicleAcquisitionValue: number;
  vehicleUsefulLife: number;
  vehicleResidualValue: number;
  trailerAcquisitionValue: number;
  trailerUsefulLife: number;
  trailerResidualValue: number;
  otherCosts: number;
  driversAnnualPerDiem: number;
  annualInsuranceCosts: number;
  annualFiscalCost: number;
  fuelPrice: number;
  averageConsumption: number;
  indirectCosts: number;
  costPerTirePerKm: number;
  maintenanceCostPerKm: number;
  interestRate: number;
}) => ({
  amorotizationAndFinancialExpenses: calculateAmortizationAndFinancialExpenses(
    interestRate,
    vehicleAcquisitionValue,
    vehicleUsefulLife,
    vehicleResidualValue,
    trailerAcquisitionValue,
    trailerUsefulLife,
    trailerResidualValue
  ),
  personnel: calculatePersonnel(otherCosts, driversAnnualPerDiem),
  insuranceTaxesManagementAndMarketing:
    calculateInsuranceTaxesManagementAndMarketing(
      annualInsuranceCosts,
      annualFiscalCost,
      fuelPrice,
      indirectCosts
    ),
  fuelRepairAndMaintenance: calculateFuelTireRepairAndMaintenance(
    kilometersTraveledAnnualy,
    fuelPrice,
    averageConsumption,
    costPerTirePerKm,
    maintenanceCostPerKm
  ),
});
