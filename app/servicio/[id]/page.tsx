import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { amortizacion, costePorDistancia } from "@/lib/calculations";
import prisma from "@/prisma/prisma";
import { notFound } from "next/navigation";
import { Component as PieChart } from "@/components/pie-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getFixedNumberWithFallback } from "@/lib/utils";

const chartData = [
    { name: "chrome", data: 275, fill: "var(--color-chrome)" },
    { name: "safari", data: 200, fill: "var(--color-safari)" },
    { name: "firefox", data: 287, fill: "var(--color-firefox)" },
    { name: "edge", data: 173, fill: "var(--color-edge)" },
    { name: "other", data: 190, fill: "var(--color-other)" },
];

const chartConfig = {
    data: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export default async function Page({ params }: { params: { id: string } }) {
    const servicio = await prisma.servicio.findUnique({
        where: { id: Number(params.id) },
        include: { vehiculo: true, parametros: true },
    });
    if (!servicio) notFound();
    const cpd = costePorDistancia(servicio);
    const cpt = costePorDistancia(servicio);
    const total = cpd + cpt + amortizacion(servicio);
    return (
        <main className="flex justify-center flex-wrap m-2 p-2 gap-2">
            <div className="flex gap-2">
                <Card className="w-72">
                    <CardHeader>
                        <CardTitle>Coste por distancia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 justify-between">
                            <p>US$</p>
                            <p className="text-right">
                                {getFixedNumberWithFallback(
                                    cpd,
                                    2,
                                    "calculando"
                                ).toLocaleString("es-AR")}
                            </p>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <p>AR$</p>
                            <p className="text-right">
                                {getFixedNumberWithFallback(
                                    cpd * servicio.dolar,
                                    2,
                                    "calculando"
                                ).toLocaleString("es-AR")}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-72">
                    <CardHeader>
                        <CardTitle>Coste por tiempo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 justify-between">
                            <p>US$</p>
                            <p className="text-right">
                                {getFixedNumberWithFallback(
                                    cpt,
                                    2,
                                    "calculando"
                                ).toLocaleString("es-AR")}
                            </p>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <p className="text-right">AR$</p>
                            <p>
                                {getFixedNumberWithFallback(
                                    cpt * servicio.dolar,
                                    2,
                                    "calculando"
                                ).toLocaleString("es-AR")}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Coste total de este Servicio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 justify-between">
                            <p>US$</p>
                            <p className="text-right font-bold">
                                {getFixedNumberWithFallback(
                                    total,
                                    2,
                                    "calculando"
                                ).toLocaleString("es-AR")}
                            </p>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <p>AR$</p>
                            <p className="text-right font-bold">
                                {getFixedNumberWithFallback(
                                    total * servicio.dolar,
                                    2,
                                    "calculando"
                                ).toLocaleString("es-AR")}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-row gap-2">
                <PieChart chartData={chartData} chartConfig={chartConfig} />
                <PieChart chartData={chartData} chartConfig={chartConfig} />
            </div>
        </main>
    );
}
