import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./login.css";
interface DataLogIn{
    email: string,
    password: string,
};

export default function Login() {
const[form , setForm]=useState<DataLogIn>({
    email:"",password:""
});
const navigate = useNavigate();
 
const handleSubmet= async(e:React.FormEvent)=>{
e.preventDefault();
try {
    const res= await axios.post("http://localhost:3000/api/login",form);
   localStorage.setItem("token", res.data.token); 
   localStorage.setItem("role", res.data.user.role);
    if (res.data.user.role === "manager") {
      navigate("/dashboard");
    } else {
      navigate("/Task");
    }
    alert("تم تسجيل الدخول بنجاح");
} catch (error) {
    alert("فشل في تسجيل الدخول ");
}
}

  return (
    <div className="login-page">
      <h1 className="login-title">Login</h1>
      <form 
      onSubmit={handleSubmet}
      className="login-card">
        <label htmlFor="email">Enter your Email</label>
        <input type="email" 
        value={form.email}
        onChange={(e)=>setForm({...form, email: e.target.value})}
        id="email"
        />
        <label htmlFor="password">Enter your Password</label>
        <input type="password" 
        onChange={(e)=>setForm({...form,password:e.target.value})}  
        id="password"
        />
        <button className="login-submit">Login</button>
      </form>
    </div>
  )
}