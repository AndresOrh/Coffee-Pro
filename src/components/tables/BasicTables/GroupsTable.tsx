import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button.tsx";
import {PencilIcon} from "../../../icons";
import {useState} from "react";

interface Group {
  id: number;
  name: string;
  coffeType: {
    name: string;
    description: string;
  };
  fermentationType: {
    name: string;
    description: string;
  };
  company: {
    name: string;
    imageUrl: string;
  };
}

// Define the table data using the interface
const tableData: Group[] = [
  {
    id: 1,
    name: "Grupo 1",
    coffeType: {
      name: "Café Arábica",
      description: "Equilibrado, aromático y tiene una acidez muy agradable."
    },
    fermentationType: {
      name: "Aeróbica",
      description: "Requiere un mayor control y monitoreo, ya que es más variable ante el tiempo y la temperatura",
    },
    company: {
      name: "UPAEP",
      imageUrl: "/images/product/cafe_arabica.jpg",
    },
  },
  {
    id: 1,
    name: "Grupo 1",
    coffeType: {
      name: "Café Arábica",
      description: "Equilibrado, aromático y tiene una acidez muy agradable."
    },
    fermentationType: {
      name: "Aeróbica",
      description: "Requiere un mayor control y monitoreo, ya que es más variable ante el tiempo y la temperatura",
    },
    company: {
      name: "UPAEP",
      imageUrl: "/images/product/cafe_arabica.jpg",
    },
  },
  {
    id: 1,
    name: "Grupo 1",
    coffeType: {
      name: "Café Arábica",
      description: "Equilibrado, aromático y tiene una acidez muy agradable."
    },
    fermentationType: {
      name: "Aeróbica",
      description: "Requiere un mayor control y monitoreo, ya que es más variable ante el tiempo y la temperatura",
    },
    company: {
      name: "UPAEP",
      imageUrl: "/images/product/cafe_arabica.jpg",
    },
  }
];

export default function GroupTable() {
  const [companyFilter, setCompanyFilter] = useState('');

  const filteredData = tableData.filter(group => group.company.name.toLowerCase().includes(companyFilter.toLowerCase()))
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4">
        <input
          type={"text"}
          placeholder="Filtrar por empresa..."
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          />
      </div>
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
                  ID
                </TableCell>
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
                  Nombre
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tipo fermentación
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tipo de Café
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      {group.id}
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                            width={40}
                            height={40}
                            src={group.company.imageUrl}
                            alt={group.company.name}
                        />
                      </div>
                      <div>
                        {group.company.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {group.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {group.fermentationType.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {group.coffeType.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Button size="sm" variant="outline" startIcon={<PencilIcon className="size-5"/>}
                            children={undefined} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
