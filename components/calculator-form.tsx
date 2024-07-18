"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
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
import { Label } from "./ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Vehiculo } from "@prisma/client";
import { calculateServiceCost } from "@/app/actions";

const coerceNumberNonNegative = z.coerce.number({ coerce: true }).nonnegative();

const formSchema = z.object({
    nombre: z.string(),
    kmCarga: coerceNumberNonNegative,
    kmVacio: coerceNumberNonNegative,
    consumo: coerceNumberNonNegative,
    horasCarga: coerceNumberNonNegative,
    horasVacio: coerceNumberNonNegative,
    horasParalizacion: coerceNumberNonNegative,
    peajes: coerceNumberNonNegative,
    otros: coerceNumberNonNegative,
    dolar: coerceNumberNonNegative,
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
});

export type FormData = z.infer<typeof formSchema>;
export default function CalculatorForm({
    vehiculos,
    dolar,
}: {
    vehiculos: Vehiculo[];
    dolar: number;
}) {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...vehiculos[0],
            dolar,
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
    const [nombre, ...formData] = form.watch([
        "nombre",
        "parametros.horas",
        "parametros.km",
        "parametros.adquisicion",
        "parametros.vidaUtil",
        "parametros.residual",
        "parametros.remolque",
        "parametros.vidaUtilRemolque",
        "parametros.residualRemolque",
        "parametros.conductor",
        "parametros.seguros",
        "parametros.fiscal",
        "parametros.dietas",
        "parametros.carburante",
        "parametros.consumo",
        "parametros.indirectos",
        "kmCarga",
        "kmVacio",
        "horasCarga",
        "horasVacio",
        "horasParalizacion",
        "peajes",
    ]);
    const [
        km,
        horas,
        adquisicion,
        vidaUtil,
        residual,
        remolque,
        vidaUtilRemolque,
        residualRemolque,
        conductor,
        dietas,
        seguros,
        fiscal,
        carburante,
        consumo,
        indirectos,
        kmCarga,
        kmVacio,
        horasCarga,
        horasVacio,
        horasParalizacion,
        peajes,
    ] = formData.map(Number);
    const vehiculo = vehiculos.find((v) => v.nombre === nombre);
    const kmServicio = (kmCarga || 0) + (kmVacio || 0);
    const neumaticos = (vehiculo?.neumaticos || 0) * km;
    const mantenimiento = (vehiculo?.mantenimiento || 0) * km;
    const horasServicio =
        (horasCarga || 0) + (horasVacio || 0) + (horasParalizacion || 0);
    const vehiculoAmortizacion =
        (adquisicion - residual) / vidaUtil +
        (((adquisicion - residual) / -vidaUtil) * (vehiculo?.interes || 0)) /
            (1 - Math.pow(1 + (vehiculo?.interes || 0), -vidaUtil));
    const remolqueAmortizacion =
        (remolque - residualRemolque) / vidaUtilRemolque +
        (((remolque - residualRemolque) / -vidaUtilRemolque) *
            (vehiculo?.interes || 0)) /
            (1 - Math.pow(1 + (vehiculo?.interes || 0), -vidaUtilRemolque));
    return (
        <Form {...form}>
            <form
                className="p-2 space-y-1"
                onSubmit={form.handleSubmit(async (values) => {
                    await calculateServiceCost(values);
                })}
            >
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                            <Label>Vehiculo</Label>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    // vehiculo has not changed yet
                                    // console.log(vehiculo);
                                    form.reset(
                                        vehiculos.find(
                                            (v) => v.nombre === value
                                        )
                                    );
                                }}
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Parámetros</AccordionTrigger>
                        <AccordionContent>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parametros.adquisicion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Valor de adquisición del vehículo
                                            sin IVA y sin neumáticos (US$)
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parametros.residual"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Valor residual sin IVA del vehículo
                                            (US$)
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parametros.remolque"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Valor de adquisición del
                                            remolque-semirremolque sin IVA y sin
                                            neumáticos (US$)
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parametros.vidaUtilRemolque"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Vida útil del remolque-semirremolque
                                            (años)
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                            remolque-semirremolque sin IVA (US$)
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                            incluidos costes de empresa, Seg.
                                            Soc y otros (US$)
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parametros.dietas"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Dietas anuales del conductor (US$)
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        <FormMessage />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        <FormMessage />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormItem>
                                <FormLabel>
                                    Gasto total anual en carburante, sin IVA
                                    (US$)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly
                                        value={km * consumo * carburante}
                                    />
                                </FormControl>
                            </FormItem>
                            <FormItem>
                                <FormLabel>
                                    Gasto total anual en neumáticos (US$)
                                </FormLabel>
                                <FormControl>
                                    <Input readOnly value={neumaticos} />
                                </FormControl>
                            </FormItem>
                            <FormItem>
                                <FormLabel>
                                    Gasto total anual en neumáticos (US$)
                                </FormLabel>
                                <FormControl>
                                    <Input readOnly value={mantenimiento} />
                                </FormControl>
                            </FormItem>
                            <FormField
                                control={form.control}
                                name="parametros.indirectos"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Total costes anuales indirectos
                                            repercutibles a este vehículo (US$)
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Servicio</AccordionTrigger>
                        <AccordionContent>
                            <FormItem>
                                <FormLabel>
                                    Kilómetros recorridos en este servicio (km)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly
                                        value={(kmCarga || 0) + (kmVacio || 0)}
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
                                        <FormMessage />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="consumo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Consumo medio por kilómetro en este
                                            servicio (litros / 100 km)
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormItem>
                                <FormLabel>
                                    Horas empleadas en este servicio
                                </FormLabel>
                                <FormControl>
                                    <Input readOnly value={horasServicio} />
                                </FormControl>
                            </FormItem>
                            <FormField
                                control={form.control}
                                name="horasCarga"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Horas en carga</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="horasVacio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Horas en vacío</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                        <FormMessage />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormItem>
                                <FormLabel>
                                    Coste por distancia de este servicio (US$)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly
                                        value={
                                            ((kmServicio * (consumo || 0)) /
                                                100) *
                                                (carburante || 0) +
                                            (kmServicio *
                                                (neumaticos + mantenimiento)) /
                                                km +
                                            (peajes || 0)
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                            <FormItem>
                                <FormLabel>
                                    Coste por tiempo de este servicio (US$)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly
                                        value={
                                            (horasServicio *
                                                ((vehiculoAmortizacion || 0) +
                                                    (remolqueAmortizacion ||
                                                        0)) +
                                                conductor +
                                                dietas +
                                                seguros +
                                                fiscal +
                                                carburante +
                                                indirectos) /
                                            horas
                                        }
                                    />
                                </FormControl>
                            </FormItem>
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
                                        <FormMessage />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Button type="submit">Calcular costo del servicio</Button>
            </form>
        </Form>
    );
}
