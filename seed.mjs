import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const vehicles = [
  {
    name: "Vehículo articulado de 5 ejes (Larga distancia)",
    kilometersTraveledAnnualy: 175000,
    hoursWorkedPerYear: 2800,
    vehicleAcquisitionValue: 119400,
    vehicleUsefulLife: 10,
    vehicleResidualValue: 14000,
    trailerAcquisitionValue: 13800,
    trailerUsefulLife: 10,
    trailerResidualValue: 3000,
    otherCosts: 9300,
    driversAnnualPerDiem: 2512,
    annualInsuranceCosts: 2980,
    annualFiscalCost: 3830,
    fuelPrice: 0.81,
    averageConsumption: 42,
    indirectCosts: 9101.29,
    costPerTirePerKm: 0.2475,
    maintenanceCostPerKm: 0.2,
    interestRate: 0.05,
  },
  {
    name: "Camión con caja volcadora (Corta distancia)",
    kilometersTraveledAnnualy: 35000,
    hoursWorkedPerYear: 1800,
    vehicleAcquisitionValue: 74400,
    vehicleUsefulLife: 10,
    vehicleResidualValue: 9000,
    trailerAcquisitionValue: 0,
    trailerUsefulLife: 0,
    trailerResidualValue: 0,
    otherCosts: 8700,
    driversAnnualPerDiem: 2104.8,
    annualInsuranceCosts: 2580,
    annualFiscalCost: 2466,
    fuelPrice: 0.81,
    averageConsumption: 35,
    indirectCosts: 2459,
    costPerTirePerKm: 0.0825,
    maintenanceCostPerKm: 0.2,
    interestRate: 0.05,
  },
  {
    name: "Minitruck pick-up (Corta distancia)",
    kilometersTraveledAnnualy: 20000,
    hoursWorkedPerYear: 2100,
    vehicleAcquisitionValue: 28620,
    vehicleUsefulLife: 10,
    vehicleResidualValue: 3300,
    trailerAcquisitionValue: 0,
    trailerUsefulLife: 0,
    trailerResidualValue: 0,
    otherCosts: 8500,
    driversAnnualPerDiem: 2104.8,
    annualInsuranceCosts: 1070,
    annualFiscalCost: 920,
    fuelPrice: 0.81,
    averageConsumption: 17,
    indirectCosts: 1251.89,
    costPerTirePerKm: 0.0216,
    maintenanceCostPerKm: 0.1,
    interestRate: 0.05,
  },
];

async function main() {
  vehicles.forEach(async (vehicle) => {
    await prisma.vehicle.create({
      data: vehicle,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
