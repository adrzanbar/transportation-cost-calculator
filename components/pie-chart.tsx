"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Costs = {
  amorotizationAndFinancialExpenses: number;
  personnel: number;
  insuranceTaxesManagementAndMarketing: number;
  fuelRepairAndMaintenance: number;
};

const chartData = [
  {
    category: "amortizationAndFinancialExpenses",
    cost: 0,
    fill: "hsl(var(--chart-1))",
  },
  {
    category: "personnel",
    cost: 0,
    fill: "hsl(var(--chart-2))",
  },
  {
    category: "insuranceTaxesManagementAndMarketing",
    cost: 0,
    fill: "hsl(var(--chart-3))",
  },
  {
    category: "fuelRepairAndMaintenance",
    cost: 0,
    fill: "hsl(var(--chart-4))",
  },
];

const chartConfig = {
  visitors: {
    label: "Costos anuales",
  },
  amortizationAndFinancialExpenses: {
    label: "Amortización y gastos financieros",
    color: "var(--color-1)",
  },
  personnel: {
    label: "Personal",
    color: "var(--color-2)",
  },
  insuranceTaxesManagementAndMarketing: {
    label: "Seguros, costes fiscales, gestión y comercialización",
    color: "var(--color-3)",
  },
  fuelRepairAndMaintenance: {
    label: "Combustible, neumáticos, reparaciones, mantenimiento",
    color: "var(--color-4)",
  },
} satisfies ChartConfig;

export function AnnualCostPieChart({
  costData,
  label,
}: {
  costData: number[];
  label: string;
}) {
  React.useEffect(() => {
    for (let i = 0; i < costData.length; i++) {
      chartData[i].cost = costData[i];
    }
  }, []);
  const totalCost = React.useMemo(() => {
    return costData.reduce((acc, cost) => acc + cost, 0);
  }, [costData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="cost"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCost.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          US$
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
