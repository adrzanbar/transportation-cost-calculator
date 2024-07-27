"use server";

import { formSchema, FormData } from "@/app/validation";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";

export async function calculateServiceCost(formData: FormData) {
    const validation = await formSchema.safeParseAsync(formData);
    if (!validation.success) return validation.error;
    const servicio = await prisma.servicio.create({
        data: {
            ...validation.data,
            fecha: new Date(),
            vehiculo: {
                connect: {
                    nombre: validation.data.vehiculo.nombre,
                },
            },
            parametros: {
                create: validation.data.parametros,
            },
        },
    });
    if (servicio) return redirect(`/servicio/${servicio.id}`);
}
