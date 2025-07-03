import {useEffect, useState} from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import Flatpickr from "react-flatpickr";

interface CiclosFormProps {
    cycle?: {
        id: number;
        cycle: {
            group: string;
        };
        startDate: string;
        endDate: string;
        duration: string;
        status: string;
    };
}

export default function CiclosForm({ cycle }: CiclosFormProps) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [duration, setDuration] = useState("");
    const [group, setGroup] = useState("");
    const [status, setStatus] = useState("");

    const handleDateChange = (setter) => (date) => {
        setter(date[0].toLocaleDateString());
    };

    const groupOptions = [
        { value: "Grupo 1", label: "Grupo 1" },
        { value: "Grupo 2", label: "Grupo 2" },
        { value: "Grupo 3", label: "Grupo 3" }
    ];

    const statusOptions = [
        { value: "active", label: "Active", color: "text-green-500" },
        { value: "warning", label: "Warning", color: "text-red-500" },
        { value: "pending", label: "Pending", color: "text-yellow-500" },
        { value: "error", label: "Error", color: "text-red-500" }
    ];

    useEffect(() => {
        if (cycle) {
            setStartDate(cycle.startDate);
            setEndDate(cycle.endDate);
            setDuration(cycle.duration);
            setGroup(cycle.cycle.group);
            setStatus(cycle.status);
        }
    }, [cycle]);

    return (
        <ComponentCard title={cycle ? "Editar Ciclo de Fermentación" : "Registrar Ciclo de Fermentación"} className="max-w-full">
            <div className="grid grid-cols-2 gap-6 w-full">
                <div>
                    <Label>Grupo</Label>
                    <Select
                        options={groupOptions}
                        value={groupOptions.find(option => option.value === group)}
                        onChange={(option) => setGroup(option.value)}
                        placeholder="Selecciona un grupo"
                        className="dark:bg-dark-900"
                    />
                </div>

                <div>
                    <Label htmlFor="fechaInicio">Fecha de inicio</Label>
                    <Flatpickr
                        value={startDate}
                        onChange={handleDateChange(setStartDate)}
                        options={{ dateFormat: "Y-m-d" }}
                        placeholder="Selecciona una fecha"
                        className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white/90"
                    />
                </div>

                <div>
                    <Label htmlFor="fechaFin">Fecha de término</Label>
                    <Flatpickr
                        value={endDate}
                        onChange={handleDateChange(setEndDate)}
                        options={{ dateFormat: "Y-m-d" }}
                        placeholder="Selecciona una fecha"
                        className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white/90"
                    />
                </div>

                <div>
                    <Label htmlFor="duracion">Duración (meses)</Label>
                    <Input
                        type="number"
                        id="duracion"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Ingresa la duración en meses"
                    />
                </div>

                <div>
                    <Label>Estado</Label>
                    <Select
                        options={statusOptions}
                        value={statusOptions.find(option => option.value === status)}
                        onChange={(option) => setStatus(option.value)}
                        placeholder="Selecciona un estado"
                        className="dark:bg-dark-900"
                    />
                </div>
            </div>
        </ComponentCard>
    );
}