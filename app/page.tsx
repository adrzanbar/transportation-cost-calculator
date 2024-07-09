import Calculator from "@/components/calculator";
import db from "@/db";

export default async function Home() {
  const vehicles = await db.vehicle.findMany({
    select: {
      name: true,
      kilometersTraveledAnnualy: true,
      hoursWorkedPerYear: true,
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
      interestRate: false,
    },
  });
  return (
    <main>
      <Calculator vehicles={vehicles} />
    </main>
  );
}
