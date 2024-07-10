import { AnnualCostPieChart } from "@/components/pie-chart";
import { ReadonlyURLSearchParams } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { ["results"]: string[] };
}) {
  const costData = params.results.slice(1).map(Number);
  console.log(costData);
  return (
    <main>
      <h1>Results</h1>
      <AnnualCostPieChart costData={costData} />
    </main>
  );
}
