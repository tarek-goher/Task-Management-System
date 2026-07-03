import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import'./TaskManger.css';


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
export default function TasksManger() {

// const [input , setInput]= useState<Task[]>([]);
const [form , setForm]= useState<Task>({
  id:0,title:"",description:"",assigned_to:0,due_date:"",created_by:0,stat:""
});
const [lastTask, setLastTask] = useState<Task | null>(null);
const [employees, setEmployees] = useState<Employee[]>([]);
const token =localStorage.getItem('token');
const [search, setSearch] = useState("");
const filteredEmployees = employees.filter((emp) =>
  emp.name.toLowerCase().includes(search.toLowerCase())
);
const employee = employees.find((emp) => emp.id === lastTask?.assigned_to);
const del = async(id:number)=>{
  try {
    await axios.delete(`http://localhost:3000/api/tasks/${id}` ,{headers: {Authorization : `Bearer ${token}`}});
     setLastTask(null); 
  } catch (error) {
    alert("error in the delete")
  }
}


const getfetsh=async()=>{
  const res = await axios.get("http://localhost:3000/api/tasks-employees",{headers:{Authorization: `Bearer ${token}`}});
  setEmployees(res.data);
}
useEffect(()=>{
  getfetsh();
},[])
const handleSubmet=async (e:React.FormEvent)=>{
  e.preventDefault();
  try {
   const res= await axios.post("http://localhost:3000/api/tasks",form,{headers : {Authorization : `Bearer ${token}`}})
          setLastTask(res.data)
          getfetsh();
  } catch (error) {
    console.log(error);
    alert("error in submet task")
  }
}


  return (
    <div className="container">
      <h1>ADD NEW TASK</h1>
      <div className="task">
        <form  onSubmit={handleSubmet}>
          <label htmlFor="title">Title</label>
        <input type="text" required id="title" placeholder="Enter Title" 
        value={form.title}
        onChange={(e)=>setForm({...form, title: e.target.value})}
        />
        
          <label htmlFor="description">Description</label>
        <input type="text" required id="description" placeholder="Enter Description" 
                value={form.description}
        onChange={(e)=>setForm({...form,description: e.target.value})}
        />
          <label htmlFor="due_date ">due_date </label>
        <input type="date" required id="due_date " placeholder="Enter due_date " 
                value={form.due_date!}
        onChange={(e)=>setForm({...form,due_date : e.target.value})}
        />

       
       <label htmlFor="employeed">Select Employee</label>
           <select name="" id="employeed"         value={form.assigned_to}
        onChange={(e)=>setForm({...form, assigned_to:Number( e.target.value)})}>
           {filteredEmployees.map((row)=>(
             <option key={row.id} value={row.id}>{row.name}</option>
           ))}
           </select>
        
                <input type="search" 
                value={search}
            onChange={(e)=>setSearch( e.target.value)  }
           />
           
           <button>ADD Task</button>
        </form>
      </div>
      <hr />
      <div className="">
        <h3>Last Task</h3>
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
            {lastTask&&( 
              <tr key={lastTask.id}>
                <td>{lastTask.title}</td>
                <td>{lastTask.description}</td>
                <td>{employee?.name}</td>
                <td>{lastTask.stat}</td>
                <td>
                  <Link to={`/EditTask/${lastTask.id}`} >
                   <button type="button">Update</button>
                  </Link>
                  <button  type="button" onClick={()=>del(lastTask.id!)}>Delete</button>
                </td>
              </tr>
             )}
          </tbody>
        </table>
      </div>
     <Link to={"/ShowTask"}>
      <button>Show All Tasks</button></Link>
    </div>
  )
}
