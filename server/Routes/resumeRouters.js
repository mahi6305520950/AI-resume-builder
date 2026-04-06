import express from "express"
import protect from "../middlewares/authMiddleware.js"
import { createResume, deleteResume, getPublicResumeById, getResume, updateResume } from "../controllers/resumeControllers.js";
import upload from "../configs/multer.js";

const ResumeRouter=express.Router()


ResumeRouter.post("/create", protect, createResume);
ResumeRouter.put("/update", upload.single("image"), protect, updateResume);
ResumeRouter.delete("/delete/:resumeId", protect, deleteResume);
ResumeRouter.get("/get/:resumeId", protect, getResume);
ResumeRouter.get("/public/:resumeId", getPublicResumeById);



export default ResumeRouter