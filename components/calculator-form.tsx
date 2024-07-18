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

const costosVehiculos = [
    {
        nombre: "Vehículo articulado de 5 ejes (Larga distancia)",
        // interes: 0.05,
        // mantenimiento: 0.02,
        neumaticos: 0.2475,
        parametros: {
            neumaticos: 0.2475,
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
        // interes: 0.05,
        // mantenimiento: 0.02,
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
        // interes: 0.05,
        // mantenimiento: 0.01,
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

const coerceNumberNonNegative = z.coerce.number().nonnegative();

const formSchema = z.object({
    nombre: z.string(),
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
export default function CalculatorForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: costosVehiculos[0],
    });
    const [nombre, km, consumo, carburante] = form.watch([
        "nombre",
        "parametros.km",
        "parametros.consumo",
        "parametros.carburante",
    ]);
    const vehiculo = costosVehiculos.find((cv) => cv.nombre === nombre);
    return (
        <Form {...form}>
            <form
                className="p-2 space-y-1"
                onSubmit={form.handleSubmit((values) => {
                    console.log("Form Values:", values);
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
                                        costosVehiculos.find(
                                            (cv) => cv.nombre === value
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
                                    {costosVehiculos.map((cv) => (
                                        <SelectItem
                                            key={cv.nombre}
                                            value={cv.nombre}
                                        >
                                            {cv.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                            <FormLabel>Horas trabajadas al año</FormLabel>
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
                                Valor de adquisición del vehículo sin IVA y sin
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
                    name="parametros.vidaUtil"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vida útil del vehículo (años)</FormLabel>
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
                                Valor residual sin IVA del vehículo (US$)
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
                                Valor de adquisición del remolque-semirremolque
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
                    name="parametros.vidaUtilRemolque"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Vida útil del remolque-semirremolque (años)
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
                                Valor residual del remolque-semirremolque sin
                                IVA (US$)
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
                                Coste total anual del conductor, incluidos
                                costes de empresa, Seg. Soc y otros (US$)
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
                                Coste total anual de los seguros (US$)
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
                                Precio carburante sin IVA (US$/litro)
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
                            <FormLabel>Consumo medio (litros/100km)</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel>
                        Gasto total anual en carburante, sin IVA (US$)
                    </FormLabel>
                    <FormControl>
                        <Input readOnly value={km * consumo * carburante} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Gasto total anual en neumáticos (US$)</FormLabel>
                    <FormControl>
                        <Input
                            readOnly
                            value={(vehiculo?.neumaticos || 0) * km}
                        />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Gasto total anual en neumáticos (US$)</FormLabel>
                    <FormControl>
                        <Input
                            readOnly
                            value={km * (vehiculo?.neumaticos || 0)}
                        />
                    </FormControl>
                </FormItem>
                <FormField
                    control={form.control}
                    name="parametros.indirectos"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Total costes anuales indirectos repercutibles a
                                este vehículo (US$)
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
