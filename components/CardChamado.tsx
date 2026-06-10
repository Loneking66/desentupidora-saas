function corStatus(status: string) {
  if (status === "Aberto")
    return "bg-red-100 text-red-700"

  if (status === "Em andamento")
    return "bg-yellow-100 text-yellow-700"

  return "bg-green-100 text-green-700"
}
interface CardChamadoProps {
  id: number;
  cliente: string;
  telefone: string;
  endereco: string;
  descricao: string;
  prioridade: string;
  valor: number;
  dataAbertura: string;
  status: string;
}

export default function CardChamado({ id, cliente, telefone, endereco, descricao, prioridade, valor, dataAbertura, status }: CardChamadoProps) {
return (
   <div className="min-w-0 bg-white p-5 rounded-2xl shadow border border-gray-200">
    <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-900">
          #{id} - {cliente}
        </h3>

        <p className="text-sm text-gray-500">
          Aberto em {new Date(dataAbertura).toLocaleDateString()}
        </p>
      </div>

      <span
  className={`w-fit px-3 py-1 rounded-full text-sm font-semibold ${corStatus(status)}`}
>         {status}
</span>
    </div>

    <div className="space-y-2 text-sm text-gray-700">
      <p>📞 {telefone}</p>
      <p>📍 {endereco}</p>
      <p>🔧 {descricao}</p>
    </div>

    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
      <span className="text-sm font-medium">
        ⚠️ {prioridade}
      </span>

      <span className="text-sm font-bold text-gray-900">
        R$ {valor}
      </span>
    </div>
  </div>
)
}
