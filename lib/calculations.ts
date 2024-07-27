import { Prisma } from "@prisma/client";

type Servicio = Prisma.ServicioGetPayload<{
    include: { vehiculo: true; parametros: true };
}>;

export const amortizacion = ({
    vehiculo: { interes },
    parametros: {
        adquisicion,
        residual,
        vidaUtil,
        remolque,
        residualRemolque,
        vidaUtilRemolque,
    },
}: {
    vehiculo: Pick<Servicio["vehiculo"], "interes">;
    parametros: Pick<
        Servicio["parametros"],
        | "adquisicion"
        | "residual"
        | "vidaUtil"
        | "remolque"
        | "residualRemolque"
        | "vidaUtilRemolque"
    >;
}) => {
    return (
        (adquisicion - residual) / vidaUtil +
        (adquisicion - residual) *
            (-1 / vidaUtil + interes / (1 - Math.pow(1 + interes, -vidaUtil))) +
        (remolque - residualRemolque) / vidaUtilRemolque +
        (remolque - residualRemolque) *
            (-1 / vidaUtilRemolque +
                interes / (1 - Math.pow(1 + interes, -vidaUtilRemolque)))
    );
};

export const kmServicio = (servicio: Pick<Servicio, "kmCarga" | "kmVacio">) =>
    Number(servicio.kmCarga) + Number(servicio.kmVacio);

export const costePorDistancia = (
    servicio: Pick<Servicio, "kmCarga" | "kmVacio" | "consumo" | "peajes"> & {
        vehiculo: Pick<Servicio["vehiculo"], "neumaticos" | "mantenimiento">;
        parametros: Pick<Servicio["parametros"], "carburante" | "km">;
    }
) =>
    (servicio.parametros.km / 100) *
        servicio.consumo *
        servicio.parametros.carburante +
    servicio.vehiculo.neumaticos * servicio.parametros.km +
    servicio.vehiculo.mantenimiento * servicio.parametros.km;

export const horasServicio = (
    servicio: Pick<Servicio, "horasCarga" | "horasVacio" | "horasParalizacion">
) =>
    Number(servicio.horasCarga) +
    Number(servicio.horasVacio) +
    Number(servicio.horasParalizacion);

export const costePorTiempo = (servicio: Servicio) => {
    return (
        amortizacion(servicio) +
        servicio.parametros.conductor +
        servicio.parametros.dietas +
        servicio.parametros.seguros +
        servicio.parametros.fiscal +
        servicio.parametros.carburante +
        servicio.parametros.indirectos
    );
};
