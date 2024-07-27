"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Prisma } from "@prisma/client";
import { calculateServiceCost } from "@/app/actions";
import { formSchema, FormData } from "@/app/validation";
import { useEffect } from "react";
import { horasServicio, kmServicio } from "@/lib/calculations";

type VehiculoWithParametros = Prisma.VehiculoGetPayload<{
    include: { parametros: true };
}>;

const defaultVehiculo = {
    nombre: "",
    neumaticos: 0,
    mantenimiento: 0,
    interes: 0,
    parametros: {
        horas: 0,
        conductor: 0,
        dietas: 0,
        adquisicion: 0,
        vidaUtil: 0,
        residual: 0,
        remolque: 0,
        vidaUtilRemolque: 0,
        residualRemolque: 0,
        seguros: 0,
        fiscal: 0,
        indirectos: 0,
        carburante: 0,
        consumo: 0,
        km: 0,
    },
};

export default function CalculatorForm({
    vehiculos,
    dolar,
}: {
    vehiculos: VehiculoWithParametros[];
    dolar: number;
}) {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehiculo: { ...vehiculos[0] },
            ...vehiculos[0],
            dolar: Number.isInteger(dolar) ? dolar : Number(dolar.toFixed(2)),
            kmCarga: 0,
            kmVacio: 0,
            consumo: 0,
            horasCarga: 0,
            horasVacio: 0,
            horasParalizacion: 0,
            peajes: 0,
            otros: 0,
        },
    });

    const formData = form.watch();

    const vehiculo =
        vehiculos.find(
            (vehiculo) => vehiculo.nombre === formData.vehiculo.nombre
        ) || defaultVehiculo;

    useEffect(() => {
        form.setValue("parametros", vehiculo.parametros);
    }, [vehiculo, form]);

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-2 p-2 m-2"
                onSubmit={form.handleSubmit(async (values) => {
                    await calculateServiceCost(values);
                })}
            >
                <FormField
                    control={form.control}
                    name="vehiculo.nombre"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormLabel>Vehiculo</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un vehículo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {vehiculos.map((v) => (
                                        <SelectItem
                                            key={v.nombre}
                                            value={v.nombre}
                                        >
                                            {v.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <Accordion type="single" collapsible defaultValue="servicio">
                    <AccordionItem value="parametros">
                        <AccordionTrigger>Parámetros</AccordionTrigger>
                        <AccordionContent className="flex flex-wrap gap-2 justify-center">
                            <div className="flex flex-col gap-2 p-2 border rounded">
                                <FormField
                                    control={form.control}
                                    name="parametros.horas"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Horas trabajadas al año
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parametros.conductor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Coste total anual del conductor,
                                                incluidos costes de empresa,
                                                Seg. Soc y otros (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parametros.dietas"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Dietas anuales del conductor
                                                (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 p-2 border rounded">
                                <FormField
                                    control={form.control}
                                    name="parametros.adquisicion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Valor de adquisición del
                                                vehículo sin IVA y sin
                                                neumáticos (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parametros.vidaUtil"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Vida útil del vehículo (años)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parametros.residual"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Valor residual sin IVA del
                                                vehículo (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 p-2 border rounded">
                                <FormField
                                    control={form.control}
                                    name="parametros.remolque"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Valor de adquisición del
                                                remolque-semirremolque sin IVA y
                                                sin neumáticos (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parametros.vidaUtilRemolque"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Vida útil del
                                                remolque-semirremolque (años)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parametros.residualRemolque"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Valor residual del
                                                remolque-semirremolque sin IVA
                                                (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 p-2 border rounded">
                                <FormField
                                    control={form.control}
                                    name="parametros.seguros"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Coste total anual de los seguros
                                                (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parametros.fiscal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Coste fiscal total anual (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parametros.indirectos"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Total costes anuales indirectos
                                                repercutibles a este vehículo
                                                (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 p-2 border rounded">
                                <FormField
                                    control={form.control}
                                    name="parametros.carburante"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Precio carburante sin IVA
                                                (US$/litro)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parametros.consumo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Consumo medio (litros/100km)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Gasto total anual en carburante, sin IVA
                                        (US$)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-right font-bold"
                                            readOnly
                                            value={(
                                                formData.parametros.carburante *
                                                formData.parametros.km
                                            )
                                                .toLocaleString("es-AR")
                                                .replace("NaN", "")}
                                        />
                                    </FormControl>
                                </FormItem>
                            </div>

                            <div className="flex flex-col gap-2 p-2 border rounded">
                                <FormField
                                    control={form.control}
                                    name="parametros.km"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Kilómetros recorridos anualmente
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Gasto total anual en neumáticos (US$)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-right font-bold"
                                            readOnly
                                            value={(
                                                vehiculo.neumaticos *
                                                formData.parametros.km
                                            )
                                                .toLocaleString("es-AR")
                                                .replace("NaN", "")}
                                        />
                                    </FormControl>
                                </FormItem>
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Gasto anual en mantenimiento sin IVA
                                        (US$)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-right font-bold"
                                            readOnly
                                            value={(
                                                vehiculo.mantenimiento *
                                                formData.parametros.km
                                            )
                                                .toLocaleString("es-AR")
                                                .replace("NaN", "")}
                                        />
                                    </FormControl>
                                </FormItem>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="servicio">
                        <AccordionTrigger>Servicio</AccordionTrigger>
                        <AccordionContent className="flex flex-wrap gap-2 justify-center">
                            <div className="flex flex-col gap-2 p-2 border rounded">
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Kilómetros recorridos en este servicio
                                        (km)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-right font-bold"
                                            readOnly
                                            value={kmServicio(formData)
                                                .toLocaleString("es-AR")
                                                .replace("NaN", "")}
                                        />
                                    </FormControl>
                                </FormItem>
                                <FormField
                                    control={form.control}
                                    name="kmCarga"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Kilómetros en carga (km)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="kmVacio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Kilómetros en vacío (km)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 p-2 border rounded">
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Horas empleadas en este servicio
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-right font-bold"
                                            readOnly
                                            value={horasServicio(formData)
                                                .toLocaleString("es-AR")
                                                .replace("NaN", "")}
                                        />
                                    </FormControl>
                                </FormItem>
                                <FormField
                                    control={form.control}
                                    name="horasCarga"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Horas en carga
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="horasVacio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Horas en vacío
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="horasParalizacion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Horas en carga, descarga y
                                                paralización
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 p-2 border rounded">
                                <FormField
                                    control={form.control}
                                    name="consumo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Consumo medio por kilómetro en
                                                este servicio (litros / 100 km)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="peajes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Peajes</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="otros"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Otros costes asociados a este
                                                servicio (US$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dolar"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {`Cotización Dólar ${new Date().toLocaleDateString()}`}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-right"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Button type="submit" className="w-full">
                    Calcular costo del servicio
                </Button>
            </form>
        </Form>
    );
}
