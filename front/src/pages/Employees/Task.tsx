import axios from "axios";
import { useEffect, useState } from "react";
export default function Task() {


interface Task {
  id?: number;
  title: string;
  description: string;
  assigned_to: number;
  due_date: string | null;
  created_by: number;
  stat: string; 
}


const [tasks, setTasks] = useState<Task[]>([]);
    const token = localStorage.getItem('token');
    
   const update=async(id:number ,newStat: string)=>{
  try {
   const res= await  axios.patch(`http://localhost:3000/api/tasks/${id}/status` ,  { stat: newStat }, {headers:{Authorization : `Bearer ${token}`}});
    setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
  } catch (error) {
    console.error(error);
  }
   
   };

    const getTask = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/tasks`, { headers: { Authorization: `Bearer ${token}` } });
            setTasks(res.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTask();
    }, [])





  return (
    <div>
    <div className="">
        <h3>ALL task</h3>
        <table>
         <thead>
           <tr>
            <td>Title</td>
            <td>Description</td>
            <td>status</td>
            <td>action</td>
          </tr>
         </thead>
          <tbody>
         {tasks.map((row) => {
  return (
    <tr key={row.id}>
      <td>{row.title}</td>
      <td>{row.description}</td>
      <td>{row.stat}</td>
  <td>
                   <button type="button" onClick={()=>update(row.id!,"in_progress")} >in_progress</button>
                  <button type="button" onClick={()=> update(row.id! , "done")}>Done</button>
                </td>
    </tr>
  );
})}
          </tbody>
        </table>
      </div>
    </div>
  )
}
