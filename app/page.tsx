"use client"

import React from "react"
import Sidebar from "@/components/Sidebar"
import FiltroStatus from "@/components/FiltroStatus"
import CardChamado from "@/components/CardChamado"

export default function Page() {
  const [menuAtivo, setMenuAtivo] = React.useState("Chamados")
  const [filtroStatus, setFiltroStatus] = React.useState("Todos")
  const [novoChamadoAberto, setNovoChamadoAberto] = React.useState(false)
  const [telefoneBusca, setTelefoneBusca] = React.useState("")
  const [clienteEncontrado, setClienteEncontrado] = React.useState<null | {
    cliente: string
    telefone: string
    endereco: string
  }>(null)

  const inputTelefoneRef = React.useRef<HTMLInputElement>(null)

  const chamados = [
    {
      id: 1,
      cliente: "João Silva",
      telefone: "(11) 98765-4321",
      endereco: "Rua das Flores, 123",
      descricao: "Entupimento na pia da cozinha",
      prioridade: "Alta",
      valor: 150,
      dataAbertura: "2024-06-01T10:00:00Z",
      status: "Aberto",
    },
    {
      id: 2,
      cliente: "Maria Santos",
      telefone: "(11) 98854-5411",
      endereco: "Rua das Árvores, 503",
      descricao: "Entupimento no vaso sanitário",
      prioridade: "Baixa",
      valor: 300,
      dataAbertura: "2024-06-01T10:00:00Z",
      status: "Em andamento",
    },
    {
      id: 3,
      cliente: "Carlos Oliveira",
      telefone: "(11) 98745-3210",
      endereco: "Rua das Pedras, 203",
      descricao: "Entupimento de ralo",
      prioridade: "Média",
      valor: 450,
      dataAbertura: "2024-06-01T10:00:00Z",
      status: "Finalizado",
    },
  ]

  const chamadosFiltrados =
    filtroStatus === "Todos"
      ? chamados
      : chamados.filter((item) => item.status === filtroStatus)

  React.useEffect(() => {
    if (novoChamadoAberto) {
      inputTelefoneRef.current?.focus()
    }
  }, [novoChamadoAberto])

  function formatarTelefone(valor: string) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11)

    if (numeros.length <= 2) {
      return numeros
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
  }

  function buscarCliente() {
    const telefoneDigitado = telefoneBusca.replace(/\D/g, "")

    const chamadoEncontrado = chamados.find(
      (item) => item.telefone.replace(/\D/g, "") === telefoneDigitado
    )

    if (!chamadoEncontrado) {
      setClienteEncontrado(null)
      return
    }

    setClienteEncontrado({
      cliente: chamadoEncontrado.cliente,
      telefone: chamadoEncontrado.telefone,
      endereco: chamadoEncontrado.endereco,
    })
  }

  return (
    <div className="flex h-screen">
      <Sidebar menuAtivo={menuAtivo} setMenuAtivo={setMenuAtivo} />

      <main className="flex-1 bg-gray-100 p-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {menuAtivo}
          </h2>

          <p className="text-gray-500">
            Visão geral dos chamados da desentupidora
          </p>
        </header>

        {menuAtivo === "Chamados" && (
          <section>
            <FiltroStatus
              filtroStatus={filtroStatus}
              setFiltroStatus={setFiltroStatus}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {chamadosFiltrados.map((item) => (
                <CardChamado
                  key={item.id}
                  id={item.id}
                  cliente={item.cliente}
                  telefone={item.telefone}
                  endereco={item.endereco}
                  descricao={item.descricao}
                  prioridade={item.prioridade}
                  valor={item.valor}
                  dataAbertura={item.dataAbertura}
                  status={item.status}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <aside
        className={`fixed bottom-6 right-6 z-50 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-out ${
          novoChamadoAberto
            ? "h-[600px] w-[560px] p-6"
            : "h-14 w-48 p-0"
        }`}
      >
        {!novoChamadoAberto && (
          <button
            type="button"
            onClick={() => setNovoChamadoAberto(true)}
            className="h-full w-full rounded-3xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
          >
            + Novo Chamado
          </button>
        )}

        {novoChamadoAberto && (
          <form>
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Novo chamado
            </h3>

            <div className="space-y-3">
              <div className="relative">
                <div className="flex gap-2">
                  <input
                    ref={inputTelefoneRef}
                    value={telefoneBusca}
                    onChange={(event) =>
                      setTelefoneBusca(formatarTelefone(event.target.value))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Telefone do cliente"
                  />

                  <button
                    type="button"
                    onClick={buscarCliente}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
                  >
                    Buscar
                  </button>
                </div>

                {clienteEncontrado && (
                  <button
                    type="button"
                    className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-left shadow-lg transition hover:bg-blue-50"
                  >
                    <div className="font-medium text-gray-900">
                      👤 {clienteEncontrado.cliente}
                    </div>

                    <div className="text-sm text-gray-500">
                      📍 {clienteEncontrado.endereco}
                    </div>
                  </button>
                )}
              </div>

              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Nome do cliente"
              />

              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Endereço"
              />

              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Descrição do problema"
              />

              <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                <option>Alta</option>
                <option>Média</option>
                <option>Baixa</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setNovoChamadoAberto(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancelar
              </button>

              <button
                type="button"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  )
}