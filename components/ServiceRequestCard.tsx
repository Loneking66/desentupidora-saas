function statusColor(status: string) {
  if (status === "Open")
    return "bg-red-100 text-red-700"

  if (status === "In Progress")
    return "bg-yellow-100 text-yellow-700"

  return "bg-green-100 text-green-700"
}
interface ServiceRequestCardProps {
  id: number;
  customer: string;
  phone: string;
  address: string;
  description: string;
  priority: string;
  value: number;
  openedAt: string;
  status: string;

  onStatusChange: (
    id: number,
    newStatus: string
  ) => void;
  onDelete: (id: number) => void;
}

export default function ServiceRequestCard({
  id,
  customer,
  phone,
  address,
  description,
  priority,
  value,
  openedAt,
  status,
  onStatusChange,
  onDelete,
}: ServiceRequestCardProps) {


return (
   <div className="min-w-0 bg-white p-5 rounded-2xl shadow border border-gray-200">
    <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-900">
          #{id} - {customer}
        </h3>

        <p className="text-sm text-gray-500">
          Opened on {new Date(openedAt).toLocaleDateString()}
        </p>
      </div>

      <select
  value={status}
  onChange={(event) =>
    onStatusChange(id, event.target.value)
  }
  className={`mt-2 w-full rounded-lg border px-2 py-1 font-semibold ${statusColor(status)}`}
>
  <option>Open</option>
  <option>In Progress</option>
  <option>Completed</option>
</select>
    </div>

    <div className="space-y-2 text-sm text-gray-700">
      <p>📞 {phone}</p>
      <p>📍 {address}</p>
      <p>🔧 {description}</p>
    </div>

    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
      <span className="text-sm font-medium">
        ⚠️ {priority}
      </span>

      <span className="text-sm font-bold text-gray-900">
        R$ {value}
      </span>

      <button
        type="button"
        onClick={() => onDelete(id)}
        className="text-sm font-semibold text-red-600 hover:text-red-800"
      >
        Delete
      </button>

    </div>
  </div>
  
)
}
