const express = require("express");
const router = express.Router();
const { login, isManager } = require("../middleware/login");
const DB = require("../db/db");


// ---------------------------Pie Chart-----------------------------


router.get("/pie-chart", login, isManager, async (req, res) => {
try {
        const result=await DB.query('SELECT COUNT(*) ,stat  FROM "tasks" GROUP BY stat');
    res.status(200).json(result.rows);
} catch (error) {
    res.status(500).json({ message: "Error In Server." });
}
 });



router.get("/bar-chart", login, isManager, async (req, res) => {
try {
     const result=await DB.query('SELECT COUNT(*) ,assigned_to  FROM "tasks" GROUP BY assigned_to');
    res.status(200).json(result.rows);
} catch (error) {
    res.status(500).json({ message: "Error In Server." });
}
 });

router.get("/deadline-chart", login, async (req, res) => {
  try {
    let result;
    if (req.user.role === "manager") {
      result = await DB.query('SELECT id, title, due_date FROM "tasks" WHERE created_by = $1 AND stat != $2', [req.user.id, 'done']);
    } else {
      result = await DB.query('SELECT id, title, due_date FROM "tasks" WHERE assigned_to = $1 AND stat != $2', [req.user.id, 'done']);
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error In Server." });
  }
});





 module.exports=router;






