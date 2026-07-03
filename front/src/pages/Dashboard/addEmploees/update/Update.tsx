import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface DataEmployees {
    id?: number,
    name: string,
    email: string,
    password: string,
}

export default function Update() {
    const { id } = useParams(); // ناخد الـ id من الرابط
    const [form, setFrom] = useState<DataEmployees>({
        name: "", email: "", password: ""
    });
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // نجيب بيانات الموظف الحالي ونعرضها في الفورم
    const fetchEmployee = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/get-user/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFrom({
                name: res.data.name,
                email: res.data.email,
                password: ""
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, []);

    const up = async (e: React.FormEvent) => {
        e.preventDefault(); // نمنع الريفريش
        try {
            await axios.put(`http://localhost:3000/api/up-user/${id}`, form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate("/Dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div><h1>Employees</h1></div>
            <div>
                <form onSubmit={up}>
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
                    <input type="password" placeholder="Enter the employee's password." id="password"
                        value={form.password}
                        onChange={(e) => setFrom({ ...form, password: e.target.value })} />
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
}