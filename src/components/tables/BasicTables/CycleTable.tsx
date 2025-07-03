import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button.tsx";
import {PencilIcon} from "../../../icons";
import {useModal} from "../../../hooks/useModal.ts";
import {Modal} from "../../ui/modal";
import CiclosForm from "../../form/form-elements/CiclosFer.tsx";
import {useState} from "react";

interface Cycle {
  id: number;
  cycle: {
    group: string;
    details: string;
  };
  startDate: string;
  endDate: string;
  duration: string;
  status: string;
}

// Define the table data using the interface
const tableData: Cycle[] = [
  {
    id: 1,
    cycle: {
      group: "Grupo 1",
    },
    startDate: "25-01-2025",
    endDate: "25-04-2025",
    duration: "3 meses",
    status: "Active",
  },
  {
    id: 2,
    cycle: {
      group: "Grupo 1",
    },
    startDate: "25-01-2025",
    endDate: "25-04-2025",
    duration: "3 meses",
    status: "Warning",
  },
  {
    id: 3,
    cycle: {
      group: "Grupo 1",
    },
    startDate: "25-01-2025",
    endDate: "25-04-2025",
    duration: "3 meses",
    status: "Pending",
  },
  {
    id: 4,
    cycle: {
      group: "Grupo 1",
    },
    startDate: "25-01-2025",
    endDate: "25-04-2025",
    duration: "3 meses",
    status: "Error",
  }
];

export default function CycleTables() {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedCycle, setSelectedCycle] = useState<Cycle | null>(null);
  const handleEdit = (cycle: Cycle) => {
    setSelectedCycle(cycle);  // Store the selected cycle data
    openModal(); // Open the modal
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
                  Grupo
                </TableCell>
                <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Detalles
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fecha de inicio
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fecha de término
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Duración
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((cycle) => (
                <TableRow key={cycle.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      {cycle.id}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cycle.cycle.group}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cycle.cycle.details}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cycle.startDate}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cycle.endDate}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cycle.duration}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        cycle.status === "Active"
                          ? "success"
                          : cycle.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {cycle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Button size="sm" variant="outline" startIcon={<PencilIcon className="size-5"/>} onClick={() => handleEdit(cycle)}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-fit max-h-full p-6 lg:p-10">
        {selectedCycle && (
            <CiclosForm cycle={selectedCycle} />
          )}
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="primary">
            Guardar
          </Button>
          <Button size="sm" variant="outline" onClick={closeModal}>
            Cancelar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
