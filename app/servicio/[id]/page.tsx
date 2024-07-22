import CostPieChart from "@/components/pie-chart";
import prisma from "@/prisma/prisma";

export default async function Page({ params }: { params: { id: string } }) {
    const servicio = await prisma.servicio.findUnique({
        where: { id: Number(params.id) },
        include: { vehiculo: true, parametros: true },
    });
    return (
        <div>
            {JSON.stringify(servicio)}
            <CostPieChart />
        </div>
    );
}
