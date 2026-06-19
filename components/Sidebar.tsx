type SidebarProps = {
  activeMenu: string
  setActiveMenu: (menu: string) => void
}

export default function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  const menus = ["Service Requests", "Customers", "Reports", "Settings"]

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">
        Desentupidora
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <div
            key={menu}
            onClick={() => setActiveMenu(menu)}
            className={`p-3 rounded-lg cursor-pointer ${
              activeMenu === menu
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