import {
  ALL_TECHNICIANS,
  TECHNICIANS,
} from "@/constants/technicians";

type TechnicianFilterProps = {
  technicianFilter: string;
  setTechnicianFilter: (technician: string) => void;
};

export default function TechnicianFilter({
  technicianFilter,
  setTechnicianFilter,
}: TechnicianFilterProps) {
  return (
    <select
      value={technicianFilter}
      onChange={(event) => setTechnicianFilter(event.target.value)}
      className="w-full max-w-md rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm text-gray-900"
    >
      <option value={ALL_TECHNICIANS}>
        {ALL_TECHNICIANS}
      </option>

      {TECHNICIANS.map((technician) => (
        <option key={technician} value={technician}>
          {technician}
        </option>
      ))}
    </select>
  );
}