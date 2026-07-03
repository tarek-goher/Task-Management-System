
const express = require("express");
const router = express.Router();
const { login, isManager } = require("../middleware/login");
const DB = require("../db/db");






router.get("/", login, isManager, async (req, res) => {
    try {
        const result = await DB.query('SELECT id, name, email FROM "users" WHERE role = $1', ['employee']);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Error In Server." });
    }
});



module.exports=router;