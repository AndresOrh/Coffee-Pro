import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import PageMeta from "../../components/common/PageMeta";
import CompaniesForm from "../../components/form/form-elements/CompaniesForm.tsx";

export default function FormEmpresas() {
    return (
        <div>
            <PageMeta
                title="Coffee Pro"
                description=""
            />
            <PageBreadcrumb pageTitle="Form Empresas" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <CompaniesForm/>
                </div>

            </div>
        </div>
    );
}
