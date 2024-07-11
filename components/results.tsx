"use client";

import { CalculatorContext } from "@/lib/calculator";
import { useContext } from "react";
import { AnnualCostPieChart } from "./category-pie-chart";
import { TimeDistanceCostPieChart } from "./time-distance-pie-chart";
import { CostTable } from "./table";

export default function Results() {
  const { aggregateData, aggregateDataDatosEstadisticos } =
    useContext(CalculatorContext);
  return (
    <div className="space-y-4 min-w-[50vw]">
      <h2 className="text-center text-lg">Estructura de costos anuales</h2>
      <div className="grid grid-cols-2 gap-4">
        <AnnualCostPieChart
          costData={[
            aggregateData.amortizacionYGastosFinancieros,
            aggregateData.personal,
            aggregateData.segurosCostosFiscalesGestionComercializacion,
            aggregateData.combustibleNeumaticosReparacionesMantenimiento,
          ]}
          label="Usuario"
        />
        <AnnualCostPieChart
          costData={[
            aggregateDataDatosEstadisticos.amortizacionYGastosFinancieros,
            aggregateDataDatosEstadisticos.personal,
            aggregateDataDatosEstadisticos.segurosCostosFiscalesGestionComercializacion,
            aggregateDataDatosEstadisticos.combustibleNeumaticosReparacionesMantenimiento,
          ]}
          label="Datos estadísticos"
        />
      </div>
      <h2 className="text-center text-lg">Costos: Tiempo vs Distancia</h2>
      <div className="grid grid-cols-2 gap-4">
        <TimeDistanceCostPieChart
          costData={[
            aggregateData.costosPorTiempo,
            aggregateData.costosPorDistancia,
          ]}
          label="Usuario"
        />
        <TimeDistanceCostPieChart
          costData={[
            aggregateDataDatosEstadisticos.costosPorTiempo,
            aggregateDataDatosEstadisticos.costosPorDistancia,
          ]}
          label="Datos estadísticos"
        />
      </div>
      <div>
        <CostTable
          user={[
            aggregateData.costoTotalMedioPorKmFacturado,
            aggregateData.costoTotalMedioPorHoraFacturada,
            aggregateData.costosPorDistancia,
            aggregateData.costoPorDistanciaMediaPorKm,
            aggregateData.costosPorTiempo,
            aggregateData.costoPorTiempoMedioPorHora,
            aggregateData.costosTotalesPorViajeroKilometro,
          ]}
          stats={[
            aggregateDataDatosEstadisticos.costoTotalMedioPorKmFacturado,
            aggregateDataDatosEstadisticos.costoTotalMedioPorHoraFacturada,
            aggregateDataDatosEstadisticos.costosPorDistancia,
            aggregateDataDatosEstadisticos.costoPorDistanciaMediaPorKm,
            aggregateDataDatosEstadisticos.costosPorTiempo,
            aggregateDataDatosEstadisticos.costoPorTiempoMedioPorHora,
            aggregateDataDatosEstadisticos.costosTotalesPorViajeroKilometro,
          ]}
        />
      </div>
    </div>
  );
}
