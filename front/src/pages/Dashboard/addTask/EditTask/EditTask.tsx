import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



interface Task {
    id?: number;
    title: string;
    description: string;
    assigned_to: number;
    due_date: string | null;
    created_by: number;
    stat: string;
};
interface Employee {
    id: number;
    name: string;
    email: string;
}


export default function EditTask() {



    const [form, setForm] = useState<Task>({
        id: 0, title: "", description: "", assigned_to: 0, due_date: "", created_by: 0, stat: ""
    });
    const [employees, setEmployees] = useState<Employee[]>([]);
    const token = localStorage.getItem('token');
    const [search, setSearch] = useState("");
    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase())
    );
    const navigate = useNavigate();

    const { id } = useParams();




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
            const res = await axios.get(`http://localhost:3000/api/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setForm(res.data);
        } catch (error) {
            console.error(error)
        }
    }



    useEffect(() => {
        getfetsh();
        getTask();
    }, [])



    const up = async (id: number) => {
        try {
            const res = await axios.put(`http://localhost:3000/api/tasks/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
            setForm(res.data)
            navigate("/TasksManger");
        } catch (error) {
            alert("error in the update")
        }
    }




    return (
        <div className="container">
            <h1>ADD NEW TASK</h1>
            <div className="task">
                <form onSubmit={(e) => { e.preventDefault(); up(Number(id)) }} >
                    <label htmlFor="title">Title</label>
                    <input type="text" required id="title" placeholder="Enter Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />

                    <label htmlFor="description">Description</label>
                    <input type="text" required id="description" placeholder="Enter Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <label htmlFor="due_date ">due_date </label>
                    <input type="date" required id="due_date " placeholder="Enter due_date "
                        value={form.due_date!}
                        onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                    />


                    <label htmlFor="employeed">Select Employee</label>
                    <select name="" id="employeed" value={form.assigned_to}
                        onChange={(e) => setForm({ ...form, assigned_to: Number(e.target.value) })}>
                        {filteredEmployees.map((row) => (
                            <option key={row.id} value={row.id}>{row.name}</option>
                        ))}
                    </select>

                    <input type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>Update Task</button>
                </form>
            </div>
        </div>
    )
}
