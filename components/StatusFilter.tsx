import {
  ALL_STATUSES,
  STATUS,
  type StatusFilterValue,
} from "@/constants/status";

type StatusFilterProps = {
  statusFilter: StatusFilterValue;
  setStatusFilter: (status: StatusFilterValue) => void;
};

export default function StatusFilter({
  statusFilter,
  setStatusFilter,
}: StatusFilterProps) {
  const statuses: StatusFilterValue[] = [
    ALL_STATUSES,
    STATUS.OPEN,
    STATUS.IN_PROGRESS,
    STATUS.COMPLETED,
  ];

  return (
    <div className="flex gap-2 mb-4">
      {statuses.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setStatusFilter(item)}
          className={
            statusFilter === item
              ? "bg-blue-500 text-white px-3 py-2 rounded"
              : "bg-gray-300 text-black px-3 py-2 rounded"
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
}
