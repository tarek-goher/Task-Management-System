import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListPlus, ListChecks, CheckCircle2, UserPlus, LogOut } from "lucide-react";

const links = [
  { to: "/Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/TasksManger", label: "Add Task", icon: ListPlus },
  { to: "/ShowTask", label: "Show Tasks", icon: ListChecks },
  { to: "/EndTask", label: "Finished Tasks", icon: CheckCircle2 },
  { to: "/Emploees", label: "Add Employee", icon: UserPlus },
];

export default function Side() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <aside className="sticky top-0 h-screen w-72 shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      
      {/* Logo / Header */}
      <div className="px-6 py-7 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
        <p className="text-sm text-gray-400 mt-1">Task Management</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {links.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl text-base font-semibold transition-all
                ${active
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Icon size={24} strokeWidth={2.2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-base font-semibold text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={24} strokeWidth={2.2} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}