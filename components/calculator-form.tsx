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
import { amortizacionYGastosFinancieros } from "@/lib/calculations";
import { useEffect } from "react";

type VehiculoWithParametros = Prisma.VehiculoGetPayload<{
    include: { parametros: true };
}>;

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
    const { setValue } = form;

    const vehiculo =
        vehiculos.find(
            (vehiculo) => vehiculo.nombre === formData.vehiculo.nombre
        ) || vehiculos[0];

    useEffect(() => {
        setValue("parametros", vehiculo.parametros);
    }, [vehiculo, setValue]);

    const gastoAnualCarburante =
        formData.parametros.carburante * formData.parametros.km;
    const gastoAnualNeumaticos = vehiculo
        ? vehiculo.neumaticos * formData.parametros.km
        : 0;
    const gastoAnualMantenimiento = vehiculo
        ? vehiculo.mantenimiento * formData.parametros.km
        : 0;
    const kmServicio = Number(formData.kmCarga) + Number(formData.kmVacio);
    const costePorDistancia = vehiculo
        ? ((kmServicio * formData.consumo) / 100) *
              formData.parametros.carburante +
          (kmServicio * (vehiculo.neumaticos + vehiculo.mantenimiento)) /
              formData.parametros.km +
          formData.peajes
        : 0;
    const horasServicio =
        Number(formData.horasCarga) +
        Number(formData.horasVacio) +
        Number(formData.horasParalizacion);
    const costePorTiempo =
        (horasServicio *
            (vehiculo
                ? amortizacionYGastosFinancieros({
                      ...formData,
                      vehiculo,
                  })
                : 0) +
            formData.parametros.conductor +
            formData.parametros.dietas +
            formData.parametros.seguros +
            formData.parametros.fiscal +
            formData.parametros.carburante +
            formData.parametros.indirectos) /
        formData.parametros.horas;

    return (
        <Form {...form}>
            <form
                className="p-2 m-2 space-y-2"
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
                        <AccordionContent className="flex flex-wrap gap-2 m-2 p-2 justify-center">
                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
                                <FormField
                                    control={form.control}
                                    name="parametros.horas"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Horas trabajadas al año
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
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
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
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
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
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
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
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
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                                            readOnly
                                            value={
                                                Number.isInteger(
                                                    gastoAnualCarburante
                                                )
                                                    ? gastoAnualCarburante
                                                    : Number(
                                                          gastoAnualCarburante.toFixed(
                                                              2
                                                          )
                                                      )
                                            }
                                            className="font-bold"
                                        />
                                    </FormControl>
                                </FormItem>
                            </div>

                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
                                <FormField
                                    control={form.control}
                                    name="parametros.km"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Kilómetros recorridos anualmente
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                            readOnly
                                            value={
                                                Number.isInteger(
                                                    gastoAnualNeumaticos
                                                )
                                                    ? gastoAnualNeumaticos
                                                    : Number(
                                                          gastoAnualNeumaticos.toFixed(
                                                              2
                                                          )
                                                      )
                                            }
                                            className="font-bold"
                                        />
                                    </FormControl>
                                </FormItem>
                                <FormItem className="font-bold">
                                    <FormLabel>
                                        Gasto anual en mantenimiento sin IVA
                                        (US$)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly
                                            value={
                                                Number.isInteger(
                                                    gastoAnualMantenimiento
                                                )
                                                    ? gastoAnualMantenimiento
                                                    : Number(
                                                          gastoAnualMantenimiento.toFixed(
                                                              2
                                                          )
                                                      )
                                            }
                                            className="font-bold"
                                        />
                                    </FormControl>
                                </FormItem>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="servicio">
                        <AccordionTrigger>Servicio</AccordionTrigger>
                        <AccordionContent className="flex flex-wrap gap-2 m-2 p-2 justify-center">
                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Kilómetros recorridos en este servicio
                                        (km)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly
                                            value={
                                                Number.isInteger(kmServicio)
                                                    ? kmServicio
                                                    : Number(
                                                          kmServicio.toFixed(2)
                                                      )
                                            }
                                            className="font-bold"
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
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Horas empleadas en este servicio
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly
                                            value={
                                                Number.isInteger(horasServicio)
                                                    ? horasServicio
                                                    : Number(
                                                          horasServicio.toFixed(
                                                              2
                                                          )
                                                      )
                                            }
                                            className="font-bold"
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
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
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
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-2 m-2 p-2 border rounded">
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Coste por distancia de este servicio
                                        (US$)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly
                                            value={
                                                Number.isInteger(
                                                    costePorDistancia
                                                )
                                                    ? costePorDistancia
                                                    : Number(
                                                          typeof costePorDistancia ===
                                                              "number"
                                                              ? costePorDistancia.toFixed(
                                                                    2
                                                                )
                                                              : 0
                                                      )
                                            }
                                            className="font-bold"
                                        />
                                    </FormControl>
                                </FormItem>
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Coste por tiempo de este servicio (US$)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly
                                            value={
                                                Number.isInteger(costePorTiempo)
                                                    ? costePorTiempo
                                                    : Number(
                                                          costePorTiempo.toFixed(
                                                              2
                                                          )
                                                      )
                                            }
                                            className="font-bold"
                                        />
                                    </FormControl>
                                </FormItem>
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
