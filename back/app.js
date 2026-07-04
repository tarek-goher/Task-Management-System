const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  { login, isManager } = require("./middleware/login");
const  taskRoutes = require("./routes/taskRoutes");
const  employeeRoutes = require("./routes/employeeRoutes");
const  charts = require("./routes/charts");
const dotenv = require("dotenv").config();
app.use(express.json());
app.use(cors());


// ----------------------------------------------DATA BASES (DB)---------------------------
const DB = require("./db/db");

// ------------------------------------test---------------------------------
app.get("/api/profile", login, (req, res) => {
    res.json({ user: req.user });
});
// ------------------------------------register---------------------------------

app.post("/api/add-user",async(req , res)=>{
     const { name, email, password  } = req.body;
    if (!name || !email || !password ) {
            return res.status(400).json({
        message:"All fields are required."
    })
    }
    try {
        const chekEmail= await DB.query('select * from "users" where email = $1',[email]);
        if (chekEmail.rows.length>0) {
              return res.status(400).json({ message: "This email is already registered." });
        }
        const hashpass= await bcrypt.hash(password , 10);
        const query='INSERT INTO "users" (name,email,password,role)VALUES ($1,$2,$3,$4) RETURNING *';
        const value=[name , email , hashpass , 'manager'];
        const result = await DB.query(query,value);
        const { password: _, ...userWithoutPassword } = result.rows[0];
       res.status(201).json(userWithoutPassword);
    } catch (error) {
         return res.status(500).json({ message: "error the server" });
    }
})





// ------------------------------------Log in---------------------------------

app.post("/api/login",async(req , res)=>{
    const{email,password}=req.body;
     if ( !email || !password ) {
        return res.status(400).json({
        message:"All fields are required."
    })
    };

try {
    
   const chekEmail= await DB.query('SELECT * FROM "users" WHERE email =$1',[email]);
   const user =chekEmail.rows[0];
   if (chekEmail.rows.length===0) {
       return res.status(400).json({
        message:"The email or password is incorrect."
    })
   };
   
 const hashpass= await bcrypt.compare(password , user.password);
 if (!hashpass) {
        return res.status(400).json({
        message:"The email or password is incorrect."
    })
 };

const token = jwt.sign(
    {id:user.id , email:user.email, role:user.role},
    process.env.JWT_TOKEN,
    {expiresIn:"1h"}
);

const {password:userPassword , ...userWithoutPassword}=user;
res.status(200).json({
    message: "تم تسجيل الدخول بنجاح",
    token,
    user:userWithoutPassword
});


} catch (error) {
    console.error(error),
      res.status(500).json({ message: "error in server" });
}
})








// ------------------------------------Log in  employees---------------------------------


app.post("/api/add-employees", login,isManager, async(req,res)=>{

try {
const {name , email , password}=req.body;
if (!name|| !email || !password) {
         return res.status(400).json({
        message:"All fields are required."
    })
}

const chekEmail= await DB.query('SELECT * FROM "users" WHERE email =$1',[email])
const user=chekEmail.rows[0];
if (chekEmail.rows.length>0) {
        return res.status(400).json({ message: "This email is already registered." });
}

const vrPss= await bcrypt.hash(password, 10);
if (!vrPss) {
        return res.status(400).json({
        message:"The email or password is incorrect."
    })
}
const query = 'INSERT INTO "users" (name,email,password,role,created_by) VALUES ($1,$2,$3,$4,$5) RETURNING *';
const value =[name,email,vrPss,'employee',req.user.id];
const result=await DB.query(query,value);
  const { password: _, ...userWithoutPassword } = result.rows[0];
res.status(200).json(userWithoutPassword);

} catch (error) {
    console.error(error),
      res.status(500).json({ message: "error in server" });
}

})



// ------------------------------------get show  employees---------------------------------
app.get("/api/get-emplyoees",login, isManager, async(req , res)=>{
try {
      const   created_by=req.user.id;
    const query=await DB.query('SELECT * FROM "users" WHERE created_by=$1' , [created_by]);
    res.status(200).json({
            message: "The employees have been successfully retrieved.",
            employees: query.rows
        });
   
} catch (error) {
    console.error(error);
       res.status(500).json({ message: "error in server" });
}
})



// ------------------------------------update  employees---------------------------------


app.put("/api/up-user/:id",login,isManager,async(req ,res)=>{
    const{id}=req.params;
    const{name,email,password}=req.body;
    if(!name || !email|| !password){
        return res.status(400).json({
             message:"All fields are required."
        })
    }

    try {
        const chekID=await DB.query('SELECT * FROM "users" WHERE id=$1' ,[id]);
        const user= chekID.rows[0];
        if (!chekID) {
            return res.status(400).json({ message: "This email is already registered." });
        }
        const vrPss= await bcrypt.hash(password,10)
        const query='UPDATE "users" SET name =$1 , email=$2 , password =$3 WHERE id=$4';
        const value=[name , email, vrPss ,id ];
        const result= await DB.query(query,value);
        // const {password:_, refPassword}=result.user;
        res.status(200).json(result.rows[0]);

    } catch (error) {
         console.error(error);
       res.status(500).json({ message: "error in server" });
    }
})


// ------------------------------------delete  employees---------------------------------


app.delete("/api/del-user/:id",login,isManager,async(req , res )=>{
   try {
     const {id}=req.params; 
    const query = await DB.query('DELETE FROM "users" WHERE id =$1 RETURNING *', [id]);
    if (query.rows.length===0) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ 
            message: "تم حذف المستخدم بنجاح",
            deletedUser: query.rows[0] 
        });
   } catch (error) {
    res.status(500).json({ message: "error in server" });
   }
})


// -----------------------------------------------------routes--------------------------------------------------------------------------
app.use("/api/tasks", taskRoutes);


// -----------------------------------------------------employeeRoutes----------------------------------------------------
app.use("/api/tasks-employees", employeeRoutes);

// -----------------------------------------------------chartsRoutes----------------------------------------------------

app.use("/api/charts", charts);



app.listen(3000,()=>{
    console.log("the port 3000");
});



