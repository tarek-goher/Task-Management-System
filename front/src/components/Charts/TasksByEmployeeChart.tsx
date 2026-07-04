import axios from 'axios';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarData {
  assigned_to: number;
  count: string;
}

interface Employee {
  id: number;
  name: string;
}

interface ChartData {
  name: string;
  count: number;
}

export default function TasksByEmployeeChart() {
  const token = localStorage.getItem("token");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const getEmployeeName = (id: number) => {
    const emp = employees.find(e => e.id === id);
    return emp ? emp.name : "Unknown";
  };

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:3000/api/get-emplyoees", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.employees;
  };

  const fetchBarData = async (employeesList: Employee[]) => {
    const res = await axios.get("http://localhost:3000/api/charts/bar-chart", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const formatted = res.data.map((item: BarData) => ({
      name: employeesList.find(e => e.id === item.assigned_to)?.name || "Unknown",
      count: Number(item.count)
    }));

    setChartData(formatted);
  };

  useEffect(() => {
    const loadData = async () => {
      const employeesList = await fetchEmployees();
      setEmployees(employeesList);
      await fetchBarData(employeesList);
    };
    loadData();
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}