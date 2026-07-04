import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './ShowTask.css';


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
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState<Employee[]>([]);

const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase())
);

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
  <div className="showtask-page">
    <div className="showtask-card">
      <div className="showtask-header">
        <h3 className="showtask-title">All Tasks</h3>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Title"
          className="showtask-search"
        />
      </div>

      <div className="showtask-table-wrap">
        <table className="showtask-table">
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Employee</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((row) => {
              const employee = employees.find((emp) => emp.id === row.assigned_to);
              return (
                <tr key={row.id}>
                  <td>{row.title}</td>
                  <td>{row.description}</td>
                  <td>{employee?.name}</td>
                  <td>
                    <span className={`status-badge status-${row.stat?.toLowerCase().replace(" ", "-")}`}>
                      {row.stat}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/EditTask/${row.id}`}>
                        <button type="button" className="btn-update">Update</button>
                      </Link>
                      <button type="button" className="btn-delete" onClick={() => del(row.id!)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}
