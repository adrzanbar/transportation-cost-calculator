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
        ((adquisicion - residual) / vidaUtil +
            (((adquisicion - residual) / -vidaUtil) * interes) /
                (1 - Math.pow(1 + interes, -vidaUtil)) || 0) +
        ((remolque - residualRemolque) / vidaUtilRemolque +
            (((remolque - residualRemolque) / -vidaUtilRemolque) * interes) /
                (1 - Math.pow(1 + interes, -vidaUtilRemolque)) || 0)
    );
};

export const kmServicio = (servicio: Pick<Servicio, "kmCarga" | "kmVacio">) =>
    Number(servicio.kmCarga) + Number(servicio.kmVacio);

export const costePorDistancia = (
    servicio: Pick<Servicio, "kmCarga" | "kmVacio" | "consumo" | "peajes"> & {
        vehiculo: Pick<Servicio["vehiculo"], "neumaticos" | "mantenimiento">;
        parametros: Pick<Servicio["parametros"], "carburante" | "km">;
    }
) => {
    const ks = kmServicio(servicio);
    return (
        ((ks * servicio.consumo) / 100) * servicio.parametros.carburante +
        (ks *
            (servicio.vehiculo.neumaticos + servicio.vehiculo.mantenimiento)) /
            servicio.parametros.km +
        servicio.peajes
    );
};

export const horasServicio = (
    servicio: Pick<Servicio, "horasCarga" | "horasVacio" | "horasParalizacion">
) =>
    Number(servicio.horasCarga) +
    Number(servicio.horasVacio) +
    Number(servicio.horasParalizacion);

export const costePorTiempo = (servicio: Servicio) => {
    return (
        horasServicio(servicio) * amortizacion(servicio) +
        servicio.parametros.conductor +
        servicio.parametros.dietas +
        servicio.parametros.seguros +
        servicio.parametros.fiscal +
        servicio.parametros.carburante +
        servicio.parametros.indirectos / servicio.parametros.horas
    );
};
