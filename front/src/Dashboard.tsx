// import { useEffect, useState } from 'react';
// import TasksStatusChart from './components/Charts/TasksStatusChart';

// export default function Overview() {
//   const [statusData, setStatusData] = useState([]);
//    const token = localStorage.getItem('token');
//   useEffect(() => {
//     fetch('http://localhost:3000/api/charts/pie-chart', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`, // حسب إزاي بتخزن التوكن عندك
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setStatusData(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h1>Overview</h1>
//       <TasksStatusChart data={statusData} />
//     </div>
//   );
// }



import React from 'react'

export default function Dashboard() {
  return (
    <div>
      dash
    </div>
  )
}
