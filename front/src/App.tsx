import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Update from './pages/Dashboard/addEmploees/update/Update';
import Emploees from './pages/Dashboard/addEmploees/Emploees';
import DashboardLayout from './layout/Dashboardlayout ';
import TasksManger from './pages/Dashboard/addTask/TasksManger';
import EditTask from './pages/Dashboard/addTask/EditTask/EditTask';
import ShowTask from './pages/Dashboard/addTask/ShowTask/ShowTask';
import Task from './pages/Employees/Task';
import EndTask from './pages/Dashboard/addTask/EndTask/EndTask';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
<Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

  {/* صفحة الموظف - محمية بس للـ employee */}
  <Route
    path="/Task"
    element={
      <ProtectedRoute allowedRoles={["employee"]}>
        <Task />
      </ProtectedRoute>
    }
  />

  {/* صفحات الداشبورد - محمية بس للـ manager */}
  <Route
    element={
      <ProtectedRoute allowedRoles={["manager"]}>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/TasksManger" element={<TasksManger />} />
    <Route path="/EditTask/:id" element={<EditTask />} />
    <Route path="/ShowTask" element={<ShowTask />} />
    <Route path="/EndTask" element={<EndTask />} />
    <Route path="/Emploees" element={<Emploees />} />
    <Route path="/update/:id" element={<Update />} />
  </Route>
</Routes>
    </div>
  );
}

export default App;