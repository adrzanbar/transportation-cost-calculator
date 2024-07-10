import { AnnualCostPieChart } from "@/components/pie-chart";

export default async function Page({
  params,
}: {
  params: { ["results"]: string[] };
}) {
  return (
    <main>
      <h1>Results</h1>
      <div className="grid grid-cols-2 gap-4">
        <AnnualCostPieChart
          costData={params.results.slice(1, 5).map(Number)}
          label="Estructura de costes anuales"
        />
        <AnnualCostPieChart
          costData={params.results.slice(5).map(Number)}
          label="Datos estadísticos"
        />
      </div>
    </main>
  );
}
