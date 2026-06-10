type FiltroStatusProps = {
  filtroStatus: string
  setFiltroStatus: (status: string) => void
}

export default function FiltroStatus({
  filtroStatus,
  setFiltroStatus,
}: FiltroStatusProps) {
  const status = ["Todos", "Aberto", "Em andamento", "Finalizado"]

  return (
    <div className="flex gap-2 mb-4">
      {status.map((item) => (
        <button
          key={item}
          onClick={() => setFiltroStatus(item)}
          className={
            filtroStatus === item
              ? "bg-blue-500 text-white px-3 py-2 rounded"
              : "bg-gray-300 text-black px-3 py-2 rounded"
          }
        >
          {item}
        </button>
      ))}
    </div>
  )
}