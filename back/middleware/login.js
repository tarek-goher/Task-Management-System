const jwt = require("jsonwebtoken"); 
const login= async (req , res , next)=>{
    try {
         const token= req.headers.authorization?.split(" ")[1];
         if (!token) {
                          return res.status(401).json({ message: "No token" });
              
         }
         const verifyToken=jwt.verify(token,process.env.JWT_TOKEN);
         req.user=verifyToken;
         next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const isManager = (req, res, next) => {
    if (req.user.role !== "manager") {
        return res.status(403).json({ message: "غير مصرح لك بهذا الإجراء" });
    }
    next();
};


module.exports={login , isManager};