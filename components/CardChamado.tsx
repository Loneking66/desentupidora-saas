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
    <div
      className="bg-white p-4 rounded-xl shadow"
    >
      <h3 className="text-lg font-bold">
        {cliente}
      </h3>

      <p className="text-gray-500">📞
        {telefone}
      </p>

      <p className="text-gray-500">📍
        {endereco}
      </p>

      <p className="text-gray-500">🔧
        {descricao}
      </p>

      <p className="text-gray-500">⚠️
        {prioridade}
      </p>

      <p className="text-gray-500">💰
        R$ {valor}
      </p>

      <p className="text-gray-500">📅
        {new Date(dataAbertura).toLocaleDateString()}
      </p>

      <p className="text-gray-500">
        {status}
      </p>
    </div>
  );
}
