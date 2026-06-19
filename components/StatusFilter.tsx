import { STATUS } from "@/constants/status"

type StatusValue = typeof STATUS[keyof typeof STATUS]

type StatusFilterProps = {
  statusFilter: StatusValue
  setStatusFilter: (status: StatusValue) => void
}

export default function StatusFilter({
  statusFilter,
  setStatusFilter,
}: StatusFilterProps) {
  const statuses: StatusValue[] = [
    STATUS.All,
    STATUS.OPEN,
    STATUS.IN_PROGRESS,
    STATUS.COMPLETED,
  ]
  return (
    <div className="flex gap-2 mb-4">
      {statuses.map((item) => (
        <button
          key={item}
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
  )
}