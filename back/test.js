// ---------------------------require FRAM WORK----------------------

const express=require("express");
const app =express();
const {Pool, Query}=require("pg");
const cors=require("cors");
const dotenv= require('dotenv').config();
app.use(express.json());
app.use(cors());

// ---------------------------DATABASES (DB)----------------------
const DB= new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
});


// ---------------------------insert task (post)----------------------

app.post("/api/add-task", async(req , res )=>{
    const{task , name}=req.body;
   if (!task || !name) {
    return res.status(400).json({ message: "task and name are required" });
  }
  try {
  
    const query='INSERT INTO "tasks" (task , name) VALUES ($1 , $2) RETURNING *';
    const value=[task , name];
    const result= await DB.query(query,value);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message:"error the server"
    })
  }
})

// ---------------------------select task (get)----------------------

app.get("/api/get-task", async(req , res )=>{
  try {
    const result= await DB.query('SELECT * FROM "tasks"')
    res.status(200).json(result.rows);
  } catch (error) {
     res.status(500).json({
      message:"error the server"
    })
  
  }
})
// ---------------------------update task (put)----------------------

app.put("/api/up-task/:id", async(req , res )=>{
  const {id}=req.params;
  const{task,name}=req.body;
  try {
    const query='UPDATE "tasks" SET task=$1 , name=$2 WHERE id =$3 RETURNING *';
    const value=[task , name , id];
    const result= await DB.query(query,value);
    res.status(200).json(result.rows[0]);
  } catch (error) {
     res.status(500).json({
      message:"error the server"
    })
  }
})

// ---------------------------delete task (delete)----------------------

app.delete("/api/del-task/:id", async(req , res )=>{
  const{id}=req.params;
  try {
    const query=await DB.query('DELETE FROM "tasks" WHERE id = $1',[id]);
     res.json({ message: 'Data deleted successfully' });
  } catch (error) {
     res.status(500).json({
      message:"error the server"
    })
  }
})


// ---------------------------listen === 3000 ----------------------



app.listen(3000,()=>{
  console.log("the port equal 3000");
})