interface CardChamadoProps {
  id: number;
  cliente: string;
  status: string;
}

export default function CardChamado({ id, cliente, status }: CardChamadoProps) {
  return (
    <div
      className="bg-white p-4 rounded-xl shadow"
    >
      <h3 className="text-lg font-bold">
        {cliente}
      </h3>

      <p className="text-gray-500">
        {status}
      </p>
    </div>
  );
}
