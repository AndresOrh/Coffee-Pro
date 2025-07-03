import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

const siloData = {
  Silo1: 75.55,
  Silo2: 60.30,
  Silo3: 85.75,
};

export default function MonthlyTarget() {
  const [selectedSilo, setSelectedSilo] = useState("Silo1");
  const [series, setSeries] = useState([siloData[selectedSilo]]);
  const [isOpen, setIsOpen] = useState(false);

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: { background: "#E4E7EC", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: { type: "solid", colors: ["#465FFF"] },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function handleSiloChange(silo) {
    setSelectedSilo(silo);
    setSeries([siloData[silo]]);
  }

  return (
      <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Progreso de Fermentación Mensual
              </h3>
              <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                Meta puesto Mensual
              </p>
            </div>
            <select
                className="p-2 border rounded-lg text-gray-700 dark:text-white bg-white dark:bg-gray-800"
                value={selectedSilo}
                onChange={(e) => handleSiloChange(e.target.value)}
            >
              <option value="Silo1">Silo 1</option>
              <option value="Silo2">Silo 2</option>
              <option value="Silo3">Silo 3</option>
            </select>
          </div>
          <div className="relative ">
            <div className="max-h-[330px]" id="chartDarkStyle">
              <Chart options={options} series={series} type="radialBar" height={330} />
            </div>
            <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
              Se procesaron 1,500 kg de café hoy en {selectedSilo}, 10% más que el mes pasado.
            </p>
          </div>
        </div>
      </div>
  );
}
