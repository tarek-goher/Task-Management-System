import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
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
    <div className="flex flex-col bg-blue-400 h-screen justify-center items-center gap-4">
      <h1 className="base text-white text-2xl font-bold   ">Login</h1>
      <form 
      onSubmit={handleSubmet}
      className="flex flex-col justify-center items-center bg-blue-200 p-4 w-full max-w-sm gap-3 h-96 rounded-lg">
        <label htmlFor="email">Enter your Email</label>
        <input type="email" 
        className="p-4  rounded-lg"   
        value={form.email}
        onChange={(e)=>setForm({...form, email: e.target.value})}
        id="email"
        />
        <label htmlFor="password">Enter your Password</label>
        <input type="password" 
        className="p-4  rounded-lg" 
        onChange={(e)=>setForm({...form,password:e.target.value})}  
        id="password"
        />
        <button className="bg-blue-400 text-white p-4 rounded-lg w-1/2">Login</button>
      </form>
    </div>
  )
}
