      import axios from 'axios';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { X } from "lucide-react";
interface StatusData {
  stat: string;
  count: string;
}

interface Task {
  id: number;
  title: string;
  stat: string;
  assigned_to: number;
}
interface Employee {
 id: number;
  name: string;
};




export default function TasksStatusChart() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f43f5e'];
  const token= localStorage.getItem("token")
   const  [data, setData] = useState([])
       const [employees, setEmployees] = useState<Employee[]>([]);
const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
const fetchData = async () => {
  const res = await axios.get("http://localhost:3000/api/charts/pie-chart", {headers:{Authorization:`Bearer ${token}`}});
  const formatted = res.data.map((item: StatusData) => ({
    ...item,
    count: Number(item.count)
  }));
  setData(formatted);
};


const fetchTasks = async () => {
  const res = await axios.get("http://localhost:3000/api/tasks", {
    headers: { Authorization: `Bearer ${token}` }
  });
    console.log(res.data);
  setAllTasks(res.data);
}

const getName=async()=>{
  try {
    const res = await axios.get("http://localhost:3000/api/get-emplyoees", {
  headers: { Authorization: `Bearer ${token}` }
});
setEmployees(res.data.employees); 
  } catch (error) {
    console.error(error)
  }
}

useEffect(()=>{
fetchData();
fetchTasks();
getName();
},[])





const getEmployeeName = (id: number) => {
  const emp = employees.find(e => e.id === id);
  return emp ? emp.name : "Unknown";
};

  return (
    <div>


<ResponsiveContainer width="100%" height={300}>
  <PieChart>
  <Pie
  data={data}
  dataKey="count"
  nameKey="stat"
  innerRadius={60}
  outerRadius={80}
  paddingAngle={5}
  onClick={(entry: any) => setSelectedStatus(entry.payload.stat)}
>
      {data.map((entry, index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
{selectedStatus && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
      
      <button
        onClick={() => setSelectedStatus(null)}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
      >
        <X size={22} />
      </button>

      <h3 className="text-xl font-bold text-gray-800 mb-5 capitalize">
        {selectedStatus.replace("_", " ")} Tasks
      </h3>

      <ul className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {allTasks
          .filter(task => task.stat === selectedStatus)
          .map(task => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 transition-colors"
            >
              <span className="font-semibold text-gray-800 text-base">
                {getEmployeeName(task.assigned_to)}
              </span>
              <span className="text-gray-500 text-sm">{task.title}</span>
            </li>
          ))}
      </ul>

    </div>
  </div>
)}
    </div>
  )
}
