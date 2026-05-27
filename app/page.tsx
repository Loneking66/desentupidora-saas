"use client"

import { useState } from "react"

export default function Home() {
  const [menuAtivo, setMenuAtivo] = useState("Chamados")
  const chamados = [
  { id: 1, cliente: "João Silva", status: "Aberto", descricao: "Entupimento na cozinha" },
  { id: 2, cliente: "Maria Souza", status: "Em andamento", descricao: "Vazamento no banheiro" },
  { id: 3, cliente: "Carlos Lima", status: "Finalizado", descricao: "Limpeza de caixa de gordura" },
]
  const chamadosFiltrados = chamados.filter((item) => {
      if (menuAtivo === "Chamados") return true
    return item.status === menuAtivo
})  
  const [filtroStatus, setFiltroStatus] = useState("Todos")
  const itens = ["Chamados", "Clientes", "Relatórios", "Configurações"]
    function corStatus(status: string) {
      if (status === "Aberto") return "text-red-600"
      if (status === "Em andamento") return "text-yellow-600"
      if (status === "Finalizado") return "text-green-600"
  return "text-gray-600"
}
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
  <h1 className="text-xl font-bold mb-6">
    Desentupidora
  </h1>

  <nav className="space-y-2">
    {itens.map((item) => (
      <div
        key={item}
        onClick={() => setMenuAtivo(item)}
        className={`p-3 rounded-lg cursor-pointer transition ${
          menuAtivo === item
            ? "bg-blue-600"
            : "hover:bg-gray-800"
        }`}
      >
        {item}
      </div>
    ))}
  </nav>
</aside>

      {/* Conteúdo */}
     <main className="flex-1 bg-gray-100 p-6">
  <h2 className="text-2xl font-bold mb-4">
    {menuAtivo}
  </h2>
  <div className="flex gap-2 mb-4">
  {["Todos", "Aberto", "Em andamento", "Finalizado"].map((status) => (
    <button
      key={status}
      onClick={() => setFiltroStatus(status)}
      className={`px-3 py-1 rounded ${
        filtroStatus === status
          ? "bg-blue-600 text-white"
          : "bg-white hover:bg-gray-200"
      }`}
    >
      {status}
    </button>
  ))}
</div>  
  <div className="grid gap-4">
    {chamadosFiltrados.map((item) => (
      <div
        key={item.id}
        className="bg-white p-4 rounded-xl shadow"
      >
        <h3 className="font-bold">
          #{item.id} - {item.cliente}
        </h3>

        <p className="text-gray-600">
          {item.descricao}
        </p>

        <span className={`text-sm font-bold ${corStatus(item.status)}`}>
  {item.status}
</span>
      </div>
    ))}
  </div>
</main>

    </div>
  )
}