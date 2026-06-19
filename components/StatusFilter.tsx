type StatusFilterProps = {
  statusFilter: string
  setStatusFilter: (status: string) => void
}

export default function StatusFilter({
  statusFilter,
  setStatusFilter,
}: StatusFilterProps) {
  const statuses = ["All", "Open", "In Progress", "Completed"]

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