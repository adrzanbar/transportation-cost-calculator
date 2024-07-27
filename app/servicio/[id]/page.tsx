import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    amortizacionYGastosFinancieros,
    combustibleNeumaticoReparacionMantenimiento,
    costePorDistanciaServicio,
    costePorTiempo,
    costePorTiempoServicio,
    personal,
    segurosFiscalesGestionComercializacion,
} from "@/lib/calculations";
import prisma from "@/prisma/prisma";
import { notFound } from "next/navigation";
import { CostPieChart } from "@/components/cost-pie-chart";
import { ChartConfig } from "@/components/ui/chart";
import { CostTable } from "@/components/cost-table";

export default async function Page({ params }: { params: { id: string } }) {
    const servicio = await prisma.servicio.findUnique({
        where: { id: Number(params.id) },
        include: { vehiculo: true, parametros: true },
    });
    if (!servicio) notFound();
    const cpt = costePorTiempo(servicio);
    const cpd = combustibleNeumaticoReparacionMantenimiento(servicio);
    const cpds = costePorDistanciaServicio(servicio);
    const cpts = costePorTiempoServicio(servicio);
    const total = cpds + cpts + servicio.otros;
    const estructuraCostesAnualesData = [
        {
            name: "amortizacion",
            data: amortizacionYGastosFinancieros(servicio),
            fill: "var(--color-amortizacion)",
        },
        {
            name: "personal",
            data: personal(servicio),
            fill: "var(--color-personal)",
        },
        {
            name: "seguros",
            data: segurosFiscalesGestionComercializacion(servicio),
            fill: "var(--color-seguros)",
        },
        {
            name: "combustible",
            data: cpd,
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
    const tiempoVsDistanciaData = [
        {
            name: "tiempo",
            data: cpt,
            fill: "var(--color-tiempo)",
        },
        {
            name: "distancia",
            data: cpd,
            fill: "var(--color-distancia)",
        },
    ];
    const tiempoVsDistanciaConfig = {
        data: {
            label: "Costes",
        },
        tiempo: {
            label: "Coste por tiempo",
            color: "hsl(var(--chart-1))",
        },
        distancia: {
            label: "Coste por distancia",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;
    return (
        <main className="m-2 p-2 flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-2">
                <Card className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle>
                            Coste por distancia de este servicio
                        </CardTitle>
                        <CardDescription>por km</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <p>US$</p>
                            <p className="text-right">
                                {cpds.toLocaleString("es-AR")}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>AR$</p>
                            <p className="text-right">
                                {(cpds * servicio.dolar).toLocaleString(
                                    "es-AR"
                                )}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle>Coste por tiempo de este servicio</CardTitle>
                        <CardDescription>por hora</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <p>US$</p>
                            <p className="text-right">
                                {cpts.toLocaleString("es-AR")}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-right">AR$</p>
                            <p>
                                {(cpts * servicio.dolar).toLocaleString(
                                    "es-AR"
                                )}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle>Coste total</CardTitle>
                        <CardDescription>de este Servicio</CardDescription>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <CostPieChart
                    chartData={estructuraCostesAnualesData}
                    chartConfig={estructuraCostesAnualesConfig}
                    title="Estructura de costes anuales"
                    unit="US$"
                />
                <CostPieChart
                    chartData={tiempoVsDistanciaData}
                    chartConfig={tiempoVsDistanciaConfig}
                    title="Costes por tiempo - costes por distancia"
                    unit="€"
                />
            </div>
            <div>
                <CostTable
                    rows={[
                        {
                            name: "Coste total medio (por km. facturado)",
                            data: (cpt + cpd) / servicio.parametros.km,
                        },
                        {
                            name: "Coste total medio (por hora facturada)",
                            data: (cpt + cpd) / servicio.parametros.horas,
                        },
                        {
                            name: "Coste por distancia media (por km.)",
                            data: cpd / servicio.parametros.km,
                        },
                        {
                            name: "Coste por tiempo medio (por hora)",
                            data: cpt / servicio.parametros.horas,
                        },
                        {
                            name: "Costes totales por viajero-kilómetro",
                            data:
                                (cpt + cpd) /
                                servicio.parametros.km /
                                servicio.parametros.horas,
                        },
                    ]}
                />
            </div>
        </main>
    );
}
