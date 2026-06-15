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
  const [nomeCliente, setNomeCliente] = React.useState("")
  const [clienteNovo, setClienteNovo] = React.useState(false)
  const [mensagemBusca, setMensagemBusca] = React.useState("")
  const [telefoneCliente, setTelefoneCliente] = React.useState("")
  const [enderecoCliente, setEnderecoCliente] = React.useState("")
  const [descricaoProblema, setDescricaoProblema] = React.useState("")
  const [prioridade, setPrioridade] = React.useState("Média")
  const [clienteEncontrado, setClienteEncontrado] = React.useState<null | {
    cliente: string
    telefone: string
    endereco: string
  }>(null)

  const inputTelefoneRef = React.useRef<HTMLInputElement>(null)

  const [chamados, setChamados] = React.useState([
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
  ])

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

      setClienteNovo(true)
      setNomeCliente("")
      setTelefoneCliente(telefoneBusca)
      setEnderecoCliente("")

      setMensagemBusca("Cliente não encontrado")

      setTimeout(() => {
        setMensagemBusca("")
      }, 3000)

      return
    }
    
    setMensagemBusca("")
    setClienteNovo(false)

    setClienteEncontrado({
      cliente: chamadoEncontrado.cliente,
      telefone: chamadoEncontrado.telefone,
      endereco: chamadoEncontrado.endereco,
    })
  }

  function salvarChamado() {
    if (!nomeCliente || !telefoneCliente || !enderecoCliente || !descricaoProblema) {
      alert("Preencha todos os campos obrigatórios")
     return
   }

    const novoChamado = {
      id: chamados.length + 1,
      cliente: nomeCliente,
      telefone: telefoneCliente,
      endereco: enderecoCliente,
      descricao: descricaoProblema,
      prioridade: prioridade,
      valor: 0,
      dataAbertura: new Date().toISOString(),
      status: "Aberto",
    }

    setChamados([...chamados, novoChamado])

    setNomeCliente("")
    setTelefoneCliente("")
    setEnderecoCliente("")
    setDescricaoProblema("")
    setPrioridade("Média")
    setTelefoneBusca("")
    setClienteEncontrado(null)
    setMensagemBusca("")
    setClienteNovo(false)

    setNovoChamadoAberto(false)
  }

  function alterarStatusChamado(id: number, novoStatus: string) {
    setChamados(
      chamados.map((chamado) => {
        if (chamado.id !== id) {
          return chamado
        }

        if (chamado.status === "Em andamento" && novoStatus === "Aberto") {
          alert(
            "Atenção: este chamado voltou de Em andamento para Aberto. Verifique com o prestador e reatribua o atendimento."
          )
        }

        return {
          ...chamado,
          status: novoStatus,
        }
      })
    )
    }

  function excluirChamado(id: number) {
    const confirmar = confirm("Tem certeza que deseja excluir este chamado?")

    if (!confirmar) {
      return
    }

    setChamados(
      chamados.filter((chamado) => chamado.id !== id)
    )
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
                  onAlterarStatus={alterarStatusChamado}
                  onExcluir={excluirChamado}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <aside
        className={`fixed bottom-6 right-6 z-50 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-out ${
          novoChamadoAberto
            ? "h-150 w-140 p-6"
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
                    onClick={() => {
                      setNomeCliente(clienteEncontrado.cliente)
                      setTelefoneCliente(clienteEncontrado.telefone)
                      setEnderecoCliente(clienteEncontrado.endereco)
                      setClienteEncontrado(null)
                    }}
                    
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

                {mensagemBusca && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 shadow-lg">
                    {mensagemBusca}
                  </div>
                )}
              </div>

              <input
                value={nomeCliente}
                onChange={(event) => setNomeCliente(event.target.value)}
                readOnly={!clienteNovo && nomeCliente !== ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                  !clienteNovo && nomeCliente !== ""
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                placeholder="Nome do cliente"
              />

              <input
                value={telefoneCliente}
                onChange={(event) => setTelefoneCliente(event.target.value)}
                readOnly={!clienteNovo && telefoneCliente !== ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                  !clienteNovo && telefoneCliente !== ""
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                placeholder="Telefone do cliente"
              />

              <input
                value={enderecoCliente}
                onChange={(event) => setEnderecoCliente(event.target.value)}
                readOnly={!clienteNovo && enderecoCliente !== ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                  !clienteNovo && enderecoCliente !== ""
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                placeholder="Endereço do cliente"
              />  
              <textarea
              value={descricaoProblema}
              onChange={(event) => setDescricaoProblema(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Descrição do problema"
              />

              <select
                value={prioridade}
                onChange={(event) => setPrioridade(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
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
  )
}