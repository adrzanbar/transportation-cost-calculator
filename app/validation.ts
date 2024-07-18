import { z } from "zod";

const coerceNumberNonNegative = z.coerce.number({ coerce: true }).nonnegative();

export const formSchema = z.object({
    vehiculo: z.object({
        nombre: z.string(),
    }),
    parametros: z.object({
        km: coerceNumberNonNegative,
        horas: coerceNumberNonNegative,
        adquisicion: coerceNumberNonNegative,
        vidaUtil: coerceNumberNonNegative,
        residual: coerceNumberNonNegative,
        remolque: coerceNumberNonNegative,
        vidaUtilRemolque: coerceNumberNonNegative,
        residualRemolque: coerceNumberNonNegative,
        conductor: coerceNumberNonNegative,
        dietas: coerceNumberNonNegative,
        seguros: coerceNumberNonNegative,
        fiscal: coerceNumberNonNegative,
        carburante: coerceNumberNonNegative,
        consumo: coerceNumberNonNegative,
        indirectos: coerceNumberNonNegative,
    }),
    kmCarga: coerceNumberNonNegative,
    kmVacio: coerceNumberNonNegative,
    consumo: coerceNumberNonNegative,
    horasCarga: coerceNumberNonNegative,
    horasVacio: coerceNumberNonNegative,
    horasParalizacion: coerceNumberNonNegative,
    peajes: coerceNumberNonNegative,
    otros: coerceNumberNonNegative,
    dolar: coerceNumberNonNegative,
});

export type FormData = z.infer<typeof formSchema>;
