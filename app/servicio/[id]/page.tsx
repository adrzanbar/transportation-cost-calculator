import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { amortizacion, costePorDistancia } from "@/lib/calculations";
import prisma from "@/prisma/prisma";
import { notFound } from "next/navigation";
import { Component as PieChart } from "@/components/pie-chart";
import { ChartConfig } from "@/components/ui/chart";

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
    const estructuraCostesAnualesData = [
        {
            name: "amortizacion",
            data: amortizacion(servicio),
            fill: "var(--color-amortizacion)",
        },
        {
            name: "personal",
            data: servicio.parametros.conductor + servicio.parametros.dietas,
            fill: "var(--color-personal)",
        },
        {
            name: "seguros",
            data:
                servicio.parametros.seguros +
                servicio.parametros.fiscal +
                servicio.parametros.carburante +
                servicio.parametros.indirectos,
            fill: "var(--color-seguros)",
        },
        {
            name: "combustible",
            data:
                (servicio.parametros.km / 100) *
                    servicio.parametros.consumo *
                    servicio.parametros.carburante +
                servicio.vehiculo.neumaticos * servicio.parametros.km +
                servicio.vehiculo.mantenimiento * servicio.parametros.km,
            fill: "var(--color-combustible)",
        },
    ];
    const estructuraCostesAnualesConfig = {
        data: {
            label: "Costes",
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
    return (
        <main className="flex justify-center flex-wrap m-2 p-2 gap-2">
            <div className="grid grid-cols-3 gap-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Coste por distancia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <p>US$</p>
                            <p className="text-right">
                                {cpd.toLocaleString("es-AR")}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>AR$</p>
                            <p className="text-right">
                                {(cpd * servicio.dolar).toLocaleString("es-AR")}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Coste por tiempo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <p>US$</p>
                            <p className="text-right">
                                {cpt.toLocaleString("es-AR")}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-right">AR$</p>
                            <p>
                                {(cpt * servicio.dolar).toLocaleString("es-AR")}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Coste total de este Servicio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <p>US$</p>
                            <p className="text-right font-bold">
                                {total.toLocaleString("es-AR")}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>AR$</p>
                            <p className="text-right font-bold">
                                {(total * servicio.dolar).toLocaleString(
                                    "es-AR"
                                )}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <PieChart
                    chartData={estructuraCostesAnualesData}
                    chartConfig={estructuraCostesAnualesConfig}
                    title="Estructura de costes anuales"
                />
                <PieChart
                    chartData={chartData}
                    chartConfig={chartConfig}
                    title="Costes por tiempo - costes por distancia"
                />
            </div>
        </main>
    );
}
