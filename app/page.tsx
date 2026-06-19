"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import StatusFilter from "@/components/StatusFilter";
import ServiceRequestCard from "@/components/ServiceRequestCard";

export default function Page() {
  const [menuAtivo, setMenuAtivo] = React.useState("Service Requests");
  const [filtroStatus, setFiltroStatus] = React.useState("All");
  const [novoChamadoOpen, setNovoChamadoOpen] = React.useState(false);
  const [phoneBusca, setphoneBusca] = React.useState("");
  const [nomecustomer, setNomecustomer] = React.useState("");
  const [customerNovo, setcustomerNovo] = React.useState(false);
  const [mensagemBusca, setMensagemBusca] = React.useState("");
  const [phonecustomer, setphonecustomer] = React.useState("");
  const [addresscustomer, setaddresscustomer] = React.useState("");
  const [descriptionProblema, setdescriptionProblema] = React.useState("");
  const [priority, setpriority] = React.useState("Média");
  // Melhora a experiência do operador.
  // Ao abrir o formulário, posiciona automaticamente o cursor
  // no campo de busca por phone.
  const [customerEncontrado, setcustomerEncontrado] = React.useState<null | {
    customer: string;
    phone: string;
    address: string;
  }>(null);

  const inputphoneRef = React.useRef<HTMLInputElement>(null);

  // Estado principal da aplicação.
  // No futuro os chamados serão carregados da API,
  // mas atualmente permanecem apenas em memória no frontend.
  const [chamados, setChamados] = React.useState([
    {
      id: 1,
      customer: "João Silva",
      phone: "(11) 98765-4321",
      address: "Rua das Flores, 123",
      description: "Entupimento na pia da cozinha",
      priority: "Alta",
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
      priority: "Baixa",
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
      priority: "Média",
      value: 450,
      openedAt: "2024-06-01T10:00:00Z",
      status: "Completed",
    },
  ]);

  // Métricas derivadas do estado principal.
  // Sempre que a lista de chamados muda,
  // os indicadores do dashboard são recalculados automaticamente.
  const totalOpen = chamados.filter(
    (item) => item.status === "Open",
  ).length;

  const totalEmAndamento = chamados.filter(
    (item) => item.status === "In Progress",
  ).length;

  const totalCompleted = chamados.filter(
    (item) => item.status === "Completed",
  ).length;

  const chamadosFiltrados =
    filtroStatus === "All"
      ? chamados
      : chamados.filter((item) => item.status === filtroStatus);

  React.useEffect(() => {
    if (novoChamadoOpen) {
      inputphoneRef.current?.focus();
    }
  }, [novoChamadoOpen]);

  function formatarphone(value: string) {
    const numeros = value.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  // Busca customers pelo phone ignorando máscara,
  // espaços e caracteres especiais.
  // O mesmo fluxo permite localizar customers existentes
  // ou iniciar o cadastro de um novo customer.
  function buscarcustomer() {
    const phoneDigitado = phoneBusca.replace(/\D/g, "");

    const chamadoEncontrado = chamados.find(
      (item) => item.phone.replace(/\D/g, "") === phoneDigitado,
    );

    if (!chamadoEncontrado) {
      setcustomerEncontrado(null);

      // customer não encontrado.
      // Libera os campos para cadastro de um novo customer
      // junto com a abertura do chamado.
      setcustomerNovo(true);
      setNomecustomer("");
      setphonecustomer(phoneBusca);
      setaddresscustomer("");

      setMensagemBusca("customer não encontrado");

      setTimeout(() => {
        setMensagemBusca("");
      }, 3000);

      return;
    }

    setMensagemBusca("");
    setcustomerNovo(false);

    setcustomerEncontrado({
      customer: chamadoEncontrado.customer,
      phone: chamadoEncontrado.phone,
      address: chamadoEncontrado.address,
    });
  }

  // Cria um novo chamado utilizando os dados preenchidos
  // pelo operador. Enquanto não existe backend,
  // a persistência ocorre apenas em memória.
  function salvarChamado() {
    if (
      !nomecustomer ||
      !phonecustomer ||
      !addresscustomer ||
      !descriptionProblema
    ) {
      
          alert("Preencha All os campos obrigatórios");
      return;
    }

    const novoChamado = {
      id: chamados.length + 1,
      customer: nomecustomer,
      phone: phonecustomer,
      address: addresscustomer,
      description: descriptionProblema,
      priority: priority,
      value: 0,
      openedAt: new Date().toISOString(),
      status: "Open",
    };

    setChamados([...chamados, novoChamado]);

    setNomecustomer("");
    setphonecustomer("");
    setaddresscustomer("");
    setdescriptionProblema("");
    setpriority("Média");
    setphoneBusca("");
    setcustomerEncontrado(null);
    setMensagemBusca("");
    setcustomerNovo(false);

    setNovoChamadoOpen(false);
  }

  // Atualiza o status de um chamado específico.
  // Algumas mudanças de status possuem regras de negócio
  // que exigem atenção do atendente.
  // Regra de negócio:
          // Quando um chamado retorna de "In Progress" para "Open",
          // o atendente deve verificar o motivo e reatribuir o serviço.
  function alterarStatusChamado(id: number, novoStatus: string) {
    setChamados(
      chamados.map((chamado) => {
        if (chamado.id !== id) {
          return chamado;
        }

        if (chamado.status === "In Progress" && novoStatus === "Open") {
          alert(
            "Atenção: este chamado voltou de In Progress para Open. Verifique com o prestador e reatribua o atendimento.",
          );
        }

        return {
          ...chamado,
          status: novoStatus,
        };
      }),
    );
  }

  // Remove um chamado da lista após confirmação do operador.
  function excluirChamado(id: number) {
    const confirmar = confirm("Tem certeza que deseja excluir este chamado?");

    if (!confirmar) {
      return;
    }

    setChamados(chamados.filter((chamado) => chamado.id !== id));
  }

  return (
    <div className="flex h-screen">
      <Sidebar menuAtivo={menuAtivo} setMenuAtivo={setMenuAtivo} />

      <main className="flex-1 bg-gray-100 p-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{menuAtivo}</h2>

          <p className="text-gray-500">
            Visão geral dos chamados da desentupidora
          </p>
        </header>

        {menuAtivo === "Service Requests" && (
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
                  {totalEmAndamento}
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
              statusFilter={filtroStatus}
              setStatusFilter={setFiltroStatus}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {chamadosFiltrados.map((item) => (
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
                  onStatusChange={alterarStatusChamado}
                  onDelete={excluirChamado}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <aside
        className={`fixed bottom-6 right-6 z-50 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-out ${
          novoChamadoOpen ? "h-150 w-140 p-6" : "h-14 w-48 p-0"
        }`}
      >
        {!novoChamadoOpen && (
          <button
            type="button"
            onClick={() => setNovoChamadoOpen(true)}
            className="h-full w-full rounded-3xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
          >
            + Novo Chamado
          </button>
        )}

        {novoChamadoOpen && (
          <form>
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Novo chamado
            </h3>

            <div className="space-y-3">
              <div className="relative">
                <div className="flex gap-2">
                  <input
                    ref={inputphoneRef}
                    value={phoneBusca}
                    onChange={(event) =>
                      setphoneBusca(formatarphone(event.target.value))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="phone do customer"
                  />

                  <button
                    type="button"
                    onClick={buscarcustomer}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
                  >
                    Buscar
                  </button>
                </div>

                {customerEncontrado && (
                  <button
                    type="button"
                    onClick={() => {
                      setNomecustomer(customerEncontrado.customer);
                      setphonecustomer(customerEncontrado.phone);
                      setaddresscustomer(customerEncontrado.address);
                      setcustomerEncontrado(null);
                    }}
                    className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-left shadow-lg transition hover:bg-blue-50"
                  >
                    <div className="font-medium text-gray-900">
                      👤 {customerEncontrado.customer}
                    </div>

                    <div className="text-sm text-gray-500">
                      📍 {customerEncontrado.address}
                    </div>
                  </button>
                )}

                {mensagemBusca && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 shadow-lg">
                    {mensagemBusca}
                  </div>
                )}
              </div>

              <input
                value={nomecustomer}
                onChange={(event) => setNomecustomer(event.target.value)}
                readOnly={!customerNovo && nomecustomer !== ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                  !customerNovo && nomecustomer !== ""
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                placeholder="Nome do customer"
              />

              <input
                value={phonecustomer}
                onChange={(event) => setphonecustomer(event.target.value)}
                readOnly={!customerNovo && phonecustomer !== ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                  !customerNovo && phonecustomer !== ""
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                placeholder="phone do customer"
              />

              <input
                value={addresscustomer}
                onChange={(event) => setaddresscustomer(event.target.value)}
                readOnly={!customerNovo && addresscustomer !== ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                  !customerNovo && addresscustomer !== ""
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                placeholder="address do customer"
              />
              <textarea
                value={descriptionProblema}
                onChange={(event) => setdescriptionProblema(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Descrição do problema"
              />

              <select
                value={priority}
                onChange={(event) => setpriority(event.target.value)}
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
                onClick={() => setNovoChamadoOpen(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={salvarChamado}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}
