import { Prisma } from "@prisma/client";

type Servicio = Prisma.ServicioGetPayload<{
    include: { vehiculo: true; parametros: true };
}>;

export const amortizacionYGastosFinancieros = ({
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

export const combustibleNeumaticoReparacionMantenimiento = (
    servicio: Pick<Servicio, "kmCarga" | "kmVacio" | "peajes"> & {
        vehiculo: Pick<Servicio["vehiculo"], "neumaticos" | "mantenimiento">;
        parametros: Pick<
            Servicio["parametros"],
            "carburante" | "km" | "consumo"
        >;
    }
) =>
    servicio.parametros.km *
    ((servicio.parametros.carburante * servicio.parametros.consumo) / 100 +
        servicio.vehiculo.neumaticos +
        servicio.vehiculo.mantenimiento);

export const horasServicio = (
    servicio: Pick<Servicio, "horasCarga" | "horasVacio" | "horasParalizacion">
) =>
    Number(servicio.horasCarga) +
    Number(servicio.horasVacio) +
    Number(servicio.horasParalizacion);

export const costePorTiempo = (servicio: Servicio) =>
    amortizacionYGastosFinancieros(servicio) +
    personal(servicio) +
    segurosFiscalesGestionComercializacion(servicio);

export const costePorDistanciaServicio = (servicio: Servicio) => {
    const ks = kmServicio(servicio);
    return (
        ((ks * servicio.consumo) / 100) * servicio.parametros.carburante +
        ks * (servicio.vehiculo.neumaticos + servicio.vehiculo.mantenimiento) +
        servicio.peajes
    );
};

export const personal = (servicio: Servicio) =>
    servicio.parametros.conductor + servicio.parametros.dietas;

export const segurosFiscalesGestionComercializacion = (servicio: Servicio) =>
    servicio.parametros.seguros +
    servicio.parametros.fiscal +
    servicio.parametros.carburante +
    servicio.parametros.indirectos;

export const costePorTiempoServicio = (servicio: Servicio) =>
    (horasServicio(servicio) *
        (amortizacionYGastosFinancieros(servicio) +
            personal(servicio) +
            segurosFiscalesGestionComercializacion(servicio))) /
    servicio.parametros.horas;
