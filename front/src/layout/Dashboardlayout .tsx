import { Outlet } from "react-router-dom";
import Side from "../components/sidebar/Side";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Side />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}