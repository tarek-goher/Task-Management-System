import axios from "axios";
import { useEffect, useState } from "react";
import './Emploees.css';
import { Link } from "react-router-dom";
import Side from "../../../components/sidebar/Side";


interface DataEmployees {
    id?: number,
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function Emploees() {
    const token = localStorage.getItem("token");
    const [input, setInput] = useState<DataEmployees[]>([]);
    const [form, setFrom] = useState<DataEmployees>({
        name: "", email: "", password: "", confirmPassword: ""
    });

    const del=async(id:number)=>{
     try {
    await  axios.delete(`http://localhost:3000/api/del-user/${id}` ,  { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
     } catch (error) {
        
     }
    }
    // const up = async (id: number) => {
    //     try {
    //         axios.put(`http://localhost:3000/api/up-user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/get-emplyoees", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInput(res.data.employees);
        } catch (error) {
            console.error(error);
            alert("error get api");
        }
    }
    useEffect(() => {
        fetchData();
    }, []);




    const handleSubmet = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("The passwords do not match!");
            return;
        };
        try {

            await axios.post("http://localhost:3000/api/add-employees", form, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchData();
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="container">
            <div><h1>Employees</h1></div>
            <div>
                <form onSubmit={handleSubmet} >
                    <label htmlFor="name">Enter the employee's name.</label>
                    <input type="text" required placeholder="Enter the employee's name." id="name"
                        value={form.name}
                        onChange={(e) => setFrom({ ...form, name: e.target.value })}
                    />
                    <label htmlFor="email">Enter the employee's email.</label>
                    <input type="email" required placeholder="Enter the employee's email." id="email"
                        value={form.email}
                        onChange={(e) => setFrom({ ...form, email: e.target.value })}
                    />
                    <label htmlFor="password">Enter the employee's password.</label>
                    <input type="password" required placeholder="Enter the employee's password." id="password"
                        value={form.password}
                        onChange={(e) => setFrom({ ...form, password: e.target.value })} />
                    <label htmlFor="confirmPassword">Enter the employee's confirmPassword.</label>
                    <input type="password" required placeholder="Enter the employee's confirmPassword." id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={(e) => setFrom({ ...form, confirmPassword: e.target.value })}
                    />
                    <button type="submit">Add Employee</button>
                </form>
            </div>

            <br />

            <div>
                <table>
                    <tr>
                        <td>name</td>
                        <td>email</td>
                        <td>action</td>
                    </tr>
                    <tbody>
                        {input.map((row, index) => (
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>
                                    <Link to={`/Update/${row.id}`}>
        <button>Update</button>
    </Link>
                                    <button onClick={()=>del(row.id!)} >delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}