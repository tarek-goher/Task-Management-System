const express = require("express");
const router = express.Router();
const { login, isManager } = require("../middleware/login");
const DB = require("../db/db");

// ------------------------------------Add Task---------------------------------

router.post("/",login,isManager,async(req , res )=>{
    const {title ,description , assigned_to ,due_date  }= req.body;
    if (!title || !description || !assigned_to  ) {
        return res.status(400).json({ message:"All fields are required."})
    };

    try {
        const query='INSERT INTO "tasks" (title,description,assigned_to,due_date,created_by,stat) VALUES ($1 ,$2 ,$3 ,$4 ,$5,$6)  RETURNING *';
        const value=[title ,description , assigned_to ,due_date ,req.user.id, 'pending'];
        const result = await DB.query(query,value);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
             message:"Error In Server."
        })
    }
})

// ------------------------------------Get TASK---------------------------------
router.get("/",login,async(req , res)=>{
try {
        let result;
        if (req.user.role ==="manager") {
             result = await DB.query('SELECT * FROM "tasks" WHERE created_by = $1', [req.user.id]);
        }else {
      result = await DB.query('SELECT * FROM "tasks" WHERE assigned_to = $1', [req.user.id]);
    }
    res.status(200).json(result.rows)
} catch (error) {
     res.status(500).json({
             message:"Error In Server."
        })
}
})





// ------------------------------------Get TASK BY ID---------------------------------




router.get("/:id",login,async(req , res)=>{
try {
        let result;
        if (req.user.role ==="manager") {
             result = await DB.query('SELECT * FROM "tasks" WHERE created_by = $1', [req.user.id]);
        }else {
      result = await DB.query('SELECT * FROM "tasks" WHERE assigned_to = $1', [req.user.id]);
    }
    res.status(200).json(result.rows)
} catch (error) {
     res.status(500).json({
             message:"Error In Server."
        })
}
})

// ------------------------------------PUT TASK---------------------------------

router.put("/:id",login,isManager,async(req , res )=>{
    const{id}=req.params;
      const {title, description, assigned_to, due_date, stat} = req.body;
    if (!title || !description || !assigned_to  ) {
        return res.status(400).json({ message:"All fields are required."})
    };

try {
const query = 'UPDATE "tasks" SET title = $1, description = $2, assigned_to = $3, due_date = $4, stat = $5, completed_at = CASE WHEN $5 = \'done\' THEN NOW() ELSE completed_at END WHERE id = $6 AND created_by = $7 RETURNING *';
const value = [title, description, assigned_to, due_date, stat, id, req.user.id];
    const result=await DB.query(query,value);
if (result.rows.length === 0) {
    return res.status(404).json({ message: "Task not found." });
}
res.status(200).json(result.rows[0]);
} catch (error) {
        res.status(500).json({
             message:"Error In Server."
        })
}
})
// ------------------------------------patch TASK---------------------------------


router.patch("/:id/status",login,async(req , res)=>{
           const {id}=req.params;
           const{stat  }=req.body;
 try {
    const query= 'UPDATE "tasks" SET stat =$1 WHERE id=$2 AND assigned_to =$3  RETURNING *' ;
    const value=[stat, id , req.user.id];
    const result= await DB.query(query,value);
    if (result.rows.length === 0) {
    return res.status(404).json({ message: "Task not found or not assigned to you." });
};
    res.status(200).json(result.rows[0]);
 } catch (error) {
    console.error(error);
    res.status(500).json({
        message: "error in server"
    })
 }
})

// ------------------------------------DELETE TASK---------------------------------

router.delete("/:id",login,isManager,async(req , res )=>{
    const{id}=req.params;
    try {
        const query= await DB.query('DELETE FROM "tasks" WHERE id=$1 RETURNING *',[id]);
      
       res.status(200).json({ 
            message: "The task was successfully deleted.",
            deletedTask: query.rows[0] 
        });
   } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "error in server" });
   }
})






module.exports = router;