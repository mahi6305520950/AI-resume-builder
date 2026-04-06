import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js"
import UserRouter from "./Routes/userRoutes.js"
import ResumeRouter from "./Routes/resumeRouters.js"
import aiRouter from "./Routes/aiRouters.js"


const app=express()
app.use(express.json())

const PORT=process.env.PORT||3000

// database connecton
await connectDB()
app.use(cors())

app.use("/api/users",UserRouter)
app.use("/api/resumes", ResumeRouter);
app.use("/api/ai", aiRouter);

app.get("/",(req,res)=>{
    res.send("Server is Live...")
})






app.listen(PORT,()=>{
    console.log(`Server is running on the port  ${PORT}`);
    
})