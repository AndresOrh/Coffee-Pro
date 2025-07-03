import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { CalenderIcon } from "../../../icons";
import Flatpickr from "react-flatpickr";
import Button from "../../ui/button/Button.tsx";

export default function FermentationParamsForm() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedSilos, setSelectedSilos] = useState<string[]>([]);

    const silosOptions = ["Silo Norte", "Silo Sur", "Silo Este"];

    const statusOptions = [
        { value: "active", label: "Active", color: "text-green-500" },
        { value: "warning", label: "Warning", color: "text-red-500" },
        { value: "pending", label: "Pending", color: "text-yellow-500" },
        { value: "error", label: "Error", color: "text-red-500" }
    ];

    const handleDateChange = (setter: (value: string) => void) => (date: Date[]) => {
        setter(date[0].toLocaleDateString());
    };

    const toggleSilo = (silo: string) => {
        if (selectedSilos.includes(silo)) {
            setSelectedSilos(selectedSilos.filter((s) => s !== silo));
        } else {
            setSelectedSilos([...selectedSilos, silo]);
        }
    };

    const removeSilo = (silo: string) => {
        setSelectedSilos(selectedSilos.filter((s) => s !== silo));
    };

    return (
        <ComponentCard title="Registro de Parámetros de Fermentación">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <Label>Silos</Label>
                    <div className="relative">
                        {/* Etiquetas de Silos seleccionados */}
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedSilos.map((silo) => (
                                <span
                                    key={silo}
                                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                                >
                                    {silo}
                                    <button
                                        type="button"
                                        onClick={() => removeSilo(silo)}
                                        className="ml-1 text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* Caja de selección */}
                        <div className="border rounded-lg p-2 cursor-pointer">
                            <div className="flex flex-col">
                                {silosOptions
                                    .filter((silo) => !selectedSilos.includes(silo))
                                    .map((silo) => (
                                        <div
                                            key={silo}
                                            onClick={() => toggleSilo(silo)}
                                            className="hover:bg-gray-100 px-2 py-1 rounded-md"
                                        >
                                            {silo}
                                        </div>
                                    ))}
                                {silosOptions.filter((silo) => !selectedSilos.includes(silo)).length === 0 && (
                                    <div className="text-gray-400 text-sm px-2">No hay más silos disponibles</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Label>Fecha de Inicio</Label>
                    <Flatpickr
                        value={startDate}
                        onChange={handleDateChange(setStartDate)}
                        options={{ dateFormat: "Y-m-d" }}
                        placeholder="Seleccione la fecha de inicio"
                        className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white/90"
                    />
                </div>
                <div>
                    <Label>Fecha de Término</Label>
                    <Flatpickr
                        value={endDate}
                        onChange={handleDateChange(setEndDate)}
                        options={{ dateFormat: "Y-m-d" }}
                        placeholder="Seleccione la fecha de término"
                        className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white/90"
                    />
                </div>
                <div>
                    <Label>Duración (meses)</Label>
                    <Input type="number" placeholder="Ingrese la duración en meses" />
                </div>
                <div>
                    <Label>Estado</Label>
                    <select className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white/90">
                        {statusOptions.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        )) }
                    </select>
                </div>
                <div className="space-x-6">
                    <Button size="sm" variant="primary">
                        Guardar
                    </Button>
                    <Button size="sm" variant="outline">
                        Cancelar
                    </Button>
                </div>
            </div>
        </ComponentCard>

    );
}
