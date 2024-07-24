import { CostStructurePieChart } from "@/components/cost-pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { amortizacion } from "@/lib/calculations";
import { format } from "@/lib/utils";
import prisma from "@/prisma/prisma";

export default async function Page({ params }: { params: { id: string } }) {
    const servicio = await prisma.servicio.findUnique({
        where: { id: Number(params.id) },
        include: { vehiculo: true, parametros: true },
    });
    if (!servicio) return "Error loading servicio";
    const vehiculo = await prisma.vehiculo.findUnique({
        where: { nombre: servicio.vehiculo.nombre },
        include: { parametros: true },
    });
    if (!vehiculo) return "Error loading vehiculo";
    const kmServicio = Number(servicio.kmCarga) + Number(servicio.kmVacio);
    const costePorDistancia = vehiculo
        ? ((kmServicio * servicio.consumo) / 100) *
              servicio.parametros.carburante +
          (kmServicio * (vehiculo.neumaticos + vehiculo.mantenimiento)) /
              servicio.parametros.km +
          servicio.peajes
        : 0;
    const horasServicio =
        Number(servicio.horasCarga) +
        Number(servicio.horasVacio) +
        Number(servicio.horasParalizacion);
    const costePorTiempo =
        (horasServicio * amortizacion(servicio) +
            servicio.parametros.conductor +
            servicio.parametros.dietas +
            servicio.parametros.seguros +
            servicio.parametros.fiscal +
            servicio.parametros.carburante +
            servicio.parametros.indirectos) /
        servicio.parametros.horas;
    const total = costePorDistancia + costePorTiempo + servicio.otros;
    return (
        <main className="space-y-2 p-2 m-2">
            <div className="flex gap-2 m-auto">
                <Card>
                    <CardHeader className="space-y-2">
                        <CardTitle>Coste por distancia</CardTitle>
                        <CardContent>
                            <div className="flex gap-2 justify-between">
                                <p>US$</p>
                                <p className="text-right">
                                    {format(costePorDistancia)}
                                </p>
                            </div>
                            <div className="flex gap-2 justify-between">
                                <p>AR$</p>
                                <p className="text-right">
                                    {format(costePorDistancia * servicio.dolar)}
                                </p>
                            </div>
                        </CardContent>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Coste por tiempo</CardTitle>
                        <CardContent>
                            <div className="flex gap-2 justify-between">
                                <p>US$</p>
                                <p className="text-right">
                                    {format(costePorTiempo)}
                                </p>
                            </div>
                            <div className="flex gap-2 justify-between">
                                <p className="text-right">AR$</p>
                                <p>{format(costePorTiempo * servicio.dolar)}</p>
                            </div>
                        </CardContent>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Coste total de este servicio</CardTitle>
                        <CardContent>
                            <div className="flex gap-2 justify-between">
                                <p>US$</p>
                                <p className="text-right font-bold">
                                    {format(total)}
                                </p>
                            </div>
                            <div className="flex gap-2 justify-between">
                                <p>AR$</p>
                                <p className="text-right font-bold">
                                    {format(total * servicio.dolar)}
                                </p>
                            </div>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>

            <div>
                <CostStructurePieChart
                    costos={[
                        amortizacion(servicio),
                        servicio.parametros.conductor +
                            servicio.parametros.dietas,
                        servicio.parametros.seguros +
                            servicio.parametros.fiscal +
                            servicio.parametros.carburante +
                            servicio.parametros.indirectos,
                        (servicio.parametros.km / 100) *
                            servicio.parametros.consumo *
                            servicio.parametros.carburante +
                            servicio.vehiculo.neumaticos *
                                servicio.parametros.km +
                            servicio.vehiculo.mantenimiento *
                                servicio.parametros.km,
                    ].map((costo) => Number(costo.toFixed(2)))}
                    estadisticos={[
                        amortizacion({
                            vehiculo,
                            parametros: vehiculo.parametros,
                        }),
                        vehiculo.parametros.conductor +
                            vehiculo.parametros.dietas,
                        vehiculo.parametros.seguros +
                            vehiculo.parametros.fiscal +
                            vehiculo.parametros.carburante +
                            vehiculo.parametros.indirectos,
                        (vehiculo.parametros.km / 100) *
                            vehiculo.parametros.consumo *
                            vehiculo.parametros.carburante +
                            vehiculo.neumaticos * vehiculo.parametros.km +
                            vehiculo.mantenimiento * vehiculo.parametros.km,
                    ].map((costo) => Number(costo.toFixed(2)))}
                />
            </div>
        </main>
    );
}
