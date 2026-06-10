"use client"

import React from "react"
import Sidebar from "@/components/Sidebar"
import FiltroStatus from "@/components/FiltroStatus"
import CardChamado from "@/components/CardChamado"
import { Chamado } from "@/types/chamado"

export default function Page() {
  const [menuAtivo, setMenuAtivo] = React.useState("Chamados");
  const [filtroStatus, setFiltroStatus] = React.useState("Todos");

  const chamados: Chamado[] = [
    { id: 1,
      cliente: "João Silva",
      status: "Aberto",
    },
    { id: 2,
      cliente: "Maria Santos",
      status: "Em andamento",
    },
    { id: 3,
      cliente: "Carlos Oliveira",
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
      