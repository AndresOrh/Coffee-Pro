import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/CycleTable.tsx";
import Button from "../../components/ui/button/Button.tsx";
import {PencilIcon, PlusIcon} from "../../icons";

export default function ManageParameter() {
  return (
    <>
      <PageMeta
        title="Coffee Pro"
        description="Administración de Parámetros"
      />
      <PageBreadcrumb pageTitle="Administración de Parámetros" />
      <div className="space-y-6">
        <ComponentCard title="Administración de Parámetros de medición">
            <div className="space-x-6">
                <Button size="sm" variant="primary" startIcon={<PlusIcon className="size-5"/>}>
                    Crear
                </Button>
                <Button size="sm" variant="outline" startIcon={<PencilIcon className="size-5"/>}>
                    Editar
                </Button>
            </div>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
