import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Duración en horas por tipo de fermentación
const tiposFermentacion = {
  "Tipo 1": 72,
  "Tipo 2": 36,
  "Tipo 3": 24,
};

const parametros = ["Presión", "Humedad", "Temperatura"];

// Función para generar datos simulados por hora
function generarDatos(duracion: number, parametro: string): number[] {
  const datos: number[] = [];
  for (let i = 0; i < duracion; i++) {
    let valor;
    switch (parametro) {
      case "Presión":
        valor = +(1 + Math.sin(i / 5) * 0.3 + Math.random() * 0.1).toFixed(2);
        break;
      case "Humedad":
        valor = +(50 + Math.sin(i / 3) * 5 + Math.random() * 2).toFixed(2);
        break;
      case "Temperatura":
        valor = +(25 + Math.cos(i / 4) * 3 + Math.random() * 1.5).toFixed(2);
        break;
      default:
        valor = 0;
    }
    datos.push(valor);
  }
  return datos;
}

export default function StatisticsChart() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Tipo 1");
  const [parametroSeleccionado, setParametroSeleccionado] = useState("Presión");

  const duracion = tiposFermentacion[tipoSeleccionado];
  const datos = generarDatos(duracion, parametroSeleccionado);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.3,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: "numeric",
      title: { text: "Horas" },
      labels: {
        formatter: (val) => `${val}h`,
      },
    },
    yaxis: {
      title: { text: parametroSeleccionado },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
    tooltip: {
      enabled: true,
      x: {
        formatter: (val) => `Hora ${val}`,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    colors: ["#465FFF"],
  };

  const series = [
    {
      name: parametroSeleccionado,
      data: datos.map((val, i) => [i, val]),
    },
  ];

  return (
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Ciclo de fermentación - {tipoSeleccionado}
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Visualización de {parametroSeleccionado.toLowerCase()} durante {duracion} horas de fermentación
            </p>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row">
            <select
                value={tipoSeleccionado}
                onChange={(e) => setTipoSeleccionado(e.target.value)}
                className="border p-2 rounded-md"
            >
              {Object.keys(tiposFermentacion).map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>

            <select
                value={parametroSeleccionado}
                onChange={(e) => setParametroSeleccionado(e.target.value)}
                className="border p-2 rounded-md"
            >
              {parametros.map((p) => (
                  <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="min-w-[1000px] xl:min-w-full">
            <Chart options={options} series={series} type="area" height={310} />
          </div>
        </div>
      </div>
  );
}
