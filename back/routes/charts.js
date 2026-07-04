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



 module.exports=router;






