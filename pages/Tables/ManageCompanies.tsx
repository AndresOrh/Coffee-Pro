import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button.tsx";
import {PlusIcon} from "../../icons";
import {useModal} from "../../hooks/useModal.ts";
import {Modal} from "../../components/ui/modal";
import GroupTable from "../../components/tables/BasicTables/GroupsTable.tsx";
import CiclosForm from "../../components/form/form-elements/CiclosFer.tsx";
import CompanyTable from "../../components/tables/BasicTables/CompanyTable.tsx";
import CompaniesForm from "../../components/form/form-elements/CompaniesForm.tsx";

export default function ManageCompanies() {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <>
            <PageMeta
                title="Coffee Pro"
                description="Administración de Empresas"
            />
            <PageBreadcrumb pageTitle="Administración de Empresas" />
            <div className="space-y-6">
                <ComponentCard title="Administración de Empresas">
                    <div className="space-x-6">
                        <Button size="sm" variant="primary" startIcon={<PlusIcon className="size-5"/>} onClick={openModal}>
                            Crear
                        </Button>
                    </div>
                    <CompanyTable />
                </ComponentCard>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-fit max-h-full p-6 lg:p-10">
                <CompaniesForm/>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="primary">
                        Guardar
                    </Button>
                    <Button size="sm" variant="outline" onClick={closeModal}>
                        Cancelar
                    </Button>
                </div>
            </Modal>
        </>
    );
}
