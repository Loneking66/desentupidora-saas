export const PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High", 
} as const;

export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];
