"use client";

import * as React from "react";
import ReactDOM from "react-dom";

import { Label, LabelList, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "@/lib/utils";

const chartData = [
    { costo: "amortizacion", dolares: 275, fill: "var(--color-amortizacion)" },
    { costo: "personal", dolares: 200, fill: "var(--color-personal)" },
    { costo: "seguros", dolares: 287, fill: "var(--color-seguros)" },
    { costo: "combustible", dolares: 173, fill: "var(--color-combustible)" },
];

const chartConfig = {
    dolares: {
        label: "US$",
    },
    amortizacion: {
        label: "Amortización y gastos financieros",
        color: "hsl(var(--chart-1))",
    },
    personal: {
        label: "Personal",
        color: "hsl(var(--chart-2))",
    },
    seguros: {
        label: "Seguros, costes fiscales, gestión y comercialización",
        color: "hsl(var(--chart-3))",
    },
    combustible: {
        label: "Combustible, neumáticos, reparaciones, mantenimiento",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

export function CostStructurePieChart({
    costos,
    estadisticos,
}: {
    costos: number[];
    estadisticos: number[];
}) {
    const costosData = chartData.map((item, index) => ({
        ...item,
        dolares: costos[index],
    }));
    const estadisticosData = chartData.map((item, index) => ({
        ...item,
        dolares: estadisticos[index],
    }));

    const totalCostos = costosData.reduce((acc, curr) => acc + curr.dolares, 0);
    const totalEstadisticos = estadisticosData.reduce(
        (acc, curr) => acc + curr.dolares,
        0
    );

    return (
        <div className="space-y-2">
            <h2 className="text-center text-2xl font-bold">
                Estructura de costos
            </h2>
            <div className="flex flex-row">
                <Card className="flex flex-col flex-1">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Con parámetros</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer config={chartConfig}>
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={costosData}
                                    dataKey="dolares"
                                    nameKey="costo"
                                    innerRadius={60}
                                    strokeWidth={5}
                                    label
                                >
                                    <LabelList
                                        dataKey="browser"
                                        className="fill-primary"
                                        stroke="none"
                                        fontSize={12}
                                        formatter={(
                                            value: keyof typeof chartConfig
                                        ) => chartConfig[value]?.label}
                                    />
                                    <Label
                                        content={({ viewBox }) => {
                                            if (
                                                viewBox &&
                                                "cx" in viewBox &&
                                                "cy" in viewBox
                                            ) {
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
                                                            {format(
                                                                totalCostos
                                                            )}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={
                                                                (viewBox.cy ||
                                                                    0) + 24
                                                            }
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
                <Card className="flex flex-col flex-1">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Datos estadísticos</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer config={chartConfig}>
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={estadisticosData}
                                    dataKey="dolares"
                                    nameKey="costo"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (
                                                viewBox &&
                                                "cx" in viewBox &&
                                                "cy" in viewBox
                                            ) {
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
                                                            {format(
                                                                totalEstadisticos
                                                            )}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={
                                                                (viewBox.cy ||
                                                                    0) + 24
                                                            }
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
                                <ChartLegend
                                    content={
                                        <ChartLegendContent nameKey="costo" />
                                    }
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
