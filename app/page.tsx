"use client"

import React from "react"
import Sidebar from "@/components/Sidebar"
import FiltroStatus from "@/components/FiltroStatus"
import CardChamado from "@/components/CardChamado"

export default function Page() {
  const [menuAtivo, setMenuAtivo] = React.useState("Chamados");
  const [filtroStatus, setFiltroStatus] = React.useState("Todos");

  const chamados= [
    { id: 1,
      cliente: "João Silva",
      telefone: "(11) 98765-4321",
      endereco: "Rua das Flores, 123",
      descricao: "Entupimento na pia da cozinha",
      prioridade: "Alta",
      valor: 150.00,
      dataAbertura: "2024-06-01T10:00:00Z",
      status: "Aberto",
      
    },
    { id: 2,
      cliente: "Maria Santos",
       telefone: "(11) 98854-5411",
      endereco: "Rua das Arvores, 503",
      descricao: "Entupimento no vaso sanitário",
      prioridade: "Baixa",
      valor: 300.00,
      dataAbertura: "2024-06-01T10:00:00Z",
      status: "Em andamento",
    },
    { id: 3,
      cliente: "Carlos Oliveira",
       telefone: "(11) 98745-3210",
      endereco: "Rua das Pedras, 203",
      descricao: "Entupimento de ralo",
      prioridade: "Média",
      valor: 450.00,
      dataAbertura: "2024-06-01T10:00:00Z",
      status: "Finalizado",
    },
  ];

  const chamadosFiltrados =
  filtroStatus === "Todos"
    ? chamados
    : chamados.filter(
        (item) => item.status === filtroStatus
      )

  return (
  <div className="flex h-screen">

    {/*Sidebar*/}
    <Sidebar
  menuAtivo={menuAtivo}
  setMenuAtivo={setMenuAtivo}
/>

    {/* Conteúdo */}
<main className="flex-1 bg-gray-100 p-6">
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">
      {menuAtivo}
    </h2>

    <p className="text-gray-500">
      Visão geral dos chamados da desentupidora
    </p>
  </div>

  {menuAtivo === "Chamados" && (
    <>
      {/* filtros */}
      <FiltroStatus
        filtroStatus={filtroStatus}
        setFiltroStatus={setFiltroStatus}
      />

      {/* cards */}
      <div className="grid grid-cols-3 gap-4">
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
    </>
  )}
</main>

  </div>
  )
}
      