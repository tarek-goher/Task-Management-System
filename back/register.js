const express = require("express");
const app=express();
const {Pool} = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cors());


const DB= new Pool({
    user:"postgres",
    host:"localhost",
    database:"register",
    password:"2000",
    port:5432,
});



app.post("/api/add-data", async(req , res)=>{
try {
    const { name, age, email, password } = req.body;
if (!name || !email || !password) {
    return res.status(400).json({
        message: "Missing required fields"
    });
}
const checkEmail = await DB.query(
  'SELECT * FROM "saveRegister" WHERE email = $1',
  [email]
);

if (checkEmail.rows.length > 0) {
  return res.status(400).json({
    message: "Email already exists"
  });
}

const hashedPassword = await bcrypt.hash(password, 10);
const query= 'INSERT INTO "saveRegister" (name , age , email , password) VALUES ($1 ,$2 ,$3, $4) RETURNING *' ;
const values= [req.body.name , req.body.age , req.body.email , hashedPassword];
const result = await DB.query(query, values);
res.status(201).json(result.rows[0]);
} catch (error) {
    res.status(500).json({
        messge :"Error server"
    })
}



});






// app.post("/api/login", async(req , res)=>{
//     const{email , password}=req.body;
//     try {
//         const query='SELECT * FROM "saveRegister" WHERE email = $1 ';
//         const result = await DB.query(query ,[email ]);

//         if (result.rows.length===0) {
//             return res.status(401).json({
//                 message: "Invalid credentials", user: result.rows[0]
//             })
//         }
//         const user = result.rows[0];
//         const  vrPass = await bcrypt.compare(password , user.password);
//           if (!vrPass) {
//       return res.status(401).json({
//         message: "Invalid credentials",
//       });
//     }



//  return res.status(200).json({
//       message: "Login successful",
//       user,
//     });

//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// })






// app.post("/api/login", async(req , res)=>{ // إنشاء مسار (Endpoint) من نوع POST لاستقبال بيانات تسجيل الدخول
//     const{email , password}=req.body; // استخراج الإيميل وكلمة السر التي أرسلها المستخدم من جسم الطلب
//     try { // بداية كتلة معالجة الأخطاء لمحاولة تنفيذ العمليات
//         const query='SELECT * FROM "saveRegister" WHERE email = $1 '; // تجهيز استعلام SQL لجلب بيانات المستخدم من قاعدة البيانات بناءً على الإيميل
//         const result = await DB.query(query ,[email ]); // تنفيذ الاستعلام فعلياً في قاعدة البيانات باستخدام الإيميل المرسل

//         if (result.rows.length===0) { // التحقق مما إذا كان السيرفر لم يجد أي مستخدم بهذا الإيميل
//             return res.status(401).json({ // إرجاع رد بحالة خطأ 401 (غير مصرح به) إذا لم يوجد المستخدم
//                 message: "Invalid credentials", user: result.rows[0] // رسالة توضح أن البيانات غير صحيحة
//             })
//         }
//         const user = result.rows[0]; // إذا وجد المستخدم، نقوم بتخزين بياناته في متغير يسمى user
//         const vrPass = await bcrypt.compare(password , user.password); // مقارنة كلمة السر التي أدخلها المستخدم مع كلمة السر المشفرة (Hash) المخزنة في قاعدة البيانات
//           if (!vrPass) { // التحقق مما إذا كانت كلمة السر غير مطابقة
//       return res.status(401).json({ // إرجاع رد بحالة خطأ 401 إذا كانت كلمة السر خاطئة
//         message: "Invalid credentials", // رسالة توضح أن البيانات غير صحيحة
//       });
//     }

//  return res.status(200).json({ // إذا نجحت جميع الخطوات، نقوم بإرجاع حالة 200 (نجاح)
//       message: "Login successful", // رسالة نجاح العملية
//       user, // إرسال بيانات المستخدم كاستجابة
//     });

//     } catch (error) { // في حال حدوث أي خطأ غير متوقع أثناء تنفيذ العمليات السابقة
//         res.status(500).json({ error: "Server error" }); // إرجاع حالة 500 (خطأ داخلي في السيرفر)
//     }
// })

















app.post("/api/login", async(req , res) => {
    const{email , password}= req.body;
    try {
        const query='SELECT * FROM "saveRegister" WHERE email=$1';
        const result = await DB.query(query,[email]);
        if (result.rows.length===0) {
           return res.status(401).json({ // إرجاع رد بحالة خطأ 401 (غير مصرح به) إذا لم يوجد المستخدم
                message: "Invalid credentials",})
        }
       
       const user=result.rows[0]
       const vrPass= await bcrypt.compare(password , user.password)
       if (!vrPass) {
        return res.status(401).json({
            message: "Invalid credentials",
        })
       }
       const token = jwt.sign(
  { id: user.id, email: user.email },
  "SECRET_KEY",
  { expiresIn: "1h" }
);
     const { password, ...safeUser } = user;
        return res.status(200).json({
            message: "Login successful",
      token,
    user: safeUser
        });
        
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})