import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListPlus, ListChecks, CheckCircle2, UserPlus, LogOut } from "lucide-react";

import "./side.css";

const links = [
 { to: "/Dashboard", label: "Dashboard", icon: LayoutDashboard }, // خليها زي ما هي في App.tsx
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
    <aside className="sidebar">
      
      {/* Logo / Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">Admin Panel</h2>
        <p className="sidebar-subtitle">Task Management</p>
      </div>

      {/* Nav Links */}
      <nav className="sidebar-nav">
        {links.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`sidebar-link${active ? " active" : ""}`}
            >
              <Icon size={20} strokeWidth={2.2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="sidebar-logout"
        >
          <LogOut size={20} strokeWidth={2.2} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}














// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { LayoutDashboard, ListPlus, ListChecks, CheckCircle2, UserPlus, LogOut } from "lucide-react";
// // import "./side.css";

// const links = [
//   { to: "/Dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { to: "/TasksManger", label: "Add Task", icon: ListPlus },
//   { to: "/ShowTask", label: "Show Tasks", icon: ListChecks },
//   { to: "/EndTask", label: "Finished Tasks", icon: CheckCircle2 },
//   { to: "/Emploees", label: "Add Employee", icon: UserPlus },
// ];

// export default function Side() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/Login");
//   };

//   return (
//     <aside className="sidebar">
      
//       {/* Logo / Header */}
//       <div className="sidebar-header">
//         <h2 className="sidebar-title">Admin Panel</h2>
//         <p className="sidebar-subtitle">Task Management</p>
//       </div>

//       {/* Nav Links */}
//       <nav className="sidebar-nav">
//         {links.map(({ to, label, icon: Icon }) => {
//           const active = location.pathname === to;
//           return (
//             <Link
//               key={to}
//               to={to}
//               className={`sidebar-link${active ? " active" : ""}`}
//             >
//               <Icon size={20} strokeWidth={2.2} />
//               <span>{label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="sidebar-footer">
//         <button
//           onClick={handleLogout}
//           className="sidebar-logout"
//         >
//           <LogOut size={20} strokeWidth={2.2} />
//           <span>Log Out</span>
//         </button>
//       </div>
//     </aside>
//   );
// }