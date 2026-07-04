import axios from 'axios';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

interface RawTask {
  id: number;
  title: string;
  due_date: string;
}

interface DeadlineData {
  title: string;
  daysLeft: number;
}

export default function DeadlineChart() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState<DeadlineData[]>([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/api/charts/deadline-chart", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const today = new Date();
    const formatted = res.data.map((task: RawTask) => {
      const due = new Date(task.due_date);
      const diffTime = due.getTime() - today.getTime();
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { title: task.title, daysLeft };
    });

    setData(formatted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="daysLeft" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.daysLeft < 0 ? "#ef4444" : "#2276c5"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}