import { STATUS, type Status } from "@/constants/status";
import { type Priority } from "@/constants/priority";
import { type Technician } from "@/constants/technicians";

function statusColor(status: Status) {
  if (status === STATUS.OPEN) return "bg-red-100 text-red-700";

  if (status === STATUS.IN_PROGRESS) return "bg-yellow-100 text-yellow-700";

  return "bg-green-100 text-green-700";
}

type ServiceRequestCardProps = {
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
  onStatusChange: (id: number, newStatus: Status) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

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
  technician,
  onStatusChange,
  onDelete,
  onEdit,
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
          onChange={(event) => onStatusChange(id, event.target.value as Status)}
          className={`mt-2 w-full sm:w-56 rounded-lg border px-2 py-1 font-semibold ${statusColor(status)}`}
        >
          <option value={STATUS.OPEN}>{STATUS.OPEN}</option>
          <option value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</option>
          <option value={STATUS.COMPLETED}>{STATUS.COMPLETED}</option>
        </select>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>📞 {phone}</p>
        <p>📍 {address}</p>
        <p>🔧 {description}</p>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-start gap-3">
          <span>👷‍♂️</span>

          <div>
            <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              {technician}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm font-medium text-gray-900">⚠️ {priority}</span>

        <span className="text-sm font-bold text-gray-900">R$ {value}</span>

        <button
          type="button"
          onClick={() => onEdit(id)}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="text-sm font-semibold text-red-600 hover:text-red-800"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
