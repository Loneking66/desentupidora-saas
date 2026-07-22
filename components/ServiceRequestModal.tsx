import type { RefObject } from "react";

import { TECHNICIANS } from "@/constants/technicians";
type Technician = (typeof TECHNICIANS)[number];

type ServiceRequestModalProps = {
  editingServiceRequestId: number | null;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  problemDescription: string;
  assignedTechnician: Technician;
  priority: string;
  inputPhoneRef: RefObject<HTMLInputElement | null>;
  phoneSearch: string;
  formatPhone: (value: string) => string;
  setPhoneSearch: (value: string) => void;
  searchCustomer: () => void;
  customerFound: { customer: string; phone: string; address: string } | null;
  setCustomerFound: (
    value: { customer: string; phone: string; address: string } | null,
  ) => void;
  messageSearch: string | null;
  setCustomerName: (value: string) => void;
  setCustomerPhone: (value: string) => void;
  setCustomerAddress: (value: string) => void;
  customerNew: boolean;
  setProblemDescription: (value: string) => void;
  setAssignedTechnician: (value: Technician) => void;
  setPriority: (value: string) => void;
  closeServiceRequestModal: () => void;
  handleSaveServiceRequest: () => void;
  // More props can be added here as needed
};

export default function ServiceRequestModal({
  editingServiceRequestId,
  customerName,
  customerPhone,
  customerAddress,
  problemDescription,
  assignedTechnician,
  priority,
  inputPhoneRef,
  phoneSearch,
  setPhoneSearch,
  formatPhone,
  searchCustomer,
  customerFound,
  setCustomerFound,
  messageSearch,
  setCustomerName,
  setCustomerPhone,
  setCustomerAddress,
  customerNew,
  setProblemDescription,
  setAssignedTechnician,
  setPriority,
  closeServiceRequestModal,
  handleSaveServiceRequest,
}: ServiceRequestModalProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSaveServiceRequest();
      }}
      className="space-y-4"
    >
      <h3 className="mb-4 text-xl font-bold text-gray-900">
        {editingServiceRequestId !== null
          ? "Edit Service Request"
          : "New Service Request"}
      </h3>

      <div className="space-y-3">
        {editingServiceRequestId === null ? (
          <div className="relative">
            <div className="flex gap-2">
              <input
                ref={inputPhoneRef}
                value={phoneSearch}
                onChange={(event) =>
                  setPhoneSearch(formatPhone(event.target.value))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                placeholder="Customer Phone"
              />

              <button
                type="button"
                onClick={searchCustomer}
                className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
              >
                Search
              </button>
            </div>

            {customerFound && (
              <button
                type="button"
                onClick={() => {
                  setCustomerName(customerFound.customer);
                  setCustomerPhone(customerFound.phone);
                  setCustomerAddress(customerFound.address);
                  setCustomerFound(null);
                }}
                className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-left shadow-lg transition hover:bg-blue-50"
              >
                <div className="font-medium text-gray-900">
                  👤 {customerFound.customer}
                </div>

                <div className="text-sm text-gray-500">
                  📍 {customerFound.address}
                </div>
              </button>
            )}

            {messageSearch && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 shadow-lg">
                {messageSearch}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
            <p className="font-medium text-blue-700">
              ✏️ Editing Request #{editingServiceRequestId}
            </p>
          </div>
        )}
        <input
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          readOnly={!customerNew && customerName !== ""}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 ${
            !customerNew && customerName !== "" ? "bg-gray-100" : "bg-white"
          }`}
          placeholder="Customer Name"
        />

        <input
          value={customerPhone}
          onChange={(event) => setCustomerPhone(event.target.value)}
          readOnly={!customerNew && customerPhone !== ""}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 ${
            !customerNew && customerPhone !== "" ? "bg-gray-100" : "bg-white"
          }`}
          placeholder="Customer Phone"
        />

        <input
          value={customerAddress}
          onChange={(event) => setCustomerAddress(event.target.value)}
          readOnly={!customerNew && customerAddress !== ""}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 ${
            !customerNew && customerAddress !== "" ? "bg-gray-100" : "bg-white"
          }`}
          placeholder="Customer Address"
        />
        <textarea
          value={problemDescription}
          onChange={(event) => setProblemDescription(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
          placeholder="Problem description"
        />

        <h3 className="mb-1 text-xl font-bold text-gray-900">Technician</h3>

        <select
          value={assignedTechnician}
          onChange={(event) =>
            setAssignedTechnician(event.target.value as Technician)
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
        >
          {TECHNICIANS.map((technician) => (
            <option key={technician} value={technician}>
              {technician}
            </option>
          ))}
        </select>

        <h3 className="mb-1 text-xl font-bold text-gray-900">Priority</h3>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={closeServiceRequestModal}
          className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300 text-gray-900"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {editingServiceRequestId !== null ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
