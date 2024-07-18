import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const vehiculos = [
    {
        nombre: "Vehículo articulado de 5 ejes (Larga distancia)",
        interes: 0.05,
        mantenimiento: 0.02,
        neumaticos: 0.2475,
        parametros: {
            km: 175000,
            horas: 2800,
            adquisicion: 119400,
            vidaUtil: 10,
            residual: 14000,
            remolque: 13800,
            vidaUtilRemolque: 10,
            residualRemolque: 3000,
            conductor: 9300,
            dietas: 2512.8,
            seguros: 2980,
            fiscal: 3830,
            carburante: 0.81,
            consumo: 42,
            indirectos: 9101,
        },
    },
    {
        nombre: "Camión con caja volcadora (Corta distancia)",
        interes: 0.05,
        mantenimiento: 0.02,
        neumaticos: 0.0825,
        parametros: {
            km: 35000,
            horas: 1800,
            adquisicion: 74800,
            vidaUtil: 10,
            residual: 9000,
            remolque: 0,
            vidaUtilRemolque: 0,
            residualRemolque: 0,
            conductor: 8700,
            dietas: 2104.8,
            seguros: 2580,
            fiscal: 2466,
            carburante: 0.81,
            consumo: 35,
            indirectos: 2459.07,
        },
    },
    {
        nombre: "Minitruck pick-up (Corta distancia)",
        interes: 0.05,
        mantenimiento: 0.01,
        neumaticos: 0.0216,
        parametros: {
            km: 20000,
            horas: 2100,
            adquisicion: 28620,
            vidaUtil: 10,
            residual: 3300,
            remolque: 0,
            vidaUtilRemolque: 0,
            residualRemolque: 0,
            conductor: 8500,
            dietas: 2104.8,
            seguros: 1070,
            fiscal: 920,
            carburante: 0.81,
            consumo: 17,
            indirectos: 1251.89,
        },
    },
];
async function main() {
    for (const vehiculo of vehiculos) {
        console.log("vehiculo", vehiculo);
        await prisma.vehiculo.create({
            data: {
                ...vehiculo,
                parametros: {
                    create: { ...vehiculo.parametros },
                },
            },
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
