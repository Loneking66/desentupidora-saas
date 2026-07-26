import { Technician } from "@/constants/technicians";
import { Priority } from "@/constants/priority";
import { Status } from "@/constants/status";

export type ServiceRequest = {
  id: number;
  customer: string;
  phone: string;
  address: string;
  description: string;
  priority: Priority;
  value: number;
  openedAt: string;
  status: Status;
  technician: Technician;
};

export type CreateServiceRequestInput = {
  customer: string;
  phone: string;
  address: string;
  description: string;
  priority: Priority;
  technician: Technician;
};
