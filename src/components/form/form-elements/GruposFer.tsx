import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";

export default function GruposForm() {
    const [selectedOrganization, setSelectedOrganization] = useState("");
    const [name, setName] = useState("");
    const [fermentationType, setFermentationType] = useState("");
    const [coffeeType, setCoffeeType] = useState("");

    const organizations = [
        { value: "UPAEP", label: "UPAEP" }
    ];

    const fermentationTypes = [
        { value: "aerobica", label: "Aeróbica" }
    ];

    const coffeeTypes = [
        { value: "arabica", label: "Café Arábico" }
    ];

    const handleSelectChange = (setter) => (value) => {
        setter(value);
    };

    return (
        <ComponentCard title="Registro de Grupo">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="empresa">Empresa</Label>
                    <Select
                        options={organizations}
                        placeholder="Seleccione una empresa"
                        value={selectedOrganization}
                        onChange={handleSelectChange(setSelectedOrganization)}
                    />
                </div>

                <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        type="text"
                        id="nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ingrese el nombre del grupo"
                    />
                </div>

                <div>
                    <Label htmlFor="tipoFermentacion">Tipo de Fermentación</Label>
                    <Select
                        options={fermentationTypes}
                        placeholder="Seleccione un tipo de fermentación"
                        value={fermentationType}
                        onChange={handleSelectChange(setFermentationType)}
                    />
                </div>

                <div>
                    <Label htmlFor="tipoCafe">Tipo de Café</Label>
                    <Select
                        options={coffeeTypes}
                        placeholder="Seleccione un tipo de café"
                        value={coffeeType}
                        onChange={handleSelectChange(setCoffeeType)}
                    />
                </div>
            </div>
        </ComponentCard>
    );
}
