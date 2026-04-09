import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { atsCheckResume, atsDeleteResume, enhanceJobDiscription, enhanceProfessionalSummary, generateAtsResumeByAi, getAtsResume, uploadResume } from "../controllers/aiControllers.js";

const aiRouter=express.Router()

aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-disc", protect, enhanceJobDiscription);
aiRouter.post("/upload-resume", protect, uploadResume);
aiRouter.post("/ats-check-resume/:resumeId", protect, atsCheckResume);
aiRouter.delete("/ats-check-resume/:resumeId", protect, atsDeleteResume);
aiRouter.post("/ats-check-resume", protect, atsCheckResume);
aiRouter.get("/ats-check-resume", protect, getAtsResume);
aiRouter.post("/generate-ats-resume-by-ai/:resumeId", protect, generateAtsResumeByAi);






export default aiRouter;