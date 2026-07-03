import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";



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
      <div className="flex flex-col justify-center items-center bg-blue-200 p-4 m-auto w-screen min-h-screen">
            <h1 className="text-base text-blue-400">Register</h1>
            <div className="form">
                <form onSubmit={handleSubmet} className="flex flex-col justify-center items-center bg-blue-200 p-4 w-full max-w-sm gap-3">
                    {/* {name input} */}
                    <label htmlFor="name">Full Name</label>
                    <input type="text" placeholder="Enter Your Name" required 
                    id="name"
                    className="p-4 w-full rounded-lg"

                    onChange={(e)=>setInput({...input,name: e.target.value})}
                    />
                    {/* {email input} */}
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Your Email" required
                    id="email"
                    className="p-4 w-full rounded-lg"
                    onChange={(e)=>setInput({...input,email: e.target.value})}
                    />
                    {/* {password input} */}
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Your Password" required 
                    id="password"
                    className="p-4 w-full rounded-lg"
                    onChange={(e)=>setInput({...input,password: e.target.value})}
                    />
                    {/* {vrPass} */}
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <input type="password" placeholder="Enter Your Password agyin" required 
                    id="confirmPassword"
                    className="p-4 w-full rounded-lg"
                    onChange={(e)=>setInput({...input,confirmPassword: e.target.value})}
                    />
                   <button type="submit">Add Register</button>
                </form>
            </div>
        </div>
    )
}
