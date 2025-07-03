import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CiclosFer from "../../components/form/form-elements/CiclosFer";
import PageMeta from "../../components/common/PageMeta";

export default function FormCiclos() {
    return (
        <div>
            <PageMeta
                title="Coffee Pro"
                description=""
            />
            <PageBreadcrumb pageTitle="Form Ciclos de Fermentacion" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <CiclosFer/>
                </div>

            </div>
        </div>
    );
}
