import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./register.css";



interface DataUser {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
};

export default function Register() {
const navigate = useNavigate();
const[input,setInput]=useState<DataUser>({
    name:"", email:"", password:"", confirmPassword:""
});


const handleSubmet= async(e:React.FormEvent)=>{
e.preventDefault();
 if(input.password!=input.confirmPassword){
        return alert("الباسورد مش متطابق")
    }
try {
    const res= await axios.post("http://localhost:3000/api/add-user",input);
    console.log(res.data);

     navigate("/login");
   
} catch (error) {
    alert("wrong in the register");
}
}


    return (
      <div className="register-page">
            <h1 className="register-title">Register</h1>
            <div className="register-card">
                <form onSubmit={handleSubmet} className="register-form">
                    {/* {name input} */}
                    <label htmlFor="name">Full Name</label>
                    <input type="text" placeholder="Enter Your Name" required 
                    id="name"

                    onChange={(e)=>setInput({...input,name: e.target.value})}
                    />
                    {/* {email input} */}
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Your Email" required
                    id="email"
                    onChange={(e)=>setInput({...input,email: e.target.value})}
                    />
                    {/* {password input} */}
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Your Password" required 
                    id="password"
                    onChange={(e)=>setInput({...input,password: e.target.value})}
                    />
                    {/* {vrPass} */}
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <input type="password" placeholder="Enter Your Password agyin" required 
                    id="confirmPassword"
                    onChange={(e)=>setInput({...input,confirmPassword: e.target.value})}
                    />
                   <button type="submit" className="register-submit">Add Register</button>
                </form>
            </div>
        </div>
    )
}