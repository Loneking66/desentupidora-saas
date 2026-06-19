"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { STATUS } from "@/constants/status";
import StatusFilter from "@/components/StatusFilter";

type StatusValue = typeof STATUS[keyof typeof STATUS]

export default function Page() {
  const [statusFilter, setStatusFilter] =
    React.useState<StatusValue>(STATUS.All);
  const [ activeMenu, setActiveMenu] = React.useState("Service Requests");
  const [newServiceRequestOpen, setNewServiceRequestOpen] = React.useState(false);
  const [phoneSearch, setPhoneSearch] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");
  const [customerNew, setCustomerNew] = React.useState(false);
  const [messageSearch, setMessageSearch] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");
  const [problemDescription, setProblemDescription] = React.useState("");
  const [priority, setPriority] = React.useState("Medium");

  // Improves user experience by automatically focusing the phone input
  // when the new service request form is opened. This allows the operator
  // to start typing the customer's phone number immediately without needing
  // to click on the input field first.
  const [customerFound, setCustomerFound] = React.useState<null | {
    customer: string;
    phone: string;
    address: string;
  }>(null);

  const inputphoneRef = React.useRef<HTMLInputElement>(null);

  // Main State of the application. All service requests are stored here.
  // In a real application, this data would likely come from an API
  // and be persisted in a database. For this example, we are using in-memory state 
  // to keep things simple.
  const [serviceRequests, setServiceRequests] = React.useState([
    {
      id: 1,
      customer: "João Silva",
      phone: "(11) 98765-4321",
      address: "Rua das Flores, 123",
      description: "Entupimento na pia da cozinha",
      priority: "High",
      value: 150,
      openedAt: "2024-06-01T10:00:00Z",
      status: "Open",
    },
    {
      id: 2,
      customer: "Maria Santos",
      phone: "(11) 98854-5411",
      address: "Rua das Árvores, 503",
      description: "Entupimento no vaso sanitário",
      priority: "Low",
      value: 300,
      openedAt: "2024-06-01T10:00:00Z",
      status: "In Progress",
    },
    {
      id: 3,
      customer: "Carlos Oliveira",
      phone: "(11) 98745-3210",
      address: "Rua das Pedras, 203",
      description: "Entupimento de ralo",
      priority: "Medium",
      value: 450,
      openedAt: "2024-06-01T10:00:00Z",
      status: "Completed",
    },
  ]);

  // Dashboard indicators are calculated based on the current list of service requests.
  // Every time the serviceRequests state changes, these indicators will be recalculated
  // to reflect the current status of all service requests. This ensures that the dashboard
  // always shows up-to-date information without needing manual refreshes.
  const totalOpen = serviceRequests.filter(
    (item) => item.status === "Open",
  ).length;

  const totalInProgress = serviceRequests.filter(
    (item) => item.status === "In Progress",
  ).length;

  const totalCompleted = serviceRequests.filter(
    (item) => item.status === "Completed",
  ).length;

  const filteredServiceRequests =
    statusFilter === STATUS.All
      ? serviceRequests
      : serviceRequests.filter((item) => item.status === statusFilter);

  React.useEffect(() => {
    if (newServiceRequestOpen) {
      inputphoneRef.current?.focus();
    }
  }, [newServiceRequestOpen]);

  function formatphone(value: string) {
    const phoneNumbers = value.replace(/\D/g, "").slice(0, 11);

    if (phoneNumbers.length <= 2) {
      return phoneNumbers;
    }

    if (phoneNumbers.length <= 7) {
      return `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2)}`;
    }

    return `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2, 7)}-${phoneNumbers.slice(7)}`;
  }

  // Searches for an existing customer
  // based on the phone number entered by the operator.
  function searchcustomer() {
    const enteredPhone = phoneSearch.replace(/\D/g, "");

    const serviceRequestFound = serviceRequests.find(
      (item) => item.phone.replace(/\D/g, "") === enteredPhone,
    );

    if (!serviceRequestFound) {
      setCustomerFound(null);

      // Customer not found. The operator can choose to create 
      // a new customer with the entered phone number.
      setCustomerNew(true);
      setCustomerName("");
      setCustomerPhone(phoneSearch);
      setCustomerAddress("");

      setMessageSearch("Customer Not Found. Fill in the details to create a new customer.");

      setTimeout(() => {
        setMessageSearch("");
      }, 3000);

      return;
    }

    setMessageSearch("");
    setCustomerNew(false);
    setCustomerFound({
      customer: serviceRequestFound.customer,
      phone: serviceRequestFound.phone,
      address: serviceRequestFound.address,
    });
  }

  // Creates a new service request based on the information entered in the form.
  function saveServiceRequest() {
    if (
      !customerName ||
      !customerPhone ||
      !customerAddress ||
      !problemDescription
    ) {
      
          alert("Fill in all fields to create a new service request.");
      return;
    }

    const newServiceRequest = {
      id: serviceRequests.length + 1,
      customer: customerName,
      phone: customerPhone,
      address: customerAddress,
      description: problemDescription,
      priority: priority,
      value: 0,
      openedAt: new Date().toISOString(),
      status: "Open",
    };

    setServiceRequests([...serviceRequests, newServiceRequest]);

    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setProblemDescription("");
    setPriority("Medium");
    setPhoneSearch("");
    setCustomerFound(null);
    setMessageSearch("");
    setCustomerNew(false);

    setNewServiceRequestOpen(false);
  }

  // Refreshes the status of a service request when the operator changes it.
  // Some business rules are applied when changing the status to ensure that the operator
  // is aware of important transitions and can take necessary actions. 
      // For example, if a service request goes back from "In Progress" to "Open", 
      // the operator is alerted to check with the service provider and reassign 
      // the service if needed. 
      // This helps maintain the quality of service and ensures that
      //  no service request is left unattended due to status changes.  
          
  function changeServiceRequestStatus(id: number, newStatus: string) {
    setServiceRequests(
      serviceRequests.map((serviceRequest) => {
        if (serviceRequest.id !== id) {
          return serviceRequest;
        }

        if (serviceRequest.status === STATUS.IN_PROGRESS && newStatus === STATUS.OPEN
) {
          alert(
            "Attention: This service request is going back to Open. Please check with the service provider and reassign if necessary.",
          );
        }

        return {
          ...serviceRequest,
          status: newStatus,
        };
      }),
    );
  }

  // Removes a service request from the list when the operator chooses to delete it.
  function deleteServiceRequest(id: number) {
    const confirm = window.confirm("Are you sure you want to delete this service request?");

    if (!confirm) {
      return;
    }

    setServiceRequests(serviceRequests.filter((serviceRequest) => serviceRequest.id !== id));
  }

  return (
    <div className="flex h-screen">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <main className="flex-1 bg-gray-100 p-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{ activeMenu}</h2>

          <p className="text-gray-500">
            Manage service requests, customers, reports, and settings from one operational dashboard.
          </p>
        </header>

        { activeMenu === "Service Requests" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl shadow p-4 border">
                <p className="text-sm text-gray-500">📋 Open</p>

                <h3 className="text-3xl font-bold text-red-600">
                  {totalOpen}
                </h3>
              </div>

              <div className="bg-white rounded-2xl shadow p-4 border">
                <p className="text-sm text-gray-500">🚚 In Progress</p>

                <h3 className="text-3xl font-bold text-yellow-600">
                  {totalInProgress}
                </h3>
              </div>

              <div className="bg-white rounded-2xl shadow p-4 border">
                <p className="text-sm text-gray-500">✅ Completed</p>

                <h3 className="text-3xl font-bold text-green-600">
                  {totalCompleted}
                </h3>
              </div>
            </div>
        <StatusFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredServiceRequests.map((item) => (
                <ServiceRequestCard
                  key={item.id}
                  id={item.id}
                  customer={item.customer}
                  phone={item.phone}
                  address={item.address}
                  description={item.description}
                  priority={item.priority}
                  value={item.value}
                  openedAt={item.openedAt}
                  status={item.status}
                  onStatusChange={changeServiceRequestStatus}
                  onDelete={deleteServiceRequest}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <aside
        className={`fixed bottom-6 right-6 z-50 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-out ${
          newServiceRequestOpen ? "h-150 w-140 p-6" : "h-14 w-48 p-0"
        }`}
      >
        {!newServiceRequestOpen && (
          <button
            type="button"
            onClick={() => setNewServiceRequestOpen(true)}
            className="h-full w-full rounded-3xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
          >
            + New Service Request
          </button>
        )}

        {newServiceRequestOpen && (
          <form>
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              New Service Request
            </h3>

            <div className="space-y-3">
              <div className="relative">
                <div className="flex gap-2">
                  <input
                    ref={inputphoneRef}
                    value={phoneSearch}
                    onChange={(event) =>
                      setPhoneSearch(formatphone(event.target.value))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Customers phone"
                  />

                  <button
                    type="button"
                    onClick={searchcustomer}
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

              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                readOnly={!customerNew && customerName !== ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                  !customerNew && customerName !== ""
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                placeholder="Customer's name"
              />

              <input
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                readOnly={!customerNew && customerPhone !== ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                  !customerNew && customerPhone !== ""
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                placeholder="Customer's phone"
              />

              <input
                value={customerAddress}
                onChange={(event) => setCustomerAddress(event.target.value)}
                readOnly={!customerNew && customerAddress !== ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                  !customerNew && customerAddress !== ""
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                placeholder="Customer's address"
              />
              <textarea
                value={problemDescription}
                onChange={(event) => setProblemDescription(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Problem description"
              />

              <h3 className="mb-1 text-xl font-bold text-gray-900">
              Priority
            </h3>
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setNewServiceRequestOpen(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveServiceRequest}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}