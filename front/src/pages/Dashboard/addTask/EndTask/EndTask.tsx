import axios from "axios";
import { useEffect, useState } from "react";
export default function ShowTask() {


interface Task {
  id?: number;
  title: string;
  description: string;
  assigned_to: number;
  due_date: string | null;
  created_by: number;
  stat: string; 
}

interface Employee {
  id: number;
  name: string;
  email: string;
}
const [tasks, setTasks] = useState<Task[]>([]);
    const token = localStorage.getItem('token');
    const [employees, setEmployees] = useState<Employee[]>([]);
const doneTasks = tasks.filter((task) => task.stat === "done");


    const getfetsh = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/tasks-employees`, { headers: { Authorization: `Bearer ${token}` } });
            setEmployees(res.data);
        } catch (error) {
            console.error(error)
        }
    }

    const getTask = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/tasks`, { headers: { Authorization: `Bearer ${token}` } });
            setTasks(res.data);
         
        } catch (error) {
            console.error(error)
        }
    }

const del = async(id:number)=>{
  try {
    await axios.delete(`http://localhost:3000/api/tasks/${id}` ,{headers: {Authorization : `Bearer ${token}`}});
     setTasks(tasks.filter((t) => t.id !== id));
  } catch (error) {
    alert("error in the delete")
  }
}


    useEffect(() => {
        getfetsh();
        getTask();
    }, [])





  return (
    <div>
    <div className="">
       <h3 className="text-2xl font-bold text-gray-800 text-center p-4 mb-6 relative inline-block left-1/2 -translate-x-1/2">
  Completed Tasks
  <span className="block w-16 h-1 bg-blue-800 rounded-full mx-auto mt-2"></span>
</h3>
        <table>
         <thead>
           <tr>
            <td>Title</td>
            <td>Description</td>
            <td>employee</td>
            <td>status</td>
            <td>action</td>
          </tr>
         </thead>
          <tbody>
         {doneTasks.map((row) => {
  const employee = employees.find((emp) => emp.id === row.assigned_to);
  
  return (
    <tr key={row.id}>
      <td>{row.title}</td>
      <td>{row.description}</td>
      <td>{employee?.name}</td>
      <td>{row.stat}</td>
  <td>
                  <button  type="button" onClick={()=>del(row.id!)}>Delete</button>
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
