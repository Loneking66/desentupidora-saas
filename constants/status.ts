export const STATUS = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
} as const;

export type Status =
  (typeof STATUS)[keyof typeof STATUS];

export const ALL_STATUSES = "All" as const;

export type StatusFilterValue =
  | Status
  | typeof ALL_STATUSES;