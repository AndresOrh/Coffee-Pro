import {xuseEffect, useState} from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import {companyApi, SiloResponse} from "../../../lib/api/api.ts";
import Button from "../../ui/button/Button.tsx";
import {SiloData} from "../../tables/BasicTables/SiloTable.tsx";

interface SilosFerProps {
    silo?: SiloResponse | null;
    onSave: (data: SiloData) => void;
    isEditing: boolean;
}

export interface SilosferRef {
    getFormData: () => SiloData;
}

interface Company {
    id: number;
    organization_id: number;
    name: string;
    image_file_name: string;
    details: string;
    type: string;
}

interface CompaniesResponse {
    companies: Company[];
}

const paramMap = {
    pressure: "Presión",
    temperature: "Temperatura",
    moisture: "Humedad",
};

const reverseParamMap = {
    "Presión": "pressure",
    "Temperatura": "temperature",
    "Humedad": "moisture",
};

export default function SilosFer( { silo, onSave, isEditing }: SilosFerProps ) {
    const [formData, setFormData] = useState({
        name: '',
        uuid: '',
        company_id: '',
        group_id: '',
        capacity: '',
        description: ''
    });

    const [selectedParam, setSelectedParam] = useState<string[]>([])
    const [companies, setCompanies] = useState<Array<{ value: number; label: string }>>([]);
    const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof SiloData, string>>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof SiloData, string>> = {};

        if (!formData.name.trim() || formData.name.trim().length === 0) {
            newErrors.name = "El nombre es requerido";
        }

        if (!formData.company_id) {
            newErrors.company_id = "Debe seleccionar una empresa";
        }

        if (!formData.capacity || parseInt(formData.capacity) <= 0) {
            newErrors.capacity = "La capacidad debe ser mayor a 0";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            company_id: value
        }));
    };


    const fetchCompanies = async () => {
        setIsLoadingCompanies(true);
        try {
            const response = await companyApi.getAllCompanies();
            if (response?.companies) {
                const companyOptions = response.companies.map(company => ({
                    value: company.id,
                    label: company.name
                }));
                setCompanies(companyOptions);
            } else {
                console.error("La respuesta no tiene el formato esperado:", response);
            }
        } catch (error) {
            console.error("Error al cargar las empresas:", error);
        } finally {
            setIsLoadingCompanies(false);
        }
    }

    const paramOptions = ["Presión", "Humedad", "Temperatura"];
    const removeParam = (parametro: string) => {
        setSelectedParam(selectedParam.filter((s) => s !== parametro));
    };

    const toggleParam = (parametro: string) => {
        setSelectedParam((prev) =>
            prev.includes(parametro)
                ? prev.filter((s) => s !== parametro)
                : [...prev, parametro]
        );
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    useEffect(() => {
        if (silo) {
            setFormData({
                name: silo.name || '',
                uuid: silo.uuid || '',
                company_id: silo.company_id?.toString() || '',
                group_id: silo.group_id || '',
                capacity: silo.capacity?.toString() || '',
                description: silo.description || ''
            });
        }
    }, [silo]);


    return (
        <ComponentCard title={silo ? "Editar Silo de Fermentación" : "Registro de Silos de Fermentación"} className="w-full">
            <div className="grid grid-cols-2 gap-6 w-full">
                <div>
                    <Label>Empresa</Label>
                    <Select
                        options={companies}
                        value={formData.company_id}
                        onChange={handleSelectChange}
                        className="w-full"
                        isLoading={isLoadingCompanies}
                        placeholder="Seleccione una empresa"
                    />
                </div>


                <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        type="text"
                        id="nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingrese el nombre"
                        className="w-full"
                    />

                </div>

                <div className="w-full">
                        <Label>Selecciona los parámetros a medir</Label>
                            {/* Etiquetas de Silos seleccionados */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {selectedParam.map((parametro) => (
                                    <span
                                        key={parametro}
                                        className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                                    >
                                    {parametro}
                                        <button
                                            type="button"
                                            onClick={() => removeParam(parametro)}
                                            className="ml-1 text-red-500 hover:text-red-700"
                                        >
                                        ×
                                    </button>
                                </span>
                                ))}
                            </div>

                            {/* Caja de selección */}
                            <div className="border rounded-lg p-2 cursor-pointer gap-2">
                                <div className="grid grid-cols-2 gap-2">
                                    {paramOptions
                                        .filter((parametro) => !selectedParam.includes(parametro))
                                        .map((parametro) => (
                                            <div
                                                key={parametro}
                                                onClick={() => toggleParam(parametro)}
                                                className="hover:bg-gray-100 px-2 py-1 rounded-md"
                                            >
                                                {parametro}
                                            </div>
                                        ))}
                                    {paramOptions.filter((parametro) => !selectedParam.includes(parametro)).length === 0 && (
                                        <div className="text-gray-400 text-sm px-2">No hay más silos disponibles</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                <div>
                    <Label htmlFor="capacidad">Capacidad</Label>
                    <div className="flex w-full align-middle items-center space-x-4">
                        <Input
                            type="number"
                            id="capacidad"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="flex-1 w-full"
                            placeholder="Cantidad"
                        />

                        <div className="ms-0">
                        Mililitros
                        </div>
                    </div>
                </div>
        </ComponentCard>
    );
}