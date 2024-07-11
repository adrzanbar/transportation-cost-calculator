"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CalculatorContext,
  CalculatorFormData,
  calculatorFormSchema,
  defaultValues,
  defaultVehiculo,
  getAggregateData,
  Vehiculo,
} from "@/lib/calculator";
import CalculatorForm from "./calculator-form";
import Results from "./results";

export default function Calculator({ vehiculos }: { vehiculos: Vehiculo[] }) {
  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues,
  });
  const formData = form.watch();
  const vehiculo =
    vehiculos.find(
      (vehiculo) => vehiculo.descripcion === formData.descripcion
    ) || defaultVehiculo;

  const aggregateData = getAggregateData(vehiculo, formData);
  const aggregateDataDatosEstadisticos = getAggregateData(
    vehiculo,
    vehiculo.parametro
  );

  return (
    <CalculatorContext.Provider
      value={{
        form,
        formData,
        vehiculo,
        vehiculos,
        aggregateData,
        aggregateDataDatosEstadisticos,
      }}
    >
      <div className="flex flex-row gap-4">
        <CalculatorForm />
        <Results />
      </div>
    </CalculatorContext.Provider>
  );
}
