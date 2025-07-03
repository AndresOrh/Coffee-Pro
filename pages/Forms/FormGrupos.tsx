import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import GruposFer from "../../components/form/form-elements/GruposFer.tsx";

import PageMeta from "../../components/common/PageMeta";

export default function FormGrupos() {
    return (
        <div>
            <PageMeta
                title="Coffee Pro"
                description=""
            />
            <PageBreadcrumb pageTitle="Form Grupos de Fermentacion" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <GruposFer/>
                </div>

            </div>
        </div>
    );
}
