import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput.tsx";

export default function CompaniesForm() {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected file:", file.name);
        }
    };
    const [name, setName] = useState("");
    const [companyType, setCompanyType] = useState("");

    const organizations = [
        { value: "UPAEP", label: "UPAEP" }
    ];

    const companyTypes = [
        { value: 1, label: "Productora" },
        { value: 2, label: "Comercializadora" }
    ];

    const handleSelectChange = (setter) => (value) => {
        setter(value);
    };

    return (
        <ComponentCard title="Registro de Empresa">
            <div className="grid grid-cols-1 gap-6">

                <div>
                    <Label htmlFor="nombre">Nombre de la Empresa</Label>
                    <Input
                        type="text"
                        id="nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ingrese el nombre del grupo"
                    />
                </div>

                <div>
                    <Label htmlFor="detalles">Detalles</Label>
                    <Input
                        type="text"
                        id="detalles"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ingrese la descripción de la emrpesa"
                    />
                </div>

                <div>
                    <Label htmlFor="tipoCafe">Tipo de Café</Label>
                    <Select
                        options={companyTypes}
                        placeholder="Seleccione un tipo de empresa"
                        value={companyType}
                        onChange={handleSelectChange(setCompanyType)}
                    />
                </div>
                <div>
                    <Label htmlFor="tipoCafe">Logo</Label>
                    <FileInput onChange={handleFileChange} className="custom-class" />
                </div>
            </div>
        </ComponentCard>
    );
}
