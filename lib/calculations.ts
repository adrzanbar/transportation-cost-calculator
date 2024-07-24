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
