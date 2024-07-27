"use client";

import * as React from "react";
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

export type ComponentProps = {
    chartData: {
        name: string;
        data: number;
        fill: string;
    }[];
    chartConfig: ChartConfig;
    title: string;
    unit: string;
};

export function Component({
    chartData,
    chartConfig,
    title,
    unit,
}: ComponentProps) {
    const total = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.data, 0);
    }, [chartData]);

    return (
        <Card className="flex flex-col gap-2 m-2 p-2">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="data"
                            nameKey="name"
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
                                                    {total.toLocaleString(
                                                        "es-AR"
                                                    )}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {unit}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                            <LabelList
                                dataKey="name"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    `${(
                                        ((chartData.find(
                                            (d) => d.name === value
                                        )?.data || 0) /
                                            total) *
                                        100
                                    ).toLocaleString("es-AR")}%`
                                }
                            />
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
