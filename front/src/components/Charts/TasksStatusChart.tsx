import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// شكل البيانات الجايه من الـ API بتاعك
type StatusData = {
  count: string;
  stat: 'pending' | 'in_progress' | 'done';
};

type Props = {
  data: StatusData[];
};

const COLORS: Record<string, string> = {
  pending: '#f59e0b',      // برتقالي
  in_progress: '#3b82f6',  // أزرق
  done: '#22c55e',         // أخضر
};

const LABELS: Record<string, string> = {
  pending: 'معلقة',
  in_progress: 'قيد التنفيذ',
  done: 'مكتملة',
};

export default function TasksStatusChart({ data }: Props) {
  // نحول البيانات من شكل { count, stat } لشكل { name, value } اللي Recharts محتاجاه
  const chartData = data.map((item) => ({
    name: LABELS[item.stat] || item.stat,
    value: Number(item.count),
    key: item.stat,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3 style={{ textAlign: 'center', marginBottom: 10 }}>حالة التاسكس</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.key] || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}