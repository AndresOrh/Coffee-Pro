import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button.tsx";
import {Modal} from "../../ui/modal";
import {useModal} from "../../../hooks/useModal.ts";
import {PencilIcon, PlusIcon} from "../../../icons";
import SilosFer from "../../form/form-elements/SilosFer.tsx";
import {useRef, useState, useEffect} from "react";
import apiFacade from "../../../lib/api/apiFacade.ts"
import {CompanyResponse, siloApi, companyApi, SiloResponse} from "../../../lib/api/api.ts";

interface SilosferRef {
  getFormData: () => SiloData;
}

export interface SiloData {
  name: string;
  uuid: string;
  company_id: number;
  group_id: number;
  capacity: number;
  description: string;
}

export default function SiloTables() {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedSilo, setSelectedSilo] = useState<SiloData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const silosferRef = useRef<SilosferRef>(null)

  const handleEdit = (silo: SiloData) => {
    setSelectedSilo(silo);
    setIsEditing(true);
    openModal();
  }

  const handleCreate = () => {
    setSelectedSilo(null);
    setIsEditing(false);
    openModal();
  }

  const [silos, setSilos] = useState<SiloResponse[]>([]);
  const [companies, setCompanies] = useState<Record<number, CompanyResponse['company']>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const companyId = 9;

  const handleSave = async (siloData: SiloData) => {
    try {
      const body = {
        fermentator_name: siloData.name,
        fermentator_uuid: siloData.uuid,
        company_id: siloData.company_id,
        group_id: siloData.group_id,
        capacity: siloData.capacity,
        description: siloData.description
      };

      if (isEditing) {
        await apiFacade.patch('/fermentators', body);
      } else {
        await apiFacade.post('/fermentators', body);
      }

      const  updatedSilos = await siloApi.getFermentatorsInfo(companyId);
      setSilos(updatedSilos);
      closeModal();

    } catch (error) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} el silo:`, error);
      setError(`Error al ${isEditing ? 'actualizar' : 'crear'} el silo`);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
       setLoading(true)

        const silosResponse = await siloApi.getFermentatorsInfo(companyId);
        setSilos(silosResponse);

        if (silosResponse.length > 0) {
          const uniqueCompanyIds = [...new Set(silosResponse.map(silo => silo.company_id))];

          const companyResponses = await Promise.all(
              uniqueCompanyIds.map(async (id) => {
                try {
                  return await companyApi.getCompanyInfo(id);
                } catch (err) {
                  console.error(`Error fetching company ${id}:`, err);
                  return null;
                }
              })
          );

          const companyData = companyResponses.reduce((acc, response) => {
            if (response && response.company && 'id' in response.company) {
              acc[response.company.id] = response.company;
            }
            return acc;
          }, {} as Record<number, CompanyResponse['company']>);

          setCompanies(companyData);
        }

        setError(null);

      } catch (error) {
        setError("Error al cargar los silos");
        console.error("Error fetching silos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }


  return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-white/[0.05] dark:bg-white/[0.03] sm:px-6">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Empresa
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Nombre del silo
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    UUID
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Descripción
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Capacidad
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {silos.map((silo) => {
                  const company = companies[silo.company_id];
                  return (
                      <TableRow key={silo.id}>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-3">
                            {company?.image_file_name && (
                                <div className="h-[40px] w-[40px] overflow-hidden rounded-md">
                                  <img
                                      src={`../images/product/${company.image_file_name}`}
                                      className="h-full w-full object-cover"
                                      alt={company.name || 'Empresa'}
                                  />
                                </div>
                            )}
                            <div>
                              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                {company?.name || `Empresa ${silo.company_id}`}
                              </p>
                              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                {company?.type || 'Compradora'}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {silo.name}
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {silo.uuid}
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {silo.description}
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {silo.capacity} ml
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <Button size="sm" variant="outline" startIcon={<PencilIcon className="size-5"/>} onClick={() => handleEdit(silo)}/>
                        </TableCell>
                      </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>


        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-fit max-h-full p-6 lg:p-10">
          {selectedSilo && (<SilosFer silo={selectedSilo} onSave={handleSave} isEditing={isEditing}/>
          )}
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="primary" onClick={() => {
            }}
            >
              {isEditing ? 'Guardar' : 'Crear'}
            </Button>
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
          </div>
        </Modal>
      </div>
  );
}
