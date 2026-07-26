import { PRIORITY } from "@/constants/priority";
import { STATUS } from "@/constants/status";
import { TECHNICIANS } from "@/constants/technicians";
import type { ServiceRequest } from "@/types/serviceRequests";

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: 1,
    customer: "João Silva",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    description: "Entupimento na pia da cozinha",
    priority: PRIORITY.HIGH,
    value: 150,
    openedAt: "2024-06-01T10:00:00Z",
    status: STATUS.OPEN,
    technician: TECHNICIANS[0],
  },
  {
    id: 2,
    customer: "Maria Santos",
    phone: "(11) 98854-5411",
    address: "Rua das Árvores, 503",
    description: "Entupimento no vaso sanitário",
    priority: PRIORITY.LOW,
    value: 300,
    openedAt: "2024-06-01T10:00:00Z",
    status: STATUS.IN_PROGRESS,
    technician: TECHNICIANS[1],
  },
  {
    id: 3,
    customer: "Carlos Oliveira",
    phone: "(11) 98745-3210",
    address: "Rua das Pedras, 203",
    description: "Entupimento de ralo",
    priority: PRIORITY.MEDIUM,
    value: 450,
    openedAt: "2024-06-01T10:00:00Z",
    status: STATUS.COMPLETED,
    technician: TECHNICIANS[2],
  },
];