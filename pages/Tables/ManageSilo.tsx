import {useModal} from "../../hooks/useModal.ts";
import Button from "../../components/ui/button/Button.tsx";
import {PlusIcon} from "../../icons";
import {Modal} from "../../components/ui/modal";
import SilosFer from "../../components/form/form-elements/SilosFer.tsx";
import SiloTables from "../../components/tables/BasicTables/SiloTable.tsx";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import {useState} from "react";
import {toast} from "react-toastify";
import {siloApi} from "../../lib/api/api.ts";


export default function ManageSilo() {
  const { isOpen, openModal, closeModal } = useModal();
  const { isLoading, setIsLoading } = useState(false);

  const handleSave = async (siloData: SiloData) => {
    setIsLoading(true);
    try {
      if (!siloData?.name || !siloData?.uuid || !siloData?.capacity) {
        throw new Error("Todos los campos obligatorios deben ser completados");
      }

      const body = {
        fermentator_name: siloData.name,
        fermentator_uuid: siloData.uuid,
        company_id: parseInt(siloData.company_id),
        group_id: siloData.group_id,
        capacity: parseInt(siloData.capacity),
        description: siloData.description || ""
      };

      const response = await siloApi.createSilo(body);

      if (response.status_code === 200) {
        toast.success("Silo creado exitosamente");
        closeModal();
        window.location.reload();
      } else {
        toast.error("Error al crear el silo");
      }

    } catch (error) {
      console.error("Error al crear el silo:", error);
      toast.error("Error al crear el silo: " + (error as Error).message);

    } finally {
      setIsLoading(false);

    }
  };

  return (
      <ComponentCard title="Administración de Silos de Fermentación">
          <div className="space-x-6">
            <Button
              size="sm"
              variant="primary"
              startIcon={<PlusIcon className="size-5"/>}
              onClick={openModal}
            >
              Crear
            </Button>
          </div>

          <Modal isOpen={isOpen} onClose={closeModal} className="max-w-fit max-h-full p-6 lg:p-10">
            <SilosFer onSave={handleSave} isEditing={false}/>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="primary" onClick={() => handleSave(document.querySelector('form')?.getFormData())}>
                {isLoading ? "Creando..." : "Crear"}
              </Button>
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
            </div>
          </Modal>

          <SiloTables />
      </ComponentCard>
  );
}