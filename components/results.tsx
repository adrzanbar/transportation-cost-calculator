"use client";

import { CalculatorContext } from "@/lib/calculator";
import { useContext } from "react";
import { MyPieChart } from "./pie-chart";
import { CostTable } from "./table";
import { ChartConfig } from "./ui/chart";

export default function Results() {
  const { aggregateData, aggregateDataDatosEstadisticos } =
    useContext(CalculatorContext);

  const userCategoryChartData = [
    {
      category: "amortizacionYGastosFinancieros",
      cost: aggregateData.amortizacionYGastosFinancieros,
      fill: "hsl(var(--chart-1))",
    },
    {
      category: "personal",
      cost: aggregateData.personal,
      fill: "hsl(var(--chart-2))",
    },
    {
      category: "segurosCostosFiscalesGestionComercializacion",
      cost: aggregateData.segurosCostosFiscalesGestionComercializacion,
      fill: "hsl(var(--chart-3))",
    },
    {
      category: "combustibleNeumaticosReparacionesMantenimiento",
      cost: aggregateData.combustibleNeumaticosReparacionesMantenimiento,
      fill: "hsl(var(--chart-4))",
    },
  ];

  const categoryChartConfig = {
    visitors: {
      label: "Costos anuales",
    },
    amortizacionYGastosFinancieros: {
      label: "Amortización y gastos financieros",
      color: "var(--color-1)",
    },
    personal: {
      label: "Personal",
      color: "var(--color-2)",
    },
    segurosCostosFiscalesGestionComercializacion: {
      label: "Seguros, costes fiscales, gestión y comercialización",
      color: "var(--color-3)",
    },
    combustibleNeumaticosReparacionesMantenimiento: {
      label: "Combustible, neumáticos, reparaciones, mantenimiento",
      color: "var(--color-4)",
    },
  } satisfies ChartConfig;

  const datosEstadisticosCategoryChartData = [
    {
      category: "amortizacionYGastosFinancieros",
      cost: aggregateDataDatosEstadisticos.amortizacionYGastosFinancieros,
      fill: "hsl(var(--chart-1))",
    },
    {
      category: "personal",
      cost: aggregateDataDatosEstadisticos.personal,
      fill: "hsl(var(--chart-2))",
    },
    {
      category: "segurosCostosFiscalesGestionComercializacion",
      cost: aggregateDataDatosEstadisticos.segurosCostosFiscalesGestionComercializacion,
      fill: "hsl(var(--chart-3))",
    },
    {
      category: "combustibleNeumaticosReparacionesMantenimiento",
      cost: aggregateDataDatosEstadisticos.combustibleNeumaticosReparacionesMantenimiento,
      fill: "hsl(var(--chart-4))",
    },
  ];

  const userTimeDistanceChartData = [
    {
      category: "costosPorTiempo",
      cost: aggregateData.costosPorTiempo,
      fill: "hsl(var(--chart-1))",
    },
    {
      category: "costosPorDistancia",
      cost: aggregateData.costosPorDistancia,
      fill: "hsl(var(--chart-2))",
    },
  ];

  const timeDistanceChartConfig = {
    visitors: {
      label: "Costos anuales",
    },
    costosPorTiempo: {
      label: "Costes por tiempo",
      color: "var(--color-1)",
    },
    costosPorDistancia: {
      label: "Costes por distancia",
      color: "var(--color-2)",
    },
  } satisfies ChartConfig;

  const datosEstadisticosTimeDistanceChartData = [
    {
      category: "costosPorTiempo",
      cost: aggregateDataDatosEstadisticos.costosPorTiempo,
      fill: "hsl(var(--chart-1))",
    },
    {
      category: "costosPorDistancia",
      cost: aggregateDataDatosEstadisticos.costosPorDistancia,
      fill: "hsl(var(--chart-2))",
    },
  ];

  return (
    <div className="space-y-4 min-w-[50vw]">
      <h2 className="text-center text-lg">Estructura de costos anuales</h2>
      <div className="grid grid-cols-2 gap-4">
        <MyPieChart
          chartDataList={userCategoryChartData}
          chartConfig={categoryChartConfig}
          label="Usuario"
        />
        <MyPieChart
          chartDataList={datosEstadisticosCategoryChartData}
          chartConfig={categoryChartConfig}
          label="Datos estadísticos"
        />
      </div>
      <h2 className="text-center text-lg">Costos: Tiempo vs Distancia</h2>
      <div className="grid grid-cols-2 gap-4">
        <MyPieChart
          chartDataList={userTimeDistanceChartData}
          chartConfig={timeDistanceChartConfig}
          label="Usuario"
        />
        <MyPieChart
          chartDataList={datosEstadisticosTimeDistanceChartData}
          chartConfig={timeDistanceChartConfig}
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
