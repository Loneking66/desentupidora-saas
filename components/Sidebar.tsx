type SidebarProps = {
  menuAtivo: string
  setMenuAtivo: (menu: string) => void
}

export default function Sidebar({ menuAtivo, setMenuAtivo }: SidebarProps) {
  const menus = ["Chamados", "Clientes", "Relatórios", "Configurações"]

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">
        Desentupidora
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <div
            key={menu}
            onClick={() => setMenuAtivo(menu)}
            className={`p-3 rounded-lg cursor-pointer ${
              menuAtivo === menu
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`}
          >
            {menu}
          </div>
        ))}
      </nav>
    </aside>
  )
}