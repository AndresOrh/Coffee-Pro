import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import SiloFer from "../../components/form/form-elements/SilosFer";

import PageMeta from "../../components/common/PageMeta";

export default function FormSilos() {
    return (
        <div>
            <PageMeta
                title="Coffee Pro"
                description=""
            />
            <PageBreadcrumb pageTitle="Form Silos de Fermentacion" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <SiloFer/>
                </div>

            </div>
        </div>
    );
}
