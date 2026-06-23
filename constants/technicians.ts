export const ALL_TECHNICIANS = "All Technicians" as const;

export const TECHNICIANS = [
  "Carlos Oliveira",
  "João Pedro",
  "Marcos Vinicius"
] as const;

export type Technician = typeof TECHNICIANS[number];